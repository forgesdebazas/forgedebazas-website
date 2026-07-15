#!/usr/bin/env python3
"""Scrape official SANY products and verify against local DB images.

Scope requested:
- Pompes
- Grues
- Pelles
- Compacteurs
- Camions
"""

from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.parse import unquote, urljoin, urlparse

import imagehash
import requests
from bs4 import BeautifulSoup
from difflib import SequenceMatcher
from PIL import Image

BASE_URL = "https://www.sanyglobal.com"
PRODUCT_ROOT_URL = f"{BASE_URL}/product/"

DB_PRODUCTS_PATH = Path("/workspace/data/products.json")
OUTPUT_PATH = Path("/workspace/data/sany_official_products_verified.json")


@dataclass(frozen=True)
class Subcategory:
    requested_category: str
    main_slug: str
    sub_slug: str
    url: str


def normalize_text(value: str) -> str:
    value = value or ""
    value = value.strip().lower()
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def canonicalize_url(url: str) -> str:
    if not url:
        return ""
    if url.startswith("data:"):
        return url
    absolute = urljoin(BASE_URL, url)
    parsed = urlparse(absolute)
    scheme = parsed.scheme or "https"
    netloc = parsed.netloc
    path = parsed.path or "/"
    # Preserve query because image URLs may require processing flags.
    query = f"?{parsed.query}" if parsed.query else ""
    return f"{scheme}://{netloc}{path}{query}"


def canonicalize_image_identity(url: str) -> str:
    if not url:
        return ""
    parsed = urlparse(url)
    return f"{parsed.netloc}{unquote(parsed.path)}"


def detect_requested_category(main_slug: str, sub_slug: str) -> Optional[str]:
    if main_slug == "concrete_machinery" and "pump" in sub_slug:
        return "Pompes"
    if main_slug == "crane":
        return "Grues"
    if main_slug == "excavator":
        return "Pelles"
    if main_slug == "road_machinery" and sub_slug == "roller":
        return "Compacteurs"
    if main_slug == "truck":
        return "Camions"
    return None


def get_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            )
        }
    )
    return session


def collect_target_subcategories(session: requests.Session) -> List[Subcategory]:
    response = session.get(PRODUCT_ROOT_URL, timeout=45)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    seen: Dict[Tuple[str, str], Subcategory] = {}
    pattern = re.compile(r"^/product/([a-z0-9_&-]+)/([a-z0-9_-]+)/$", re.IGNORECASE)

    for anchor in soup.select("a[href]"):
        href = anchor.get("href", "").strip()
        if not href:
            continue
        absolute = canonicalize_url(href)
        path = urlparse(absolute).path
        match = pattern.match(path)
        if not match:
            continue
        main_slug = match.group(1)
        sub_slug = match.group(2)
        requested_category = detect_requested_category(main_slug, sub_slug)
        if not requested_category:
            continue
        key = (main_slug, sub_slug)
        if key not in seen:
            seen[key] = Subcategory(
                requested_category=requested_category,
                main_slug=main_slug,
                sub_slug=sub_slug,
                url=absolute,
            )

    # Deterministic order for reproducibility.
    return sorted(
        seen.values(),
        key=lambda s: (s.requested_category, s.main_slug, s.sub_slug),
    )


def pick_best_title(title_candidates: List[str]) -> str:
    cleaned: List[str] = []
    bad_tokens = {"", "learn more", "inquiry"}
    for title in title_candidates:
        normalized = " ".join((title or "").split())
        if normalize_text(normalized) in bad_tokens:
            continue
        if len(normalized) < 3:
            continue
        cleaned.append(normalized)
    if not cleaned:
        return ""
    # Prefer the longest non-generic candidate.
    cleaned.sort(key=len, reverse=True)
    return cleaned[0]


