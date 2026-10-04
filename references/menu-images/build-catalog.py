"""Rebuild the local research catalog without fetching or changing site assets."""
import collections
import hashlib
import html
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FOLDER = Path(__file__).resolve().parent
ROOT = FOLDER.parent.parent


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def verify(record):
    path = ROOT / record["path"]
    assert path.resolve().is_relative_to(FOLDER), record["path"]
    data = path.read_bytes()
    assert hashlib.sha256(data).hexdigest() == record["sha256"], path
    with Image.open(path) as photo:
        photo.verify()
    with Image.open(path) as photo:
        assert photo.size == (record["width"], record["height"]), path


menu = read(ROOT / "src/data/menu.json")
selection = read(FOLDER / "catalog-selection.json")
downloads = {r["id"]: r for r in read(FOLDER / "download-records.json") if "path" in r}
facebook = {r["id"]: r for r in read(FOLDER / "facebook-records.json")}
owner = {r["id"]: r for r in read(FOLDER / "owner-supplied/records.json")}
instagram = {r["id"]: r for r in read(FOLDER / "instagram/records.json") if "path" in r}
all_records = list(downloads.values()) + list(facebook.values()) + list(owner.values()) + list(instagram.values())
for record in all_records:
    verify(record)

items = []
for category in menu["categories"]:
    for product in category["items"]:
        pid = product["id"]
        sources = []
        primary = None
        if pid in downloads:
            record = {**downloads[pid], "type": "product-photo", "evidence": "The Cebu247 article labels this specific Cardinal image with the product name."}
            sources.append(record)
            primary = record
        if pid in facebook:
            sources.append(facebook[pid])
            primary = primary or facebook[pid]
        if pid in selection["owner"]:
            record = {**owner[selection["owner"][pid]], "type": "owner-product-reference", "corroboratingSource": facebook[pid]["sourcePage"], "evidence": "The supplied product reference visually matches the product in the labeled official Facebook graphic. The Chocolate Almond jar also carries its own label."}
            sources.append(record)
            primary = record
        if pid in selection["instagram"]:
            iid = selection["instagram"][pid]
            label = {"cream-roll": "Ube Cream Roll", "small-chiffon-cake": "Ube Chiffon Cake", "yema-bun": "Cheese Roll and Yema Bun", "choco-hazelnut-crunch-cake": "Choco Hazelnut Crunch"}.get(pid, product["name"])
            record = {**instagram[iid], "sourceLabel": label, "evidence": "Product name read directly from the downloaded official Instagram graphic."}
            if pid == "yema-bun":
                record["type"] = "social-graphic-multiple-products"
            sources.append(record)
            primary = record
        status = "matched" if primary else "missing"
        note = ""
        if pid in selection["candidates"]:
            status = "needs-confirmation"
            note = selection["candidates"][pid]
        if pid == "mini-toasted-chiffon-cake":
            note = "The package label identifies Ube flavor. Orange flavor has no separate matched image."
        if pid == "cream-roll":
            note = "The collected graphic identifies Ube flavor. Orange and Chocolate flavors have no separate matched images."
        if pid in ("big-chiffon-cake", "small-chiffon-cake") and not primary:
            note = "No image found with both the menu size and flavor confirmed."
        if pid == "yema-bun":
            note = "The larger graphic shows both Cheese Roll and Yema Bun, with individual labels. A separate Yema Bun thumbnail is also saved."
        if pid == "boston-cream-pie-cake":
            note = "The article caption has a spelling error: BOSTO CREAM PIE. The pictured product is recorded under the supplied menu name."
        if not primary and not note:
            note = "No reliably labeled Cardinal image collected from the accessible sources."
        resolution = "larger-reference" if primary and primary["width"] >= 480 and primary["height"] >= 320 else "thumbnail-only" if primary else "none"
        items.append({"id": pid, "name": product["name"], "category": category["id"], "status": status, "resolution": resolution, "primaryImage": primary["path"] if primary else None, "sourcePage": primary.get("sourcePage") or primary.get("corroboratingSource") if primary else None, "width": primary["width"] if primary else None, "height": primary["height"] if primary else None, "sources": sources, "menuFlavors": product.get("flavors", []), "note": note})

