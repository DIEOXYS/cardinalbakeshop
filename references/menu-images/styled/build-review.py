"""Build an offline comparison catalog; resize/encode only, no creative image edits."""
from pathlib import Path
import hashlib
import html
import json
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
PROJECT = HERE.parents[2]
manifest = json.loads((HERE.parent / "manifest.json").read_text(encoding="utf-8-sig"))
index = json.loads((HERE / "records.json").read_text(encoding="utf-8-sig"))
records = {}
for entry in index["items"]:
    record = json.loads((HERE / entry["recordFile"]).read_text(encoding="utf-8-sig"))
    assert entry["id"] == record["id"]
    assert record["id"] not in records, record["id"]
    records[record["id"]] = record

known = {item["id"]: item for item in manifest["items"]}
assert set(records) <= set(known)
website_map_path = PROJECT / "src/data/product-images.json"
website_map = json.loads(website_map_path.read_text(encoding="utf-8-sig")) if website_map_path.is_file() else {}
website_imported = set(website_map) == set(records) and all(
    (PROJECT / "public" / image["src"].lstrip("/")).is_file() for image in website_map.values())
checks = 0
for product_id, record in records.items():
    item = known[product_id]
    assert item["status"] == "matched", product_id
    assert record["source"] == item["primaryImage"], product_id
    source = PROJECT / record["source"]
    output = PROJECT / record["output"]
    assert output.parent.resolve() == HERE.resolve()
    assert source.is_file() and output.is_file(), product_id
    source_entry = next(src for src in item["sources"] if src["path"] == record["source"])
    assert hashlib.sha256(source.read_bytes()).hexdigest() == source_entry["sha256"], product_id
    checks += 1
    with Image.open(output) as img:
        img.load()
        assert img.width == img.height and img.width >= 1024, product_id
        record["width"], record["height"] = img.size
        preview = img.convert("RGB")
        preview.thumbnail((768, 768), Image.Resampling.LANCZOS)
        preview.save(HERE / (product_id + ".webp"), "WEBP", quality=88, method=6)
    record["sha256"] = hashlib.sha256(output.read_bytes()).hexdigest()
    record["bytes"] = output.stat().st_size
    record["preview"] = product_id + ".webp"
    record["sourcePage"] = item["sourcePage"]
    record["note"] = item.get("note", "")
    record["menuFlavors"] = item.get("menuFlavors", [])
    record.setdefault("ownerAppearanceReview", "pending")
    (HERE / "metadata" / (product_id + ".json")).write_text(
        json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    checks += 1

h = html.escape
cards = []
for item in manifest["items"]:
    rec = records.get(item["id"])
    if rec:
        source_rel = "../" + item["primaryImage"].removeprefix("references/menu-images/")
        original_in_use = website_map.get(item["id"], {}).get("kind") == "original-photo"
        current_image = "../../../public" + website_map[item["id"]]["src"] if original_in_use else rec["preview"]
        current_full_image = current_image if original_in_use else item["id"] + ".png"
        current_label = "Original photo used on website" if original_in_use else "Styled draft"
        warning = "Thumbnail-based draft. Higher-resolution original needed." if rec["sourceResolution"] == "thumbnail-only" else "AI-edited draft. Check appearance against the source."
        if original_in_use:
            warning = "Previous AI edit rejected by the owner. The website now uses the unchanged original photograph, preserving its actual angle and food texture."
        comparisons = (
            '<div class="comparison">'
            f'<figure><a href="{h(source_rel, quote=True)}"><img loading="lazy" src="{h(source_rel, quote=True)}" alt="Collected reference for {h(item["name"], quote=True)}"></a><figcaption>Original reference</figcaption></figure>'
            f'<figure><a href="{h(current_full_image, quote=True)}"><img loading="lazy" width="768" height="768" src="{h(current_image, quote=True)}" alt="{h(current_label, quote=True)} of {h(item["name"], quote=True)}"></a><figcaption>{h(current_label)}</figcaption></figure>'
            '</div>'
        )
        details = f'<p class="status">{h(warning)}</p>'
        if item.get("menuFlavors"):
            details += '<p class="note">This reference does not verify every menu flavor.</p>'
        if item.get("note"):
            details += f'<p class="note">{h(item["note"])}</p>'
        details += f'<p class="links"><a href="{h(item["sourcePage"], quote=True)}">Source page</a><a href="{h(current_full_image, quote=True)}">Full image</a><a href="metadata/{h(item["id"], quote=True)}.json">Edit history and source record</a></p>'
    else:
        reason = item.get("note") or ("No reliable image collected." if item["status"] == "missing" else "Identity or size needs confirmation." if item["status"] == "needs-confirmation" else "Only a 206-pixel thumbnail is available. A higher-resolution original is needed for faithful editing.")
        comparisons = f'<div class="unassigned">{h(reason)}</div>'
        details = '<p class="status">No styled image assigned.</p>'
    cards.append(f'<article><h2>{h(item["name"])}</h2>{comparisons}{details}</article>')

low = sum(r["sourceResolution"] == "thumbnail-only" for r in records.values())
document = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cardinal product image review</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#fcf7f1;color:#352b29;font:16px/1.5 Arial,sans-serif}
header,main,footer{max-width:1440px;margin:auto;padding:28px}
header{border-bottom:1px solid #ded0c5}h1{font:normal clamp(28px,4vw,44px)/1.15 Georgia,serif;margin:0 0 16px}header p{max-width:900px;margin:10px 0}
main{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
article{min-width:0;padding:18px;background:#fffdf9;border:1px solid #ded0c5}
h2{font:normal 24px/1.3 Georgia,serif;margin:0 0 16px}
.comparison{display:grid;grid-template-columns:1fr 1fr;gap:14px}figure{margin:0;min-width:0}
img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:contain;background:#f3e9dd}
figcaption{font-size:14px;margin-top:6px}a{color:#810834;text-underline-offset:3px}
a:focus-visible{outline:3px solid #810834;outline-offset:4px}
.status{font-size:14px;font-weight:bold}.note{font-size:14px;color:#5d5149}
.links{display:flex;flex-wrap:wrap;gap:10px 20px;font-size:14px}
.unassigned{min-height:180px;display:flex;align-items:center;background:#f3e9dd;padding:24px}
footer{border-top:1px solid #ded0c5}
@media(max-width:760px){main{grid-template-columns:1fr}header,main,footer{padding:18px}.comparison{gap:8px}article{padding:12px}}
</style></head><body>"""
active_originals = sum(image.get("kind") == "original-photo" for image in website_map.values())
integration_note = f"The local React site uses {len(website_map)-active_originals} styled images and {active_originals} original photograph. The Hokkaido Cupcake AI edit was rejected and replaced with its unchanged source photo." if website_imported and active_originals else "The completed assets are connected to the local React menu and matching homepage previews." if website_imported else "The assets have not been added to the React menu."
document += f'<header><h1>Cardinal product image review</h1><p>{len(records)} styled drafts, including {low} based on small thumbnails. {len(manifest["items"])-len(records)} menu entries have no styled image assigned.</p><p>Compare each edited image with its original. {integration_note} They have not been published. Original photos remain unchanged. Fine food details may differ after editing; owner appearance review is pending.</p><p><a href="../review.html">Original collection</a> · <a href="README.md">Notes</a> · <a href="prompts.json">Initial prompt plan</a></p></header>'
document += '<main>' + "".join(cards) + '</main><footer>No guessed products, sizes or flavors were created.</footer></body></html>'
(HERE / "review.html").write_text(document, encoding="utf-8")

font_path = Path("C:/Windows/Fonts/segoeui.ttf")
font = ImageFont.truetype(str(font_path), 18) if font_path.exists() else ImageFont.load_default()
small = ImageFont.truetype(str(font_path), 14) if font_path.exists() else ImageFont.load_default()
ordered = [records[item["id"]] for item in manifest["items"] if item["id"] in records]
for offset in range(0, len(ordered), 20):
    subset = ordered[offset:offset+20]
    columns, tile, gap, label = 5, 280, 18, 80
    rows = (len(subset) + columns - 1) // columns
    sheet = Image.new("RGB", (columns*(tile+gap)+gap, rows*(tile+label+gap)+gap), "#fcf7f1")
    draw = ImageDraw.Draw(sheet)
    for number, record in enumerate(subset):
        x = gap + (number % columns)*(tile+gap)
        y = gap + (number // columns)*(tile+label+gap)
        sheet_source = PROJECT / "public" / website_map[record["id"]]["src"].lstrip("/") if website_map.get(record["id"], {}).get("kind") == "original-photo" else PROJECT / record["output"]
        with Image.open(sheet_source) as img:
            image = img.convert("RGB")
            image.thumbnail((tile,tile), Image.Resampling.LANCZOS)
            sheet.paste(image, (x+(tile-image.width)//2, y+(tile-image.height)//2))
        title = record["name"]
        words, lines, line = title.split(), [], ""
        for word in words:
            test = (line + " " + word).strip()
            if draw.textbbox((0,0),test,font=font)[2] > tile:
                lines.append(line)
                line = word
            else:
                line = test
        lines.append(line)
        for line_number, text in enumerate(lines[:2]):
            draw.text((x,y+tile+8+line_number*22),text,font=font,fill="#352b29")
        status = "Original photo in use" if record.get("ownerAppearanceReview") == "rejected" else "Thumbnail draft" if record["sourceResolution"]=="thumbnail-only" else "AI-edited draft"
        draw.text((x,y+tile+56),status,font=small,fill="#810834")
    sheet.save(HERE / f"contact-sheet-{offset//20+1}.jpg", quality=93)

report = {"completed":len(records),"largerReferenceDrafts":len(records)-low,"thumbnailDrafts":low,
    "unassigned":[{"id":item["id"],"name":item["name"],"reason":"higher-resolution-original-needed" if item["resolution"] == "thumbnail-only" and item["status"] == "matched" else item["status"]} for item in manifest["items"] if item["id"] not in records],
    "verifiedOriginalHashes":checks//2,"verifiedSquareOutputs":checks//2,
    "ownerAppearanceReview":"pending","websiteImported":website_imported,"activeStyledImages":len(website_map)-active_originals,"activeOriginalPhotos":active_originals,"rejectedDrafts":[id for id,record in records.items() if record.get("ownerAppearanceReview") == "rejected"],"deployed":False}
(HERE / "verification.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(report,ensure_ascii=False))