def scrape_family_products(
    session: requests.Session, subcategory: Subcategory
) -> List[Dict[str, object]]:
    response = session.get(subcategory.url, timeout=45)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    family_re = re.compile(
        rf"^/product/{re.escape(subcategory.main_slug)}/{re.escape(subcategory.sub_slug)}/(\d+)/$"
    )
    model_re = re.compile(
        rf"^/product/{re.escape(subcategory.main_slug)}/{re.escape(subcategory.sub_slug)}/(\d+)/(\d+)/$"
    )

    families: Dict[str, Dict[str, object]] = {}

    for anchor in soup.select("a[href]"):
        href = anchor.get("href", "").strip()
        if not href:
            continue
        absolute = canonicalize_url(href)
        path = urlparse(absolute).path

        family_match = family_re.match(path)
        if family_match:
            family_id = family_match.group(1)
            record = families.setdefault(
                family_id,
                {
                    "requested_category": subcategory.requested_category,
                    "official_main_slug": subcategory.main_slug,
                    "official_subcategory_slug": subcategory.sub_slug,
                    "official_subcategory_url": subcategory.url,
                    "official_product_id": family_id,
                    "official_product_url": absolute,
                    "title_candidates": [],
                    "image_candidates": [],
                    "model_ids": set(),
                    "model_names": set(),
                },
            )

            text = " ".join(anchor.get_text(" ", strip=True).split())
            if text:
                record["title_candidates"].append(text)

            image = anchor.find("img")
            if image:
                alt = " ".join((image.get("alt") or "").split())
                raw_src = (
                    (image.get("src") or "")
                    or (image.get("data-src") or "")
                    or (image.get("data-original") or "")
                ).strip()
                src = canonicalize_url(raw_src) if raw_src else ""
                if alt:
                    record["title_candidates"].append(alt)
                if src and not src.startswith("data:"):
                    record["image_candidates"].append(src)
            continue

        model_match = model_re.match(path)
        if model_match:
            family_id = model_match.group(1)
            model_id = model_match.group(2)
            record = families.setdefault(
                family_id,
                {
                    "requested_category": subcategory.requested_category,
                    "official_main_slug": subcategory.main_slug,
                    "official_subcategory_slug": subcategory.sub_slug,
                    "official_subcategory_url": subcategory.url,
                    "official_product_id": family_id,
                    "official_product_url": canonicalize_url(
                        f"/product/{subcategory.main_slug}/{subcategory.sub_slug}/{family_id}/"
                    ),
                    "title_candidates": [],
                    "image_candidates": [],
                    "model_ids": set(),
                    "model_names": set(),
                },
            )
            record["model_ids"].add(model_id)
            model_name = " ".join(anchor.get_text(" ", strip=True).split())
            if model_name and normalize_text(model_name) not in {"learn more", "inquiry"}:
                record["model_names"].add(model_name)

    normalized_products: List[Dict[str, object]] = []
    for family_id, record in families.items():
        title_candidates = record.pop("title_candidates")  # type: ignore[arg-type]
        image_candidates = record.pop("image_candidates")  # type: ignore[arg-type]
        model_ids = record.pop("model_ids")  # type: ignore[arg-type]
        model_names = record.pop("model_names")  # type: ignore[arg-type]

        title = pick_best_title(list(title_candidates))
        image_url = ""
        for img in image_candidates:
            if isinstance(img, str) and img:
                image_url = img
                break

        normalized_products.append(
            {
                **record,
                "official_product_id": family_id,
                "official_product_name": title,
                "official_image_url": image_url,
                "official_model_count_listed": len(model_ids),
                "official_model_names": sorted(model_names),
            }
        )

    normalized_products.sort(
        key=lambda p: (
            str(p["requested_category"]),
            str(p["official_main_slug"]),
            str(p["official_subcategory_slug"]),
            int(str(p["official_product_id"])),
        )
    )
    return normalized_products


def load_local_sany_db() -> List[Dict[str, object]]:
    payload = json.loads(DB_PRODUCTS_PATH.read_text(encoding="utf-8"))
    products = payload.get("products", [])
    sany_products: List[Dict[str, object]] = []
    for product in products:
        brand = str(product.get("brand", "")).strip().upper()
        if brand != "SANY":
            continue
        sany_products.append(
            {
                "id": product.get("id"),
                "title": str(product.get("title", "")).strip(),
                "category": str(product.get("category", "")).strip(),
                "image": str(product.get("image", "")).strip(),
            }
        )
    return sany_products


