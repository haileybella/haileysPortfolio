# Hailey Muñiz — Personal site

A responsive portfolio built from Hailey’s approved Figma design: an interactive desktop-inspired home, project stories, research, and event postcards.

## Open the site on your Mac

Open this folder in VS Code, open **Terminal → New Terminal**, and run:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal (usually http://localhost:5173). Keep that terminal running while you use the site. **Control + C** stops it; open a second terminal if you want to type other commands.

## Edit your content

- `src/App.tsx`: home, about, research, contact, navigation, and events collection.
- `src/data.ts`: project/event order, social links, cover references, and story links.
- `src/content/*.json`: complete project and event stories imported from Figma. Text lives in `text`; images use `src`.
- `src/style.css`: shared colors, typography, spacing, and responsive layouts.
- `public/assets/`: optimized local images. Fonts are also bundled locally.

### Add the résumé PDF

Put `resume.pdf` in `public/`. In `src/App.tsx`, change the RESUME link from the temporary email request to `/resume.pdf`, and change its title to `Download my résumé`. You can also use your own hosted PDF URL.

### Check and publish

```sh
npm run build
npm test
```

The build pre-renders all 14 pages so the text is present for search engines and initial loading. Vercel serves the site from `dist/`. With GitHub integration connected, pushing to `main` updates the site automatically.

The carousel follows the Figma motion timeline; clicking a card pauses it for eight seconds. A manual pause button and reduced-motion support are included. All covers share the Mac screen ratio (524:283).

Built with React, TypeScript, Vite, and plain CSS. No API keys or database are needed.

Design source: https://www.figma.com/design/lONrkTOWbaaCu3x5g5MAeX

Personal photographs and project artwork remain the property of their respective owners.
