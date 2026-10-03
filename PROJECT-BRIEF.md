# Cardinal Bakeshop

## Project instructions

Build Cardinal Bakeshop's website with React, GitHub, and Firebase, following the linked tutorial in explained stages. The owner is learning on Windows with PowerShell and VS Code. Explain what each command does, where it runs, and the expected result. Verify installed tools and completed steps rather than assuming them.

Customers must be able to browse products, add products to a cart, place orders, and pay online. This is an online store, extending the video's landing-page example. Prepare checkout in test mode before enabling real transactions. Payment provider and fulfillment rules are not selected yet.

Use the supplied price-list image as the initial product source. Preserve product names, amounts, quantities, and flavor options. Do not invent product photos, descriptions, ingredients, allergens, availability, store addresses, hours, delivery fees, or policies. Display package quantities beside prices. Philippine pesos are a provisional currency assumption; the image does not show a currency symbol.

## Brand references

- Website/project name supplied: cardinalbakeshop
- Display name: Cardinal Bakeshop
- Tagline in supplied image: Baked with Pride
- Facebook supplied by owner: https://www.facebook.com/cebucardinalbakeshop
- Instagram supplied by owner: https://www.instagram.com/cardinalbakeshop/?hl=en
- Both social pages could not be read using web lookup; their posts and business details remain unverified.
- Source image preserved in `references/price-list.png`.

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
- Firebase CLI command exists. Version/account access was not verified because reading its local configuration failed in the execution environment. Recheck during the Firebase stage.
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

The folder now contains a React/Vite starter for the first local preview. The starter displays the brand name, tagline, menu introduction, and supplied social links. Product shopping and payment functionality have not been built or deployed yet.
