#!/usr/bin/env python3
"""Generate data/sanyOfficialProducts.ts from verified official JSON."""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit, urlunsplit

SOURCE_PATH = Path("/workspace/data/sany_official_products_verified.json")
OUTPUT_PATH = Path("/workspace/data/sanyOfficialProducts.ts")


CATEGORY_MAP = {
    "Pompes": "pompes-beton",
    "Grues": "grues",
    "Pelles": "excavation",
    "Compacteurs": "terrassement",
    "Camions": "transport",
}


def sanitize_url(url: str) -> str:
    if not url:
        return ""
    parsed = urlsplit(url)
    path = quote(unquote(parsed.path), safe="/:%")
    return urlunsplit((parsed.scheme, parsed.netloc, path, parsed.query, parsed.fragment))


def clean_models(models: list[str]) -> list[str]:
    cleaned: list[str] = []
    for model in models:
        value = " ".join((model or "").split())
        if not value:
            continue
        if value.lower() in {"learn more", "inquiry"}:
            continue
        if value not in cleaned:
            cleaned.append(value)
    return cleaned


def build_product(item: dict) -> dict:
    requested_category = item.get("requested_category", "")
    category = CATEGORY_MAP.get(requested_category, "transport")
    name = " ".join(str(item.get("official_product_name", "")).split())
    main_slug = str(item.get("official_main_category_slug", "sany")).strip()
    sub_slug = str(item.get("official_subcategory_slug", "product")).strip()
    product_id = str(item.get("official_product_id", "0")).strip()

    models = clean_models(item.get("official_model_names", []))

    return {
        "id": f"sany-{main_slug}-{sub_slug}-{product_id}",
        "category": category,
        "brand": "SANY",
        "title": {
            "fr": name,
            "en": name,
            "es": name,
        },
        "shortTitle": {
            "fr": name,
            "en": name,
            "es": name,
        },
        "description": {
            "fr": f"Produit officiel SANY: {name}.",
            "en": f"Official SANY product: {name}. See official page for detailed specifications.",
            "es": f"Producto oficial SANY: {name}. Consulte la ficha oficial para especificaciones detalladas.",
        },
        "specs": {
            "portee": {
                "fr": "",
                "en": "",
                "es": "",
            },
            "pression": {
                "fr": "",
                "en": "",
                "es": "",
            },
            "sortie": {
                "fr": "",
                "en": "",
                "es": "",
            },
        },
        "models": models,
        "image": sanitize_url(str(item.get("official_image_url", "")).strip()),
        "featured": bool(item.get("same_product")) and str(item.get("confidence")) == "high",
        "available": True,
    }


def main() -> None:
    payload = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    products_input = payload.get("products", [])

    products: list[dict] = [build_product(item) for item in products_input]

    # Stable ordering for deterministic output.
    products.sort(key=lambda p: (p["category"], p["title"]["en"], p["id"]))

    ts_content = (
        'import type { Product } from "@/lib/types";\n\n'
        "export const sanyOfficialProducts: Product[] = "
        + json.dumps(products, ensure_ascii=False, indent=2)
        + ";\n"
    )

    OUTPUT_PATH.write_text(ts_content, encoding="utf-8")
    print(f"Wrote {len(products)} official products to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
