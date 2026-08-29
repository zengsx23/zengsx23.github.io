# Project instructions

## Communication

- Start every reply with `Zengshenxiang`.
- Explain the proposed approach and receive approval before writing code.
- Ask a clarifying question when a request is ambiguous.
- Do not add backward-compatibility or compatibility-layer code unless requested.

## Project environment

- This is the source repository for `https://zengsx23.github.io`.
- Use the Conda environment declared in `environment.yml` for all development commands.
- The environment name is `github-homepage` and provides Node.js 22.
- Create the environment with `conda env create -f environment.yml`.
- Update it with `conda env update -f environment.yml --prune`.
- Run commands without activating the environment using `conda run -n github-homepage <command>`.
- Use npm only for project-local JavaScript dependencies recorded in `package.json` and `package-lock.json`.
- Never install npm packages globally.

## Common commands

- Install JavaScript dependencies: `conda run -n github-homepage npm ci`
- Start development server: `conda run -n github-homepage npm run dev`
- Type-check source: `conda run -n github-homepage npm run check`
- Lint source: `conda run -n github-homepage npm run lint`
- Build production output: `conda run -n github-homepage npm run build`

## Architecture

- Framework: PRISM on Next.js, React, and TypeScript, configured for static export.
- Styling: Tailwind CSS with project-local Inter and Crimson Text font packages.
- Content: TOML and Markdown files in `content/`.
- Static production output: `out/`.
- Deployment target: GitHub Pages through GitHub Actions.
- Personal content belongs in `content/` rather than being duplicated across components.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
