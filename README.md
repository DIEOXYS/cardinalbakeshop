# Cardinal Bakeshop

This React/Vite website follows the owner's step-by-step tutorial. The front page at `/` uses the owner's selected tabletop image as a full-width hero with a dark overlay, a separate white original-logo header with burgundy navigation, centered Cardinal Bakeshop heading and two rectangular menu/contact actions. The selected hero is an explicitly approved generated composite; its source is recorded in references/image-sources.md. The page also has four featured-product cards, a three-category GSAP accordion using real Cardinal photos, a Facebook banner and social contact links. The shop at `/menu` displays 47 menu entries, category browsing, search, package sizes, flavor selection, and a browser-saved cart with quantity/removal controls. PHP prices and pickup/delivery were confirmed by the owner. Orders and payments are not submitted yet.

## Run locally in VS Code

1. Open this folder in VS Code.
2. Choose **Terminal > New Terminal**.
3. If dependencies are absent, run `npm.cmd install`.
4. Run `npm.cmd run dev` and open the Local URL printed by Vite, normally http://127.0.0.1:5173.
5. Edit the section's `.jsx` file for its content or matching `.css` file for its appearance. Use the editing guide below, save, and watch the browser update.
6. Press Ctrl+C in the terminal to stop the development server.

`npm.cmd` runs npm's Windows command launcher directly, avoiding PowerShell execution-policy errors from npm.ps1.

## Files

- `src/App.jsx`: selects the homepage at `/` and shop at `/menu`.
- `src/components/Home.jsx`: homepage section order and saved-cart count; `Home.css` beside it contains shared homepage buttons, headings and containers.
- `src/components/AccordionGallery.jsx` and its CSS: adapted owner-supplied photo accordion. Hover/focus expands desktop photos; clicking follows the real menu link. Arrow keys move focus; mobile photos stack, and reduced motion makes selection changes immediate.

The gallery displays the three menu categories instead of individual foods. Each category opens its menu tab. Its burgundy caption bands use a shared height that grows for wrapped text, with identical typography and padding in every selection state.
- `src/components/home/`: six homepage sections, each with matching `.jsx` and `.css` files, including its responsive styles.
- `src/components/SiteHeader.jsx` and `SiteHeader.css`: shared logo, navigation and cart link.
- `src/components/SiteFooter.jsx` and `SiteFooter.css`: all footer content and styles, including the burgundy homepage appearance.
- `src/components/Shop.jsx` and `Shop.css`: menu page layout, category/search state and saved-cart operations.
- `src/components/shop/`: menu introduction, product menu, product row, cart panel and phone cart shortcut, each with matching `.jsx` and `.css` files.
- `src/components/Icons.jsx`: shared SVG icons, including Facebook and the bolder Instagram icon.
- `src/styles/global.css`: shared fonts, colors, focus styles, base typography and browser-wide rules.
- `src/lib/menu.js`: shared product lookup, PHP formatting and pack labels.
- `src/lib/cart.js`: cart operations and saved-cart validation.
- `src/lib/cart.test.js`: six cart logic checks (`npm.cmd test`).
- `src/main.jsx`: mounts the React page.
- `src/data/menu.json`: 47 source menu entries, connected to the page.
- `references/price-list.png`: unchanged owner-supplied source.
- `references/image-sources.md`: origins of the original logo, five product photos and owner-selected hero composite.
- `references/homepage-layout-reference.png`: owner's supplied layout inspiration; its colors are not adopted.
- `references/hero-cafe-layout-reference.png`: current owner-supplied centered photographic hero layout reference. The cafe's branding, booking controls and pill styling are not copied.
- `references/hero-table-owner-selected.png`: exact selected hero attachment, preserved before JPEG compression for the public asset.
- `references/hero-layout-reference.png`: earlier product-selector hero reference, retained for history.
- `references/font-sources.md`: origins and licenses for self-hosted Lora and DM Sans fonts.
- `PROJECT-BRIEF.md`: project context and remaining stages.

## Editing individual sections

React uses `.jsx` files for the markup and JavaScript. Each component imports its matching plain `.css` file. Mobile breakpoints and reduced-motion styles live with the section they affect.

| Section | Content and JavaScript | Styling |
| --- | --- | --- |
| Header | `src/components/SiteHeader.jsx` | `src/components/SiteHeader.css` |
| Hero | `src/components/home/HeroSection.jsx` | `src/components/home/HeroSection.css` |
| From our menu | `src/components/home/FeaturedSection.jsx` | `src/components/home/FeaturedSection.css` |
| Explore our bakes | `src/components/home/GallerySection.jsx` | `src/components/home/GallerySection.css` |
| Cardinal on Facebook | `src/components/home/FacebookSection.jsx` | `src/components/home/FacebookSection.css` |
| Pickup and delivery | `src/components/home/FulfillmentSection.jsx` | `src/components/home/FulfillmentSection.css` |
| Contact | `src/components/home/ContactSection.jsx` | `src/components/home/ContactSection.css` |
| Footer | `src/components/SiteFooter.jsx` | `src/components/SiteFooter.css` |
| Menu introduction | `src/components/shop/MenuIntroduction.jsx` | `src/components/shop/MenuIntroduction.css` |
| Categories, search and product list | `src/components/shop/ProductMenu.jsx` | `src/components/shop/ProductMenu.css` |
| Individual product and flavor selection | `src/components/shop/ProductRow.jsx` | `src/components/shop/ProductRow.css` |
| Cart panel | `src/components/shop/CartPanel.jsx` | `src/components/shop/CartPanel.css` |
| Phone cart shortcut | `src/components/shop/MobileCartLink.jsx` | `src/components/shop/MobileCartLink.css` |

