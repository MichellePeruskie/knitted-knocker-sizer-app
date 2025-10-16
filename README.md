# Knitted Knockers Sizer

A tiny, static web app that converts a **bra size** (e.g. `38D`) plus **region** (US/UK/EU/AU/JP/CN/IN) into a **recommended knitted knocker size**.  
It uses the **underwire→diameter chart** as the single source of truth for diameter, applies **sister sizing**, and gives a simple volunteer-friendly output:

- **Diameter:** `5 1/2″ (14.0 cm)`
- **Knocker size to send:** `DD (E) + 1 row` *(rows max out at +1)*

> If the computed underwire falls outside the chart (30–60), the app asks the user to **contact Knitted Knockers HQ** and nudges them to double-check the Country/Region when it looks mismatched (for example, an EU band size entered while US is selected).

---

## Live link
https://michelleperuskie.github.io/knitted-knocker-sizer-app/


---

## Folder structure

knitted-knocker-sizer-app/
├─ index.html
├─ assets/
│ ├─ app.css
│ └─ app.js
└─ images/
└─ logo-kk-stacked-MEDIUM.png


- All paths in `index.html` are **relative** (`assets/...`, `images/...`) so it works anywhere (localhost, GitHub Pages).

---

## How to run locally

### Quick-open
- Double-click `index.html` (or right-click → “Open with” → your browser).

### Recommended (auto reload)
- Use the **Live Server** extension (VS Code).
  - Open the folder in VS Code → install “Live Server” → right-click `index.html` → **Open with Live Server**.

---

## Publish (GitHub Pages)

1. **Push your files** to this repo (see steps below).
2. In the repo: **Settings → Pages**  
   - **Source:** `Deploy from a branch`  
   - **Branch:** `main` — **Folder:** `/ (root)`  
   - Save.
3. Wait for the green “Pages build and deployment” check (Actions tab).
4. Visit your site at:

https://michelleperuskie.github.io/knitted-knocker-sizer-app/

(Hard refresh if you’re updating: `Ctrl+F5` / `Cmd+Shift+R`.)

---

## Updating the app

- Edit files locally → **commit** → **push** to `main`.  
- GitHub Pages will redeploy automatically.  
- Bust cache with a hard refresh if you don’t see changes right away.

---

## Tech notes

- **No frameworks**, just vanilla HTML/CSS/JS.
- **Chart values** (underwire → cm/in) are baked into `assets/app.js`.
- **Rounding**: diameters **display** as nearest 1/6″ (chart style). Recommendation **calculates** using **¼″ rounded up**, with **at most one extra row**.
- **DD/E** is displayed as `DD (E)` for US/UK/AU and `E (DD)` elsewhere.

---

## Acknowledgements

This volunteer tool is inspired by and aligned with **[Knitted Knockers](https://www.knittedknockers.org/)** guidance.  
If a recipient’s size falls outside the standard chart range, the tool directs volunteers to **[contact HQ](https://www.knittedknockers.org/contact-us/)**.

---

## License

MIT © Michelle Peruskie (or your preferred license)
