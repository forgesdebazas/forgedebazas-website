# SANY Product Verification Report

Date: 2026-02-10  
Source dataset: `data/productsData.ts` (merged products list used by the site)  
Filter applied: SANY products in requested categories only:
- Pompes (`pompes-beton`)
- Grues (`grues`)
- Pelles (`excavation`)
- Compacteurs (products in `terrassement` with "compacteur" in title)

Total checked: **32** dataset entries.

---

## 1) Products with **no exact official product title match** on SANY Global

These are entries where the dataset label is not found as an official product title on `https://www.sanyglobal.com/product/`.

| Dataset ID | Dataset product title | Closest official product | Official link | Likely reason |
|---|---|---|---|---|
| `sany-pompe-beton-stationnaire` | SANY POMPE À BÉTON STATIONNAIRE | Trailer Pump / 90 Series Trailer Pump | https://www.sanyglobal.com/product/concrete_machinery/trailer_pump/ | **Name variant** (stationary vs trailer pump) + likely **outdated models** (`HBT9032CH`, `HBT9038CH` not currently listed) |
| `sany-mini-excavatrice` | SANY MINI EXCAVATRICE | Mini Excavator | https://www.sanyglobal.com/product/excavator/mini_excavator/ | **Name variant** (generic label) + partial **outdated models** (`SY27C`, `SY35C` not currently listed) |
| `sany-grue-camion-100t` | SANY GRUE MONTÉE SUR CAMION +100T | Over 90T Truck crane | https://www.sanyglobal.com/product/crane/truck_crane/80/ | Likely **mistaken/incorrect entry** (title/range inconsistent with listed model `STC500T`) |
| `sany-grue-tour` | SANY GRUE À TOUR | Tower Crane | https://www.sanyglobal.com/product/crane/tower_crane/ | **Name variant** (generic category) + likely **outdated/market-specific model naming** (`Topkit`, `Flat Top`, `SLT260`) |
| `sany-grue-tout-terrain-100-200t` | SANY GRUE TOUT-TERRAIN 100-200T | Below 200T All-terrain Crane | https://www.sanyglobal.com/product/crane/all-terrain_crane/83/ | **Name variant** + likely **incorrect/outdated models** (`SAC300`, `SAC400` not listed) |
| `sany-grue-terrain-accidente-30-50t` | SANY GRUE TERRAIN ACCIDENTÉ 30-50T | Below 50T Rough-terrain Crane | https://www.sanyglobal.com/product/crane/rough-terrain_crane/86/ | **Name variant** + likely **incorrect/outdated models** (`SRC250C` not listed) |
| `sany-grue-terrain-accidente-80t` | SANY GRUE TERRAIN ACCIDENTÉ +80T | Over 80T Rough-terrain Crane | https://www.sanyglobal.com/product/crane/rough-terrain_crane/88/ | **Name variant** (+80 vs over 80) + likely **incorrect/outdated model** (`SRC500C` not listed) |
| `sany-grue-chenilles-lattice` | SANY GRUE SUR CHENILLES - TREILLIS | Lattice Boom Crawler Crane family | https://www.sanyglobal.com/product/crane/crawler_crane/ | **Name variant** (family label), with likely **outdated model codes** (`SCC2600`, `SCC4000` vs current suffixed models) |
| `sany-grue-montee-camion-2t` | SANY GRUE MONTÉE SUR CAMION LÉGÈRE | Truck-mounted Crane | https://www.sanyglobal.com/product/crane/truck-mounted_crane/ | Likely **mistaken/over-generic entry** (official split is below/over 35T, not 2T) |
| `sany-compacteur-vibrant` | SANY COMPACTEUR VIBRANT | Single Drum Roller / Tandem Drum Roller families | https://www.sanyglobal.com/product/road_machinery/roller/ | **Name variant** (vibratory roller naming) + likely **outdated model** (`SSR800` not listed; `STR140` appears as `STR140C-10`) |
| `sany-grue-camion-50-100t` | SANY GRUE MONTÉE SUR CAMION 50-100T | 50 - 90T Truck Crane (and Over 90T Truck crane) | https://www.sanyglobal.com/product/crane/truck_crane/78/ | Likely **mistaken/incorrect range merge** (official split does not use 50-100 as one family) |

---

## 2) Products confirmed as existing on official SANY Global pages

