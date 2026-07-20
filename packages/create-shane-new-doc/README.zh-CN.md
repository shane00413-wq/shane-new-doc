# create-shane-new-doc

[English](./README.md) | **简体中文**

[`shane-new-doc`](https://www.npmjs.com/package/shane-new-doc) 的初始化器，用法和 `create-astro` 一样：

```bash
# npm
npm create shane-new-doc@latest

# pnpm
pnpm create shane-new-doc@latest
```

在你的 Astro Starlight 项目根目录（`package.json` 所在目录）执行。它会扫描冲突脚本、识别你的包管理器、安装 `shane-new-doc`，并一次性跑完初始化。

`shane-new-doc` 一个包里同时带有中英文提示。如果你的终端是交互式的、又没有提前传语言参数，这个初始化器只会问你一次「Select CLI language / 选择界面语言」。想跳过这个提问，提前加一个参数就行：

```bash
# npm（注意中间那个额外的 --）
npm create shane-new-doc@latest -- --lang=zh-cn

# pnpm
pnpm create shane-new-doc@latest --lang=zh-cn
```

装完之后 `pnpm new-doc` 就可以直接用了。

## 完整文档

这个初始化器每一步具体检测/做了什么，以及 `shane-new-doc` 本身的完整用法，都写在文档站里：

📖 **https://shane-docs.pages.dev/zh-cn/cli/install/** · **https://shane-docs.pages.dev/zh-cn/cli/internals/**

## License

MIT
