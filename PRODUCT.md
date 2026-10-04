# Cardinal Bakeshop

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The owner chose the linked video's React, GitHub, and Firebase workflow. The local React starter uses Vite. Development is on Windows in VS Code with PowerShell.

## Users

Customers browsing Cardinal Bakeshop's menu and choosing products to order.

## Product Purpose

The owner requested online ordering and payment. Pickup and delivery were explicitly confirmed. This stage implements a bakery homepage, product browsing and a device-local cart; order submission and payments remain future work.

## Capabilities and Constraints

The homepage shows four featured products and links into all three menu categories. Its featured prices come from the same 47 menu entries with source prices, package quantities and flavor options. Currency explicitly confirmed as PHP. Preserve unspecified package sizes instead of inventing them. Payment provider, delivery areas/fees, pickup locations, lead times, availability and policies are undecided. Do not invent those facts or represent a client-only cart as a completed order.

Thirty menu entries now use AI-edited product references in the local website. The Hokkaido Cupcake uses the owner-requested v3 revision with a bakery-patterned wrapper and its emblem and lettering removed; prior rejected revisions and the original photograph remain preserved. The same image map supplies the four featured products and three category previews; the remaining 17 entries stay text-only. Cream Roll and Mini Toasted Chiffon Cake show their Ube image initially and when Ube is selected, with the caption Ube shown. Choosing another flavor removes the image and caption. Names, prices, package sizes and flavor choices remain from the source menu. Add controls and cart surfaces remain temporarily hidden at the owner's request.

## Brand Commitments

Owner-supplied name: cardinalbakeshop. Source image displays Cardinal and Baked with Pride, using burgundy and white. Preserve the existing page heading Explore our menu and the supplied social links.

## Evidence on Hand

- `references/price-list.png`: unchanged owner-supplied menu image.
- `src/data/menu.json`: transcription of 21 breads/pastries, 16 cakes and 10 cookies/delicacies.
- Facebook: https://www.facebook.com/cebucardinalbakeshop
- Instagram: https://www.instagram.com/cardinalbakeshop/
- The five original homepage photo files sourced from Cebu247's Cardinal Bakeshop article, which credits Cardinal Bakeshop's Facebook page, remain preserved. Featured and category previews now use the separate styled menu derivatives. Exact file origins are recorded in `references/image-sources.md`; externally sourced reference photos are not newly supplied owner assets.
- On 2026-10-04 the owner explicitly selected the previously generated tabletop composite for the hero and supplied a centered cafe-style layout reference. This asset-specific exception is recorded in AGENTS.md and remains separate from the menu-reference editing exception.
- The owner separately authorized editing collected, identity-matched menu references into individual images with restrained cream, stone and burgundy backgrounds, with text and clutter removed. Thirty 768 x 768 styled WebP copies are served from `public/images/menu` through `src/data/product-images.json` and `src/lib/productImages.js`. Their AI-edited origins, prompts and source records remain in `references/menu-images/styled`; public WebP provenance sidecars retain the derivative chain. These are edited derivatives, not original product photographs. This exception does not authorize inventing missing products, unseen food details or unconfirmed variants.
- `references/menu-images/styled/integration-checks.json` records source-level coverage of 47 menu rows, 30 images, 17 text-only entries, seven homepage previews, three category routes, flavor filtering and public/built assets, plus six passing cart tests. The local production build and source/reference hash checks passed. Browser automation remains restricted; manual desktop/phone appearance, gallery crops, touch and keyboard behavior, and food appearance review remain pending. No hosting deployment or visual approval is claimed.
- Social-page contents were unavailable to web lookup. Store addresses and business hours remain unconfirmed.

## Product Principles

- Honor the owner's permanent design/content restrictions in AGENTS.md and the release blockers in LAUNCH-CHECKLIST.md. No new hosting deployment is currently authorized.

- Show package quantities and flavor choices clearly.
- Derive cart prices from the menu, not stored client prices.
- Preserve cart choices in the same browser while browsing.
- Keep checkout status honest until payment and fulfillment are connected.
