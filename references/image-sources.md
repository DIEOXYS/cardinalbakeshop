# Homepage image sources

## Current Hokkaido Cupcake image, 2026-10-05

After reviewing angle, texture and wrapper-print previews, the owner requested removal of the label and addition of the image to the site. The current local menu uses /images/menu/hokkaido-cupcake-v3.webp: an AI-edited cupcake with a pale-blue bakery-patterned wrapper, with the emblem and lettering removed. This is a generated derivative, not an unchanged photograph. The final edit target, exact removal prompt, generated output, prior rejected draft and owner instruction are recorded in menu-images/styled/metadata/hokkaido-cupcake.json; the served WebP has a provenance sidecar. The active map again contains 30 styled derivatives and 17 text-only entries. The original photograph and rejected drafts remain preserved. No Firebase deployment occurred; the domain, legal-page and manual-review requirements remain unresolved.

## Hokkaido Cupcake correction, 2026-10-05

The owner rejected the edited Hokkaido Cupcake's generated-looking texture and camera angle. Its menu image now uses an unchanged copy of references/menu-images/hokkaido-cupcake.jpg, served as /images/menu/hokkaido-cupcake-original.jpg. It preserves the original photographed angle, cupcakes and baking cups. The source is Cebu247's Cardinal article, credited to Cardinal's Facebook page. Source/hash provenance is beside the served JPEG. The review catalog and contact sheet show the original in use; rejected AI files remain recorded separately as edit history. The active map now contains 29 styled derivatives and one original photograph, with 17 entries still text-only. No deployment occurred.

## Styled menu image derivatives, 2026-10-04

The owner requested individual product shots with clutter and text removed, then specified a little background design instead of plain white. [The styled review catalog](menu-images/styled/review.html) compares 30 AI-edited drafts against their collected references. The setting uses cream plaster, beige stone, soft daylight and a narrow burgundy edge. These are edited derivatives, not original bakery photographs. The exact source, output, prompt, prior variant and generation path are recorded in [the edit index](menu-images/styled/records.json) and its per-product metadata files.

The 10 thumbnail-only references were left unedited, two identities or sizes remain unconfirmed, and five products lack reliable references. No missing products or unseen flavors were generated. Jar labels are blanked while retaining their paper shape so hidden contents are not invented. Editing can still change fine food details; owner appearance and source-use review are pending. All original files are retained. At the owner's request, 30 compressed 768px WebP derivatives are integrated locally in public/images/menu, mapped by src/data/product-images.json. Product rows, the four featured previews and the three category previews use these assets. Cream Roll and Mini Toasted Chiffon Cake show only the Ube reference, labeled Ube shown, and omit it when another flavor is selected. Seventeen unassigned products remain text-only. The selected tabletop hero remains unchanged. Nothing has been deployed.

## Menu image research collection, 2026-10-04

The separate [menu image catalog](menu-images/README.md) covers all 47 menu entries and records 40 source-supported matches, two candidates requiring identity or size confirmation, and five missing images. Thirty matched items have a larger reference image; ten currently have only 206-pixel Facebook previews. Larger reference does not mean HD or a clean product photo. Official social graphics retain their embedded text.

Open [the visual collection](menu-images/review.html) to inspect every item, or read [manifest.json](menu-images/manifest.json) for local paths, original source links, dimensions, hashes and matching notes. The collection includes unchanged owner attachments, labeled photos credited to Cardinal via Cebu247 and SPOT.ph, and publicly visible official Facebook and Instagram images. The original collection is research material; the separate styled derivatives above are used locally. Full photo access and further browsing reached social sign-in prompts; no login was attempted. The original homepage files below remain intact, although featured and category previews now use the styled copies.

## Existing website assets

The shared homepage/menu header uses the original Cardinal symbol, lettering and tagline from the owner's `references/price-list.png` (served unchanged as `/price-list.png`). CSS shows the logo region at source coordinates x=940, y=20, width=280, height=230 in the 2048×2048 image. No redrawing or generated replacement is used.

The five homepage JPEGs were sourced from [Cebu247's Cardinal Bakeshop article](https://cebu247.com/cardinal-bakeshop-cebu/). The article credits its photos to [Cardinal Bakeshop's Facebook page](https://www.facebook.com/cebucardinalbakeshop). These records identify where the files were obtained; they do not establish a separate image license or an original social-post URL.

| Local asset | Exact downloaded source | Homepage use |
| --- | --- | --- |
| `public/images/cardinal-bakeshop.jpg` | [CARDINAL-BAKESHOP.jpg](https://cebu247.com/wp-content/uploads/2023/03/CARDINAL-BAKESHOP.jpg) | Stored reference photo, not currently displayed |
| `public/images/ube-ensaymada.jpg` | [UBE-ENSAYMADA.jpg](https://cebu247.com/wp-content/uploads/2023/03/UBE-ENSAYMADA.jpg) | Breads and pastries preview |
| `public/images/mango-cream-cake.jpg` | [MANGO-CREAM-CAKE.jpg](https://cebu247.com/wp-content/uploads/2023/03/MANGO-CREAM-CAKE.jpg) | Cakes preview |
| `public/images/caramel-crunch.jpg` | [CARAMEL-CRUNCH.jpg](https://cebu247.com/wp-content/uploads/2023/03/CARAMEL-CRUNCH.jpg) | Cookies and delicacies preview |
| `public/images/egg-tart.jpg` | [EGG-TART.jpg](https://cebu247.com/wp-content/uploads/2023/03/EGG-TART.jpg) | Egg Tart featured card |

Each local JPEG also carries its origin URL in a JPEG comment. Prices and package quantities come from the owner's menu in `src/data/menu.json`, independently of this article. Photo crops require manual desktop/mobile review because automated preview access was blocked by browser URL policy.

The current hero uses `public/images/cardinal-table-hero.jpg`, a 1672 x 941 JPEG compressed at quality 90 from the exact owner-selected attachment `codex-clipboard-a2de1758-853b-4094-bf56-9d4d706b99c7.png`. The unchanged PNG is preserved as `references/hero-table-owner-selected.png`. This image is a generated tabletop composite made earlier in this conversation from the owner's supplied product references. It is not an original photograph of all the products together. The owner explicitly selected this image for the hero on 2026-10-04, creating a narrow exception to the general generated-product-photo restriction. Do not substitute a different wallpaper version or apply this exception to other imagery. The image pixels were not creatively edited for integration; CSS handles responsive cropping and a solid dark overlay.

`references/hero-cafe-layout-reference.png` preserves the second attachment's cafe layout as composition inspiration only. Its typography treatment and centered content inform the hero; the owner subsequently restored the separate white header with burgundy navigation.  cafe branding, booking controls, phone number, extra claims and pill buttons are not adopted.

The accordion gallery represents the three source-menu categories: Ube Ensaymada illustrates Breads & pastries, Mango Cream Cake illustrates Cakes, and Caramel Crunch illustrates Cookies & delicacies. Its labels and destinations are categories rather than individual products. The original images are unchanged.
