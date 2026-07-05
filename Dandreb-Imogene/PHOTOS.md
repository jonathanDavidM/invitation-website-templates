# Photo mapping — drop the real engagement photos here

Place the professional photos into `public/images/gallery/` using **exactly
these filenames**, then run `npm run images` to regenerate blur placeholders,
dimensions, and the Open Graph image.

| Filename | Which photo (from the engagement set) | Orientation |
| --- | --- | --- |
| `desert-dunes-hero.jpg` | Couple embracing on the dune at sunset, bronze gown flowing over the sand toward the camera (landscape). **Used as the hero background.** | Landscape |
| `desert-gown-billow.jpg` | Couple standing on the dunes, gown billowing dramatically in the foreground, sun low behind them | Portrait |
| `desert-sunset-gaze.jpg` | Face to face, almost touching, the sun glowing exactly between them | Portrait |
| `desert-groom-portrait.jpg` | Groom solo in black suit adjusting his watch, sunset halo behind | Portrait |
| `camel-road.jpg` | Holding hands on the asphalt road, camel caravan crossing around them | Landscape |
| `city-bride-portrait.jpg` | Bride solo in white blazer dress, looking over her shoulder, turquoise fountain lake + towers behind | Portrait |
| `city-back-to-back.jpg` | Back to back in tan suit + white blazer dress with bouquet, blue sky and Burj Khalifa | Portrait |
| `city-promenade.jpg` | Walking hand in hand on the palace promenade, looking at each other | Portrait |
| `tram-walk.jpg` | Walking hand in hand in front of the red vintage tram | Portrait |
| `tram-facing.jpg` | Facing each other holding hands in front of the red tram (landscape) | Landscape |
| `city-stroll.jpg` | Laughing, holding hands mid-stride, palm trees and towers behind (landscape) | Landscape |
| `city-hailing.jpg` | Playfully hailing a ride together under the round "40" road sign | Portrait |
| `city-sign-lean.jpg` | Leaning back to back on the tram-sign pole, skyscraper behind | Portrait |

Also drop venue photos into `public/images/venues/`:

| Filename | Photo |
| --- | --- |
| `church.jpg` | San Antonio de Padua Parish, Silang (any nice exterior/interior shot) |
| `reception.jpg` | Infinity Tagaytay Events Place |

Notes

- Until real photos are added, `npm run images` generates elegant gradient
  placeholders so the layout reads correctly.
- `public/images/og.jpg` (the social share image) is auto-generated from
  `desert-dunes-hero.jpg`. Delete it and re-run `npm run images` after
  replacing the hero to refresh it.
- Export photos at ~2000px on the long edge, sRGB, quality ~80 — Next.js
  handles the rest (AVIF/WebP, responsive sizes, lazy loading).
