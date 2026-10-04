# Cardinal Bakeshop owner requirements

These instructions apply to all work in this project and persist across sessions. They override older styling and deployment suggestions in project documents.

## Design and content

- Keep Cardinal's original branding, burgundy palette, real product photos and readable typography.
- Never use purple gradients, pill-shaped buttons, emoji icons, cursor animations or excessive scroll animations.
- Never fabricate reviews, testimonials, metrics, customer counters, popularity, availability or commercial claims.
- Never use AI-generated product photos or generic promotional filler. Use real, attributable photos of the actual bakery/products.
- Specific owner exception, 2026-10-04: edit the collected, identity-matched menu references into individual product images with a lightly designed background. The owner rejected plain white and requested a little design while showcasing the item. Keep these AI-edited derivatives separate from original photographs and record their source and prompt. This authorizes background/text/extra-object cleanup, not inventing missing products, unconfirmed variants or unseen food details. Owner appearance review remains required before publication.
- Specific owner exception, 2026-10-04: use the selected tabletop composite from attachment `codex-clipboard-a2de1758-853b-4094-bf56-9d4d706b99c7.png` as the homepage hero background. This explicit request authorizes that asset only. Keep its generated origin recorded in references/image-sources.md; do not describe it as an original product photograph or broaden permission to other generated images.
- Hero text must identify the products and the available action. Write specific, factual copy throughout.
- Do not use em dashes in interface text, metadata, alt text or newly written copy.
- Preserve source product names, prices, pack sizes and variants. Replace separator punctuation without changing meaning.
- Keep the actual cart count. The prohibition concerns fabricated customer/activity counters, not real cart state.
- Use rectangular buttons, consistent SVG icons, visible keyboard focus and restrained interaction feedback.

## Launch requirements

Do not publish or run any hosting deployment until all of these are complete:

1. The owner's custom domain is connected to this Firebase Hosting project and serves the intended website over HTTPS.
2. A working favicon is present.
3. No Made with AI tag or equivalent attribution badge appears on the site.
4. A completed privacy policy page is accessible and linked from the footer. It accurately reflects actual data processing and confirmed business/privacy contact details.
5. A completed terms and conditions page is accessible and linked from the footer. It uses the owner's actual policies.
6. The owner has reviewed the site at desktop/mobile widths, links and keyboard behavior. Online payments also need their own implementation and validation before activation.

Missing business policies, legal identity/contact details and domain details are blockers. Do not invent them or mark draft pages as approved. Record evidence and remaining work in LAUNCH-CHECKLIST.md. Existing Firebase deployments do not satisfy the new custom-domain requirement.

Verify claims and behavior. Do not promise a mistake-free result or claim verification that did not happen. Automated browser access is currently restricted; report that limit and preserve the manual visual review requirement.

## Project context

Use PROJECT-BRIEF.md, PRODUCT.md and DESIGN.md for the existing project. React/Vite development runs with npm.cmd run dev. Build with npm.cmd run build. Keep changes local while the launch requirements remain unresolved.
