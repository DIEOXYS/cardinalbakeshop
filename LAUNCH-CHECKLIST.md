# Cardinal Bakeshop launch checklist

Status: BLOCKED. No new hosting deployment is authorized while the requirements below remain unresolved.

## Required gates

- [ ] Custom domain: owner has not supplied a domain or registrar. Confirm ownership, connect it in Firebase Hosting, verify DNS and HTTPS, and review the intended page on that domain. The firebaseapp.com/web.app address does not satisfy this requirement.
- [x] Favicon source: public/favicon.svg exists and index.html declares it. It is a burgundy C mark. Confirm its appearance in a browser before release.
- [x] AI attribution badge source check: none found in current application source. Confirm there is no badge in the final rendered deployment.
- [ ] Privacy policy: requires confirmed business/legal identity, privacy contact, actual service providers, data purposes, retention and customer-rights process. The current site stores product IDs, variants and quantities in browser localStorage; order submission and payments are not implemented. No analytics scripts or customer detail forms were found in the current source.
- [ ] Terms and conditions: requires the owner's pickup/delivery, payment, cancellation, refund and order-acceptance policies. Do not substitute invented policies. Page must be linked in the footer and reflect the eventual checkout.
- [ ] Desktop/mobile and keyboard review: current automated browser access is restricted. Source rendering and a successful build are not a visual or interaction pass.
- Phone adaptation review: test the expandable navigation, hero/photo crops, stacked cards, normal-flow gallery captions, category/flavor/Add controls and fixed cart access at 320, 360, 390 and 430px, in landscape and with larger text. Confirm that the cart shortcut does not cover footer links or focused controls on devices with a home indicator.
- [ ] Checkout readiness before online transactions: payment provider, server-side pricing, order creation, verified payment events and fulfillment are still outstanding.

## Content review

- [ ] Styled menu assets: 30 AI-edited drafts use the owner's requested cream/stone/burgundy setting and are integrated locally into the menu and matching homepage previews. Their original references and edit prompts are retained in references/menu-images/styled. Check each food appearance against the original and confirm source-use authorization before publication. Ten thumbnail-only items need better originals; two candidates need identity or size confirmation; five products lack references. Those 17 entries remain text-only. Ube-only references are labeled and not used for other selected flavors. Nothing has been deployed.

- [ ] Complete current Cebu branch directory: the supplied Don Mariano Cui address and cardinalcoffea@gmail.com are added. Six publicly listed candidate locations and source dates are recorded in references/branch-locations.md. Owner confirmation of current operation, exact branch addresses and missing locations is pending. Do not publish a claim of all branches from the older five-location articles.

- Current imagery uses five real product/bakery photos plus the owner-selected generated tabletop hero, explicitly requested on 2026-10-04 as a narrow exception. Origins and the exact selection are recorded in references/image-sources.md. Confirm the bakery authorizes the selected source imagery before launch.
- Product amounts and pack sizes come from the owner-supplied menu. Current price validity and availability need owner confirmation.
- Application copy uses specific product, menu and contact language. Em-dash separators are removed without altering product variants.
- No gradients, invented reviews/metrics/customer counters, emoji icons, custom cursor effects or scroll-animation libraries were found in the current application source. Buttons use modest rectangular corners. The cart count reflects real saved cart quantities.
- The current hero uses the owner's selected tabletop image and centered cafe-style composition. Before publication, manually check menu/contact actions, white original-logo header and burgundy navigation at zoomed widths, keyboard focus, image crops, contrast, heading wrapping and desktop/tablet/mobile layout. The old hero thumbnail selector was removed. A local build and source rendering do not establish a visual pass.
- The adapted GSAP accordion gallery also needs live desktop hover/focus, arrow/Home/End key navigation, menu links, mobile stacking and reduced-motion review. No deployment is authorized by a passing local build.

## Information requested from the owner

1. Desired custom domain and whether it is already owned.
2. Business/legal name and privacy/contact email.
3. Existing pickup, delivery, cancellation and refund policies, or confirmation that they are not decided.
4. Merchant/payment-provider name before implementing checkout.

## References

- Custom domain setup: https://firebase.google.com/docs/hosting/custom-domain
- Privacy notice content: https://privacy.gov.ph/the-right-to-be-informed/

Update this checklist with evidence when requirements are met. Do not turn an unverified requirement into a checked item to permit deployment.

Product-image correction, 2026-10-05: Hokkaido Cupcake's rejected AI edit has been replaced locally with its unchanged source photograph. The active map uses 29 styled derivatives and one original photo. Source-use and remaining appearance reviews are still pending; no deployment occurred.

Latest Hokkaido update, 2026-10-05: the owner requested removal of its wrapper label and addition to the site. Version 3 retains the bakery illustrations without emblem or lettering and is integrated locally. The active map now uses 30 styled derivatives again. The original photo and prior rejected drafts remain preserved. The instruction authorizes this local asset change; custom domain, legal pages, source-use clearance and required manual reviews still block Firebase publication.
