# Website font sources

The site self-hosts Latin WOFF2 faces from the official Google Fonts service. Lora keeps the serif character of the existing site; DM Sans provides consistent body text and shopping controls. The original Cardinal logo uses the owner's image and is unaffected by these fonts.

| Local face | Source |
| --- | --- |
| `public/fonts/dm-sans.woff2` | https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2 |
| `public/fonts/lora.woff2` | https://fonts.gstatic.com/s/lora/v37/0QIvMX1D_JOuMwr7Iw.woff2 |
| `public/fonts/lora-italic.woff2` | https://fonts.gstatic.com/s/lora/v37/0QIhMX1D_JOuMw_LIftL.woff2 |

The SIL Open Font Licenses are included alongside the faces. Family sources and license files come from the [Lora](https://github.com/google/fonts/tree/main/ofl/lora) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans) directories in Google's official repository. No external font requests are made by the deployed page. `font-display: swap` and familiar serif/sans-serif fallbacks keep text available while fonts load.
