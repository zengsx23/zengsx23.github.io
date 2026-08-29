# zengsx23.github.io

这是 [zengsx23.github.io](https://zengsx23.github.io) 的源代码，使用 Astro 构建并通过 GitHub Pages 部署。

## 本地开发

项目运行环境由 Conda 管理，完整约定参见 [AGENTS.md](./AGENTS.md)。

```bash
conda env create -f environment.yml
conda run -n github-homepage npm ci
conda run -n github-homepage npm run dev
```

执行生产构建：

```bash
conda run -n github-homepage npm run build
```

个人资料与链接统一维护在 `src/data/profile.ts` 中。
