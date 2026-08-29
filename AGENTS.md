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
- Build production output: `conda run -n github-homepage npm run build`
- Preview the production build: `conda run -n github-homepage npm run preview`

## Architecture

- Framework: Astro with TypeScript.
- Styling: project-owned CSS; avoid unnecessary UI libraries.
- Deployment target: GitHub Pages through GitHub Actions.
- Personal content belongs in a dedicated data module rather than being duplicated across components.