| Dataset ID | Dataset product title | Exact matched official product name | Official link |
|---|---|---|---|
| `sany-pompe-beton-37m` | SANY POMPE À BÉTON MONTÉE SUR CAMION DE MOINS DE 37M | Below 37m Truck-mounted Concrete Pump | https://www.sanyglobal.com/product/concrete_machinery/truck-mounted_concrete_pump/10/ |
| `sany-pompe-beton-camion-moins-37m` | SANY POMPE À BÉTON MONTÉE SUR CAMION DE MOINS DE 37M | Below 37m Truck-mounted Concrete Pump | https://www.sanyglobal.com/product/concrete_machinery/truck-mounted_concrete_pump/10/ |
| `sany-pompe-beton-camion-37m` | SANY POMPE À BÉTON MONTÉE SUR CAMION DE 37M | 37m Truck-mounted Concrete Pump | https://www.sanyglobal.com/product/concrete_machinery/truck-mounted_concrete_pump/11/ |
| `sany-pompe-a-beton-stationnaire-serie-60` | Pompe à béton stationnaire série 60 | 60 Series Trailer Pump | https://www.sanyglobal.com/product/concrete_machinery/trailer_pump/22/ |
| `sany-pompe-a-beton-montee-sur-camion-de-38-48m` | Pompe à béton montée sur camion de 38-48m | 38 - 48m Truck-mounted Concrete Pump | https://www.sanyglobal.com/product/concrete_machinery/truck-mounted_concrete_pump/12/ |
| `sany-camion-grue-de-moins-de-45t` | Camion grue de moins de 45T | Below 45T Truck Crane | https://www.sanyglobal.com/product/crane/truck_crane/76/ |
| `sany-camion-grue-de-50-90t` | Camion grue de 50-90T | 50 - 90T Truck Crane | https://www.sanyglobal.com/product/crane/truck_crane/78/ |
| `sany-camion-grue-de-plus-de-90t` | Camion grue de plus de 90T | Over 90T Truck crane | https://www.sanyglobal.com/product/crane/truck_crane/80/ |
| `sany-grue-tout-terrain-de-moins-de-200t` | Grue tout-terrain de moins de 200T | Below 200T All-terrain Crane | https://www.sanyglobal.com/product/crane/all-terrain_crane/83/ |
| `sany-grue-tout-terrain-200-300t` | SANY GRUE TOUT-TERRAIN 200-300T | 200 - 300T All-terrain Crane | https://www.sanyglobal.com/product/crane/all-terrain_crane/84/ |
| `sany-grue-terrain-accidente-50-80t` | SANY GRUE TERRAIN ACCIDENTÉ 50-80T | 50 - 80T Rough-terrain Crane | https://www.sanyglobal.com/product/crane/rough-terrain_crane/87/ |
| `sany-grue-sur-chenilles-a-fleche-telescopique` | Grue sur chenilles à flèche télescopique ≥55T | Over 55T Telescopic Boom Crawler Crane | https://www.sanyglobal.com/product/crane/crawler_crane/105/ |
| `sany-mini-excavatrice-moins-25t` | SANY MINI EXCAVATRICE DE MOINS DE 2,5T | Below 2.5T Mini Excavator | https://www.sanyglobal.com/product/excavator/mini_excavator/108/ |
| `sany-mini-excavatrice-de-moins-de-2-5t` | Mini excavatrice de moins de 2,5T | Below 2.5T Mini Excavator | https://www.sanyglobal.com/product/excavator/mini_excavator/108/ |
| `sany-mini-excavatrice-25-5t` | SANY MINI EXCAVATRICE DE 2,5-5T | 2.5 - 5T Mini Excavator | https://www.sanyglobal.com/product/excavator/mini_excavator/109/ |
| `sany-mini-excavatrice-de-2-5-5t` | Mini excavatrice de 2,5-5T | 2.5 - 5T Mini Excavator | https://www.sanyglobal.com/product/excavator/mini_excavator/109/ |
| `sany-excavatrice-moyenne-de-20-21-5t` | Excavatrice moyenne de 20 - 21,5T | 20 - 21.5T Medium Excavator | https://www.sanyglobal.com/product/excavator/medium_excavator/113/ |
| `sany-excavatrice-moyenne-de-22-35t` | Excavatrice moyenne de 22 - 35T | 22 - 35T Medium Excavator | https://www.sanyglobal.com/product/excavator/medium_excavator/114/ |
| `sany-excavatrice-large-de-plus-de-36t` | Excavatrice large de plus de 36T | Over 36T Large Excavator | https://www.sanyglobal.com/product/excavator/large_excavator/115/ |
| `sany-compacteur-a-pneus` | Compacteur à pneus | Pneumatic Tyre Roller | https://www.sanyglobal.com/product/road_machinery/roller/52/ |
| `sany-compacteur-a-tambour-tandem` | Compacteur à tambour tandem | Tandem Drum Roller | https://www.sanyglobal.com/product/road_machinery/roller/53/ |

---

## 3) Notes

- Several entries are duplicates by naming (same official family mapped from multiple dataset IDs), especially in:
  - Pumpes: below 37m
  - Pelles: below 2.5T and 2.5-5T
- A number of entries use older or market-specific model codes (missing suffixes like `T5`, `C-10`, etc.), which likely explains many near-matches.
- Verification was done against the current public SANY Global pages (`https://www.sanyglobal.com/product/`) at check time.
