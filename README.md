# zengsx23.github.io

Source for [zengsx23.github.io](https://zengsx23.github.io), built with
[PRISM](https://github.com/xyjoey/PRISM), Next.js, TypeScript, and Tailwind CSS.
The site is exported as static files and deployed to GitHub Pages.

## Local development

All development dependencies are managed through the project Conda environment
and local npm packages. See [AGENTS.md](./AGENTS.md) for the complete conventions.

```bash
conda env create -f environment.yml
conda run -n github-homepage npm ci
conda run -n github-homepage npm run dev
```

## Verification and build

```bash
conda run -n github-homepage npm run check
conda run -n github-homepage npm run lint
conda run -n github-homepage npm run build
```

The production site is written to `out/`. Personal information and page content
are maintained in `content/`.