Change homepage section order in `Home.jsx`. Edit prices and product details in `src/data/menu.json`, and the address/email in `src/data/contact.json`. The shared icons are in `Icons.jsx`. The former `SiteChrome.jsx`, `src/home.css` and `src/shop.css` files were replaced by the component files above.

The product Add buttons are temporarily hidden at the owner's request. Their JSX, click handlers and cart logic remain intact. To show them again, remove `display: none` from `.add-button` in `src/components/shop/ProductRow.css`. The CSS also removes them from keyboard navigation and the accessibility tree while hidden.

The header cart link, cart panel and fixed phone cart shortcut are also temporarily hidden. Their JSX and saved-cart logic remain unchanged. Restore them by removing the final commented hiding rules in `SiteHeader.css`, `shop/CartPanel.css` and `shop/MobileCartLink.css`. Also remove the final full-width layout override in `Shop.css` and the final reserved-space override in `SiteFooter.css` to restore the original sidebar and phone footer spacing. All these files are in `src/components/`. Saved carts are not erased by hiding their interface.

The file separation passed an exact before/after comparison of eight rendered page snapshots, all 1,079 existing CSS declarations and their selectors/media conditions, a production build and six cart tests. These checks establish source parity, not a new browser visual or touch-interaction pass.

## Video differences

This project uses React with Vite, as described in React's current from-scratch documentation: https://react.dev/learn/build-a-react-app-from-scratch

- Start the local server with `npm.cmd run dev` rather than `npm start`.
- Vite's default development port is 5173.
- Build with `npm.cmd run build`.
- Production output goes into `dist`, which is the directory to select during the later Firebase Hosting setup.

The owner published the original starter. The current homepage and menu/cart changes are built locally but have not been deployed. The refinement includes a compact original-logo header, visible mobile menu link, consistent serif/body fonts, photo framing, a grouped footer, menu breadcrumb and visible cart feedback. No live payment integration exists yet.

## Review the homepage and menu stage

Phone layouts now include an expandable navigation control beside the menu/cart links, stacked photo cards and gallery captions, full-width categories, single-column menu rows and safe-area-aware cart access. Review 320, 360, 390 and 430px widths, landscape orientation and increased text size in your browser. Tap the navigation control, follow category links, select a flavor, add items and use the cart shortcut. Actual phone rendering and touch behavior still need manual review.

Hosting publication is blocked by the owner's launch requirements. Follow AGENTS.md and LAUNCH-CHECKLIST.md. A custom domain and accurate, completed privacy/terms pages are still outstanding. A build is permitted for local review; it does not authorize deployment.

1. Open http://127.0.0.1:5173; run `npm.cmd run dev` if the preview is stopped.
2. Check the homepage at desktop and narrow/mobile widths: photo crops, readable text, featured cards, gallery and social links. Each View on menu link should open its category and scroll to the correct product. Gallery category links should select their category; the Explore banner should open the owner's Facebook page.
3. Check all menu categories. Two Cheese Roll boxes should subtotal PHP 440. Select Small Chiffon Cake flavors; different flavors stay separate in the cart.
4. Try quantities, removal, search and refresh. Return to the homepage through the wordmark, then use its Cart link; saved choices should remain. Check keyboard focus and the mobile menu/cart layout.
5. Save with `git add .`, `git commit -m "Add homepage, product menu and cart"`, and `git push`.
6. Build using `npm.cmd run build` for local verification. Do not deploy until every launch requirement has evidence and the owner has authorized publication.

The production build, six cart tests and offline route-render checks passed. Navigation uses same-origin links and page loads; the saved cart survives those page changes in the same browser. Browser URL policy blocked automated access to the local preview, so desktop/mobile screenshots and browser interactions remain unverified and need manual review before publishing.

## Firebase CLI on this Windows computer

The owner's Firebase project ID is `cardinalbakeshopcebu`. The installed Firebase CLI is 15.25.0. Running the CLI with system Node 24.18.0 produced a libuv assertion after a successful project listing. A separate Node 22 runtime was tested: both `--version` and authenticated `projects:list` exited successfully.

From this project folder, use the included launcher for Firebase commands:

```powershell
.\scripts\firebase.cmd init hosting --project cardinalbakeshopcebu
```

The launcher uses the already installed Firebase CLI with a Node 22 runtime downloaded by npm into the ignored project cache. It does not replace system Node. Hosting initialization and deployment remain separate user-guided steps.

Relevant upstream report: https://github.com/firebase/firebase-tools/issues/11099