counts = dict(collections.Counter(item["status"] for item in items))
larger = sum(i["status"] == "matched" and i["resolution"] == "larger-reference" for i in items)
thumbnails = sum(i["status"] == "matched" and i["resolution"] == "thumbnail-only" for i in items)
catalog = {"brand": menu["brand"], "collectedOn": "2026-10-04", "menuItemCount": len(items), "counts": {**counts, "matchedWithLargerReference": larger, "matchedWithThumbnailOnly": thumbnails}, "scope": "Local research collection. No website images, product names, prices, cart logic or hosting configuration changed.", "meaningOfMatched": "A source label or caption and visual inspection support the menu identity. This is not confirmation of current appearance, exact package quantity, all flavors, image authenticity or separate publication rights.", "resolutionNote": "Larger reference means at least 480 pixels wide and 320 pixels tall, not HD. Facebook gallery files are 206-pixel thumbnails. Official social graphics contain embedded copy and are not clean standalone product photos.", "accessNotes": ["Facebook public gallery thumbnails were accessible, but opening a full photo required login. No login was attempted.", "Instagram public grid images were collected until its sign-in prompt limited further browsing. No login was attempted.", "Findglocal image downloads returned HTTP 403. Restaurant Guru page download timed out. General search often returned unrelated bakeries, whose images were excluded."], "items": items, "excludedMenuMatches": [{**downloads["chili-corn-tuna-unconfirmed"], "reason": "The source says Chili Corn Tuna, which is not the menu's Tuna Pandesal. Do not substitute."}, {**downloads["caramel-cake-unconfirmed"], "reason": "The source only says Caramel Cake. A separately labeled Coffee Caramel Cake reference was collected instead."}], "unconfirmedOwnerReference": {**owner["chocolate-cake"], "reason": "The unlabeled whole chocolate cake is kept as a reference. Use the labeled Instagram Moist Chocolate Cake image as the verified menu match."}}
assert len(items) == 47
assert len({i["id"] for i in items}) == len(items)
assert sum(counts.values()) == len(items)
(FOLDER / "manifest.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

lines = ["# Cardinal menu image collection", "", "Collected on 2026-10-04 against the 47 entries in src/data/menu.json.", "", f"{counts.get('matched', 0)} matched items: {larger} have a larger reference image; {thumbnails} have only a small thumbnail. {counts.get('needs-confirmation', 0)} need identity or size confirmation, and {counts.get('missing', 0)} have no reliable collected image.", "", "Open review.html for a visual catalog. manifest.json records every menu item, image path, source, dimensions and match notes. Source records include file hashes and the original image URLs where available. All original files are preserved without creative editing.", "", "Matched means the source supports the product identity. It does not confirm current appearance, exact package contents, all flavors, authenticity or separate publication rights. Larger reference means at least 480 x 320, not HD. Social graphics have embedded text. The 206-pixel Facebook previews need higher-resolution originals before use as menu product photos.", "", "The collection is kept in references/menu-images. It is not imported into the React site or deployed.", "", "## Still needed", ""]
for item in items:
    if item["status"] != "matched":
        lines.append(f"- {item['name']}: {item['note']}")
lines += ["", "## Higher-resolution originals needed", ""]
for item in items:
    if item["status"] == "matched" and item["resolution"] == "thumbnail-only":
        lines.append(f"- {item['name']}")
lines += ["", "## Complete menu coverage", "", "| Menu item | Status | Primary reference | Source |", "| --- | --- | --- | --- |"]
for item in items:
    path = item["primaryImage"]
    local = f"[Image]({Path(path).relative_to(FOLDER.relative_to(ROOT)).as_posix()})" if path else "Missing"
    source = f"[Source]({item['sourcePage']})" if item["sourcePage"] else "Not found"
    lines.append(f"| {item['name']} | {item['status']}; {item['resolution']} | {local} | {source} |")
lines += ["", "## Source and matching notes", "", "Cebu247's March 2023 article credits its product images to Cardinal's Facebook page. SPOT.ph's Cheese Roll photo is credited to Cardinal Bakeshop. Only their image labels and credits were used; their old prices, policies, availability, hours and branch lists were not adopted.", "", "Owner-supplied crops were compared against labeled official Facebook graphics. Source photo links are retained even where full photo access requires Facebook login. Public Instagram graphics supplied Ube Cake, Moist Chocolate Cake, Ube Cream Roll, Choco Hazelnut Crunch, the labeled Yema Bun group and the size-unconfirmed Ube Chiffon Cake.", "", "The Chili Corn Tuna photo is excluded as a Tuna Pandesal substitute. The article's generically labeled Caramel Cake is not used to confirm Coffee Caramel Cake. The unlabeled owner whole chocolate cake remains unconfirmed. Duplicate toasted-bread attachments remain documented; only one is selected.", "", "Cream Roll is represented by Ube only. Mini Toasted Chiffon Cake is represented by Ube only. Additional flavors require their own source-identified photos. The Ube Chiffon Cake package does not establish small size; it is not assigned to Big Chiffon Cake, whose supplied menu flavors are Orange and Marble.", "", "Full-photo Facebook access and more Instagram browsing encountered sign-in prompts. Findglocal downloads returned 403, and the Restaurant Guru page download timed out. Unrelated search photos were rejected. No sign-in or access-control bypass was attempted."]
(FOLDER / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

esc = html.escape
cards = []
for category in menu["categories"]:
    group = [i for i in items if i["category"] == category["id"]]
    group_cards = []
    for i in group:
        image = ""
        if i["primaryImage"]:
            rel = Path(i["primaryImage"]).relative_to(FOLDER.relative_to(ROOT)).as_posix()
            image = f'<a class="photo" href="{esc(rel)}"><img loading="lazy" src="{esc(rel)}" alt="{esc(i["name"])} product reference"></a>'
        else:
            image = '<div class="photo missing">Photo still needed</div>'
        source = f'<a href="{esc(i["sourcePage"])}" target="_blank" rel="noopener noreferrer">View source</a>' if i["sourcePage"] else ""
        label = {"matched": "Matched", "needs-confirmation": "Needs confirmation", "missing": "Missing"}[i["status"]]
        dimensions = f'{i["width"]} x {i["height"]}' if i["width"] else ""
        extra = "Small preview. Original needed." if i["resolution"] == "thumbnail-only" else ""
        group_cards.append(f'<article data-status="{i["status"]}">{image}<div class="details"><h3>{esc(i["name"])}</h3><p class="status">{label} {dimensions}</p><p>{esc(extra)}</p><p>{esc(i["note"])}</p>{source}</div></article>')
    cards.append(f'<section><h2>{esc(category["name"])}</h2><div class="grid">{"".join(group_cards)}</div></section>')
document = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cardinal menu image collection</title><style>
body{margin:0;background:#fffbf7;color:#30262a;font:16px/1.5 Arial,sans-serif}main{max-width:1260px;margin:auto;padding:32px 24px}h1{font:40px Georgia,serif;color:#800735;margin:0 0 16px}h2{font:28px Georgia,serif;margin-top:40px}.intro{max-width:900px}a{color:#800735}a:focus-visible,button:focus-visible{outline:3px solid #800735;outline-offset:4px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}article{border:1px solid #decfd5;background:white}.photo{height:230px;display:flex;align-items:center;justify-content:center;background:#f6f0ed}.photo img{width:100%;height:100%;object-fit:contain}.missing{color:#73676b}.details{padding:16px}.details h3{font-size:17px;margin:0 0 10px}.details p{margin:8px 0;font-size:14px}.status{font-weight:bold}article[data-status=needs-confirmation]{border-color:#a67b32}article[data-status=missing]{border-style:dashed}button{padding:10px 14px;border:1px solid #800735;background:white;color:#800735;font:inherit;cursor:pointer}button[aria-pressed=true]{background:#800735;color:white}.filters{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}article[hidden]{display:none}footer{margin:32px 0;font-size:14px}@media(max-width:520px){main{padding:24px 16px}h1{font-size:32px}.grid{grid-template-columns:1fr}.photo{height:260px}}
</style></head><body><main>'''
document += f'<h1>Cardinal menu image collection</h1><div class="intro"><p>{counts.get("matched", 0)} of 47 items matched. {larger} have larger reference images; {thumbnails} have only small previews. {counts.get("needs-confirmation", 0)} need confirmation. {counts.get("missing", 0)} still need photos.</p><p>Local research preview. Source labels support product identity. Confirm current appearance and publication rights before website use. Social graphics contain text; small previews need original files. Open an image to inspect it, or follow its source link.</p></div>'
document += '<nav class="filters" aria-label="Filter image records"><button data-filter="all" aria-pressed="true">All items</button><button data-filter="matched" aria-pressed="false">Matched</button><button data-filter="needs-confirmation" aria-pressed="false">Needs confirmation</button><button data-filter="missing" aria-pressed="false">Missing</button></nav>'
document += "".join(cards)
document += '<footer>Collected 2026-10-04. Website content and hosting remain unchanged. See README.md and manifest.json for the complete source records.</footer></main><script>document.querySelectorAll("[data-filter]").forEach(button=>{button.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));document.querySelectorAll("article[data-status]").forEach(card=>{card.hidden=button.dataset.filter!=="all"&&card.dataset.status!==button.dataset.filter;});});});</script></body></html>'
(FOLDER / "review.html").write_text(document, encoding="utf-8")

matched = [i for i in items if i["status"] == "matched"]
for page in range((len(matched) + 19) // 20):
    subset = matched[page * 20 : (page + 1) * 20]
    sheet = Image.new("RGB", (1200, ((len(subset) + 3) // 4) * 280), "#fffbf7")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 15)
    small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 13)
    for number, item in enumerate(subset):
        with Image.open(ROOT / item["primaryImage"]) as original:
            photo = original.convert("RGB")
        photo.thumbnail((280, 210))
        x, y = number % 4 * 300, number // 4 * 280
        sheet.paste(photo, (x + (300 - photo.width) // 2, y))
        title = item["name"]
        if len(title) > 32:
            title = title.replace("Sablé French Cookies", "Sablé")
        draw.text((x + 8, y + 216), title, font=font, fill="#30262a")
        note = "Small preview; original needed" if item["resolution"] == "thumbnail-only" else "Larger reference"
        draw.text((x + 8, y + 244), note, font=small, fill="#800735")
    sheet.save(FOLDER / f"menu-contact-sheet-{page + 1}.jpg", quality=95)
print(json.dumps(catalog["counts"]))
print(f"Verified {len(all_records)} source files. Created manifest, report, review and contact sheets.")
