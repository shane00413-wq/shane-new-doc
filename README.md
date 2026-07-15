# shane-new-doc

为 Astro Starlight 文档站提供交互式新建文档工具。装包时会自动在你项目里生成 `scripts/new-doc.js`，之后用 `pnpm new-doc` 交互式建文档。

## 安装

**npm**
```bash
npm install -D shane-new-doc
```

**pnpm**
```bash
pnpm add -D shane-new-doc
pnpm approve-builds
```
> pnpm v9/v10 默认会拦截依赖包的安装脚本，跑一下 `pnpm approve-builds`，方向键选中 `shane-new-doc`、空格勾选、回车确认即可。想一劳永逸，可以在项目 `package.json` 里加：
> ```json
> "pnpm": { "onlyBuiltDependencies": ["shane-new-doc"] }
> ```

## 使用

```bash
# 交互式
pnpm new-doc

# 命令行传参
pnpm new-doc --dir HUAWEI --file xxx --title "标题" --description "描述" --order 1 --mdx
```

## 特性

- 只在项目里没有 `scripts/new-doc.js`（或没有识别到本包管理标记）时才生成/接管，重装依赖不会覆盖你的手动修改
- 能识别 `new-doc.js` / `new doc.js` / `new-docs.js` / `new docs.js` 这几种命名的已有脚本，直接接管覆盖，不会重复建文件
- 自动建好对应的配图文件夹

## License

MIT
