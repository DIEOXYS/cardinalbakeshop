# Cardinal Bakeshop

## Project instructions

The owner's latest requirements in AGENTS.md override older styling and deployment suggestions. No new hosting deployment is permitted until the custom domain, favicon, attribution-badge check, completed privacy policy, completed terms and conditions, and required reviews are verified. Track unresolved requirements in LAUNCH-CHECKLIST.md. Do not invent policy or business details.

Build Cardinal Bakeshop's website with React, GitHub, and Firebase, following the linked tutorial in explained stages. The owner is learning on Windows with PowerShell and VS Code. Explain what each command does, where it runs, and the expected result. Verify installed tools and completed steps rather than assuming them.

Customers must be able to browse products, add products to a cart, place orders, and pay online. This is an online store, extending the video's landing-page example. Prepare checkout in test mode before enabling real transactions. Payment provider and fulfillment rules are not selected yet.

Use the supplied price-list image as the initial product source. Preserve product names, amounts, quantities, and flavor options. Do not invent product photos, descriptions, ingredients, allergens, availability, store addresses, hours, delivery fees, or policies. Display package quantities beside prices. The owner explicitly confirmed PHP currency and pickup/delivery. Pickup locations, delivery areas and fees remain undecided.

## Brand references

- Website/project name supplied: cardinalbakeshop
- Display name: Cardinal Bakeshop
- Tagline in supplied image: Baked with Pride
- Facebook supplied by owner: https://www.facebook.com/cebucardinalbakeshop
- Instagram supplied by owner: https://www.instagram.com/cardinalbakeshop/?hl=en
- Both social pages could not be read using web lookup; their posts and business details remain unverified.
- Source image preserved in `references/price-list.png`.
- Homepage photography sourced from Cebu247's Cardinal Bakeshop article, credited there to Cardinal Bakeshop's Facebook page; see `references/image-sources.md` for exact origins.

## Product source

`src/data/menu.json` transcribes 47 entries: 21 breads/pastries, 16 cakes, and 10 cookies/delicacies. The three Sable French Cookie flavors are separate entries. Flavor choices listed under cake names remain attached to their parent item.

Some bread/loaf entries have no explicit package quantity. These remain `unspecified` rather than being assigned an invented quantity. The heading for cakes is Whole, and cookies/delicacies is Per Jar. Source date and current availability are unknown.

## Visual starting point

Use the supplied logo's burgundy with white backgrounds, dark readable text, and an elegant serif heading paired with clear sans-serif body text. Show products and package prices prominently. Adapt layouts for mobile shopping.

The ui-ux-pro-max searches returned bakery color guidance and restaurant/ecommerce font matches, but their generic vibrant style and marketing funnel are not a verified match for this store. Brand styling and the shopping layout are therefore recommendations based on the supplied image and the skill's general defaults. Do not apply the unrelated funnel or gaming-like styling.

## Staged workflow

1. Project context, source menu, and development-tool checks — prepared.
2. Create a React project and run the first local preview.
3. Initialize version control and connect the owner's GitHub repository.
4. Create/select a Firebase project and configure hosting.
5. Build the branded page and categorized product catalog.
6. Add product variants, cart, and checkout interface.
7. Connect server-side order creation and a selected payment provider in test mode; verify prices on the server and confirm payment through verified provider events.
8. Add the owner's fulfillment rules and order confirmation flow.
9. Check mobile, keyboard access, error states, and order/payment scenarios.
10. Publish and enable production checkout once business settings and payment credentials are configured.

Use React with Vite for the current starter. React's current from-scratch documentation includes Vite; its development and output commands differ from the older tutorial. Explain each difference as it is encountered. Firebase Hosting alone does not implement checkout or payment processing.

## Environment checks

- Node.js: v24.18.0
- npm: 11.19.0
- Git: 2.53.0.windows.2
- VS Code: 1.140.0
- Firebase CLI: 15.25.0. Authenticated project listing confirmed `cardinalbakeshopcebu`. The owner encountered a Windows Node 24 exit assertion. An isolated Node 22 runtime completed `--version` and `projects:list` successfully. Use `scripts/firebase.cmd` during the hosting stage.
- Development dependencies are tracked in package.json and package-lock.json once installed. No account sign-in was performed.

## Business details needed before live checkout

- Confirm prices/currency and unspecified package quantities.
- Payment provider and supported payment methods.
- Pickup/delivery options, service area, fees, lead time, and availability.
- Customer contact details and order handling process.
- Real product photography and a standalone brand logo.
- Checkout policies and production account settings.

## References

- Tutorial: https://www.youtube.com/watch?v=-tnPCI5RdNA
- Current React starter guidance: https://react.dev/learn/build-a-react-app-from-scratch
- Firebase Hosting setup: https://firebase.google.com/docs/hosting/quickstart

The owner published the original starter. The homepage at `/` preserves Cardinal's burgundy palette and original logo. On 2026-10-04 the owner selected the supplied tabletop composite as the hero image and requested the centered cafe-style layout in `references/hero-cafe-layout-reference.png`. The exact selected image is preserved in `references/hero-table-owner-selected.png`; its generated origin and narrow authorization are recorded in references/image-sources.md and AGENTS.md. A full-width photograph, uniform dark scrim, a separate white header with the original logo and burgundy navigation, centered Cardinal Bakeshop heading and menu/pickup-delivery actions replace the old product selector. The remaining sections have four featured-product cards, a three-category GSAP accordion, a Facebook banner, pickup/delivery inquiry guidance and social contact links. The accordion represents Breads & pastries, Cakes, and Cookies & delicacies using actual Cardinal photos and category destinations. It has equally sized burgundy caption bands and consistent typography, with no individual product pricing or tilt/parallax. Desktop hover/focus expands photos; mobile stacks them in color without animated expansion. Earlier layout references remain preserved. The shop at `/menu` retains 47 entries, categories/search, package sizes, flavor selection and a browser-saved cart. Featured cards select their category and scroll to their product row; gallery links select all three categories. Normal page navigation preserves saved cart choices in the same browser. No review badge, invented metric, booking action, video or unconfirmed bakery-process claim is added.

A production build, six cart tests and offline route-render checks passed. Automated desktop/mobile screenshots and browser interaction checks were blocked by browser URL policy and remain unverified. Review the homepage, category links, cart persistence, keyboard focus and mobile layouts manually, then follow README's build and existing Firebase launcher deployment steps. The homepage and menu changes remain local; no deployment was performed in this stage. Orders and payments are not submitted yet. The owner has a merchant account but its provider name is still needed for the checkout stage.