def db_candidates_for_requested_category(
    requested_category: str, db_products: List[Dict[str, object]]
) -> List[Dict[str, object]]:
    if requested_category == "Pompes":
        return [p for p in db_products if p["category"] == "pompes-beton"]
    if requested_category == "Grues":
        return [p for p in db_products if p["category"] == "grues"]
    if requested_category == "Pelles":
        return [p for p in db_products if p["category"] == "excavation"]
    if requested_category == "Compacteurs":
        compacteurs = []
        for p in db_products:
            if p["category"] != "terrassement":
                continue
            title_norm = normalize_text(str(p["title"]))
            if "compacteur" in title_norm or "roller" in title_norm:
                compacteurs.append(p)
        if compacteurs:
            return compacteurs
        return [p for p in db_products if p["category"] == "terrassement"]
    if requested_category == "Camions":
        return [p for p in db_products if p["category"] == "transport"]
    return []


def title_similarity(a: str, b: str) -> float:
    an = normalize_text(a)
    bn = normalize_text(b)
    if not an or not bn:
        return 0.0
    return SequenceMatcher(None, an, bn).ratio()


def image_phash(
    session: requests.Session, cache: Dict[str, Optional[imagehash.ImageHash]], url: str
) -> Optional[imagehash.ImageHash]:
    if not url:
        return None
    if url in cache:
        return cache[url]
    try:
        response = session.get(url, timeout=40)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content)).convert("RGB")
        phash = imagehash.phash(image)
        cache[url] = phash
        return phash
    except Exception:
        cache[url] = None
        return None


def verify_product_match(
    session: requests.Session,
    official_product: Dict[str, object],
    db_products: List[Dict[str, object]],
    hash_cache: Dict[str, Optional[imagehash.ImageHash]],
) -> Dict[str, object]:
    requested_category = str(official_product["requested_category"])
    candidates = db_candidates_for_requested_category(requested_category, db_products)

    official_name = str(official_product.get("official_product_name", "")).strip()
    official_image = str(official_product.get("official_image_url", "")).strip()

    best: Optional[Dict[str, object]] = None

    for candidate in candidates:
        db_name = str(candidate.get("title", "")).strip()
        db_image = str(candidate.get("image", "")).strip()

        t_score = title_similarity(official_name, db_name)
        exact_image_url_match = False
        i_score: Optional[float] = None
        phash_distance: Optional[int] = None

        if official_image and db_image:
            if canonicalize_image_identity(official_image) == canonicalize_image_identity(
                db_image
            ):
                exact_image_url_match = True
                i_score = 1.0
                phash_distance = 0
            else:
                official_hash = image_phash(session, hash_cache, official_image)
                db_hash = image_phash(session, hash_cache, db_image)
                if official_hash is not None and db_hash is not None:
                    distance = int(official_hash - db_hash)
                    phash_distance = distance
                    i_score = max(0.0, 1.0 - (distance / 64.0))

        # Weight image heavily because request asks explicit image verification.
        if i_score is not None:
            combined = (0.7 * i_score) + (0.3 * t_score)
        else:
            combined = 0.3 * t_score

        current = {
            "db_product_id": candidate.get("id"),
            "db_product_name": db_name,
            "db_product_category": candidate.get("category"),
            "db_image_url": db_image,
            "title_similarity": round(t_score, 4),
            "image_similarity": None if i_score is None else round(i_score, 4),
            "phash_distance": phash_distance,
            "exact_image_url_match": exact_image_url_match,
            "combined_score": round(combined, 4),
        }

        if best is None:
            best = current
            continue

        if float(current["combined_score"]) > float(best["combined_score"]):
            best = current
            continue

        # Tie-breaker: prefer higher image similarity when combined score is equal.
        if float(current["combined_score"]) == float(best["combined_score"]):
            current_i = current["image_similarity"]
            best_i = best["image_similarity"]
            current_i_f = float(current_i) if current_i is not None else -1.0
            best_i_f = float(best_i) if best_i is not None else -1.0
            if current_i_f > best_i_f:
                best = current

    if best is None:
        return {
            "db_product_id": None,
            "db_product_name": None,
            "db_product_category": None,
            "db_image_url": None,
            "title_similarity": 0.0,
            "image_similarity": None,
            "phash_distance": None,
            "exact_image_url_match": False,
            "combined_score": 0.0,
            "same_product": False,
            "confidence": "low",
            "verification_note": "No candidate product found in local SANY DB category scope.",
        }

    title_s = float(best["title_similarity"])
    image_s = best["image_similarity"]
    image_s_f = float(image_s) if image_s is not None else None
    exact = bool(best["exact_image_url_match"])
    combined_s = float(best["combined_score"])

    same_product = False
    confidence = "low"
    note = "Similarity below confirmation threshold."

    if exact:
        same_product = True
        confidence = "high"
        note = "Exact image asset path match with local DB."
    elif image_s_f is not None and image_s_f >= 0.96 and title_s >= 0.3:
        same_product = True
        confidence = "high"
        note = "Very high perceptual image similarity with acceptable title similarity."
    elif (
        image_s_f is not None
        and image_s_f >= 0.92
        and combined_s >= 0.8
        and title_s >= 0.4
    ):
        same_product = True
        confidence = "medium"
        note = "Strong image similarity and combined score indicate same product family."
    elif image_s_f is None and combined_s >= 0.23 and title_s >= 0.75:
        same_product = True
        confidence = "medium"
        note = "Image unavailable; high title similarity suggests likely same product."

    return {
        **best,
        "same_product": same_product,
        "confidence": confidence,
        "verification_note": note,
    }


