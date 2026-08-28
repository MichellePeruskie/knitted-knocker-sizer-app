# Knitted Knockers Sizer

A small static web app that checks whether a recipient's requested Knitted Knockers cup size is appropriate for their full **US or UK bra size**.

The problem it addresses is that a cup letter does not represent one fixed physical size. A B cup on a large band can have a substantially larger cup diameter than a B cup on a smaller band. At the same time, a finished knitted or crocheted Knocker should not fill the bra all the way to the underwire edge.

## Sizing approach

The app uses the Knitted Knockers bra sizing chart as the source of truth for the relationship between bra size and cup diameter.

The requested cup letter remains the default recommendation. The app changes that recommendation only when the charted bra diameter differs from the standard finished Knocker diameter by **more than 1 inch**.

That threshold is intentionally conservative. A 1-inch total difference corresponds to roughly 1/2 inch of clearance on each side, allowing the finished Knocker to sit inside the bra rather than extending to the cup edge.

When an adjustment is needed, the app moves through the standard Knocker size ladder in 1/2-inch increments until the difference is back within the 1-inch fit range.

### Examples

- **38D (US)** remains **D**. The charted bra diameter and standard D Knocker are already within the fit range.
- **44D (US)** remains **D**, even though the charted bra diameter is larger than a standard D Knocker.
- **44B (US)** is adjusted to **C** because the chart lists 44B at 6 1/6 inches while a standard B Knocker is about 5 inches.
- **30B (US)** is adjusted downward to **A** because the charted bra diameter is more than 1 inch smaller than a standard B Knocker.

For adjusted sizes, the app explains why the recommendation changed and shows both the charted bra diameter and the standard diameter of the requested Knocker size. This is intended to help makers understand how band size affects physical cup size.

## Guardrails

- US and UK bra sizes are encoded directly from the Knitted Knockers chart.
- The app does not extrapolate bra sizes that are not on the chart.
- The app does not add knitted or crocheted rows.
- The app does not convert additional international sizing systems.
- UK cup labels that do not map directly to a standard Knitted Knockers pattern-size label are not guessed; the volunteer is directed to Knitted Knockers for guidance.

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
- `assets/app.js` contains the chart's US and UK bra-size rows and underwire-to-diameter values.
- Standard Knocker sizes are modeled in 1/2-inch increments.
- The adjustment threshold is `> 1.0` inch, not `>= 1.0` inch.
- No cup-offset formula, quarter-inch rounding, or `+ row` recommendation is used.

## Acknowledgements

This volunteer tool is based on Knitted Knockers sizing guidance. For patterns, current guidance, and sizes not covered safely by the tool, visit the Knitted Knockers website or contact the organization directly.
