# Knitted Knockers Sizer

A small static web app that converts a recipient's **US or UK bra size** into the **target finished diameter** listed on the Knitted Knockers bra sizing chart.

The problem it addresses is simple but important: a cup letter does not represent one fixed physical size. A B cup on a larger band can require a substantially larger finished knocker than a B cup on a smaller band. The tool lets a volunteer enter the recipient's full bra size and get the charted physical diameter directly.

## Source-of-truth approach

The app intentionally follows the Knitted Knockers bra sizing chart as a literal lookup table rather than attempting to improve on or extrapolate from it.

- US and UK sizes are encoded exactly by chart row.
- Each chart row maps to the published underwire diameter in inches and centimeters.
- The result is the **target finished diameter**.
- The app does **not** recommend extra knitted/crocheted rows.
- The app does **not** infer unlisted bra sizes.
- The app does **not** convert additional international sizing systems because those conversions are not part of this source chart.
- If a size is not present in the chart, the volunteer is directed to Knitted Knockers for sizing guidance.

This deliberately keeps the tool close to the organization's published guidance and avoids introducing additional sizing assumptions.

## Example

For a charted size, the volunteer-facing result is intentionally simple:

**Target finished diameter: 7 1/2″ (19.0 cm)**

## Live link

https://michelleperuskie.github.io/knitted-knocker-sizer-app/

## Folder structure

```text
knitted-knocker-sizer-app/
├─ index.html
├─ assets/
│  ├─ app.css
│  └─ app.js
└─ images/
   └─ logo-kk-stacked-MEDIUM.png
```

## How to run locally

Open `index.html` in a browser, or use a local static server such as VS Code Live Server.

## Publishing

The app is hosted with GitHub Pages from the `main` branch. Changes committed to `main` are redeployed automatically.

## Technical notes

- No frameworks; vanilla HTML, CSS, and JavaScript.
- `assets/app.js` contains the chart's US and UK bra-size rows and the corresponding underwire-to-diameter values.
- Lookup is deterministic: a charted bra size returns the diameter from its chart row.
- No sister-size formula, cup-offset calculation, quarter-inch rounding, or `+ row` recommendation is used.

## Acknowledgements

This volunteer tool is based on Knitted Knockers sizing guidance. For patterns, current guidance, and sizes not covered by the chart, visit the Knitted Knockers website or contact the organization directly.