def run() -> Dict[str, object]:
    session = get_session()
    subcategories = collect_target_subcategories(session)
    db_products = load_local_sany_db()

    all_official_products: List[Dict[str, object]] = []
    for subcategory in subcategories:
        all_official_products.extend(scrape_family_products(session, subcategory))

    # De-duplicate in the rare case a product URL appears multiple times.
    unique: Dict[str, Dict[str, object]] = {}
    for product in all_official_products:
        unique[str(product["official_product_url"])] = product
    official_products = list(unique.values())
    official_products.sort(
        key=lambda p: (
            str(p["requested_category"]),
            str(p["official_main_slug"]),
            str(p["official_subcategory_slug"]),
            int(str(p["official_product_id"])),
        )
    )

    hash_cache: Dict[str, Optional[imagehash.ImageHash]] = {}
    verified_products: List[Dict[str, object]] = []
    for product in official_products:
        verification = verify_product_match(session, product, db_products, hash_cache)
        verified_products.append(
            {
                "requested_category": product["requested_category"],
                "official_main_category_slug": product["official_main_slug"],
                "official_subcategory_slug": product["official_subcategory_slug"],
                "official_subcategory_url": product["official_subcategory_url"],
                "official_product_id": product["official_product_id"],
                "official_product_name": product["official_product_name"],
                "official_product_url": product["official_product_url"],
                "official_image_url": product["official_image_url"],
                "official_model_count_listed": product["official_model_count_listed"],
                "official_model_names": product["official_model_names"],
                **verification,
            }
        )

    payload = {
        "source_url": PRODUCT_ROOT_URL,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "requested_categories": [
            "Pompes",
            "Grues",
            "Pelles",
            "Compacteurs",
            "Camions",
        ],
        "subcategory_count": len(subcategories),
        "official_product_count": len(verified_products),
        "subcategory_urls": [s.url for s in subcategories],
        "products": verified_products,
    }
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return payload


if __name__ == "__main__":
    result = run()
    total = int(result["official_product_count"])
    confirmed = sum(1 for p in result["products"] if p.get("same_product"))  # type: ignore[index]
    print(f"Wrote {total} verified official products to {OUTPUT_PATH}")
    print(f"Confirmed as same product via verification: {confirmed}")
