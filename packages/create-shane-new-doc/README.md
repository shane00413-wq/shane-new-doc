# create-shane-new-doc

**English** | [简体中文](./README.zh-CN.md)

The initializer for [`shane-new-doc`](https://www.npmjs.com/package/shane-new-doc), invoked the same way `create-astro` is:

```bash
# npm
npm create shane-new-doc@latest

# pnpm
pnpm create shane-new-doc@latest
```

Run this in the root of your Astro Starlight project (where `package.json` lives). It scans for conflicting scripts, detects your package manager, installs `shane-new-doc`, and runs its setup — all in one step.

`shane-new-doc` ships both English and Chinese prompts in a single package. If your terminal is interactive and you don't pass a language flag, this initializer asks once — "Select CLI language / 选择界面语言". To skip the prompt, pass a flag up front:

```bash
# npm (note the extra --)
npm create shane-new-doc@latest -- --lang=zh-cn

# pnpm
pnpm create shane-new-doc@latest --lang=zh-cn
```

After it's done, `pnpm new-doc` is ready to use.

## Full documentation

Exactly what this initializer checks and does, step by step, plus everything about using `shane-new-doc` itself, is on the docs site:

📖 **https://shane-docs.pages.dev/en/cli/install/** · **https://shane-docs.pages.dev/en/cli/internals/**

## License

MIT
