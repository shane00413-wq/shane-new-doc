# shane-new-doc

**English** | [简体中文](./README.zh-CN.md)

Interactive "new document" CLI for Astro Starlight doc sites. Installing this package drops a `scripts/new-doc.js` into your project, which you then run to scaffold new docs — either interactively or with a single command.

One package, two languages: prompts, comments, and error messages can be in English or 简体中文, picked once at install time (or overridden anytime with a flag).

## Install

The recommended way is the `create` initializer, the same pattern as `npm create astro@latest`:

```bash
# npm
npm create shane-new-doc@latest

# pnpm
pnpm create shane-new-doc@latest
```

This installs `shane-new-doc` into your project and runs its setup automatically — no separate `postinstall` step needed. If your terminal is interactive and you didn't pass a language flag, it asks **once**:

```
Select CLI language / 选择界面语言: (Use arrow keys)
❯ English
  简体中文
```

To skip the prompt, pass a flag up front (`--lang=en` / `--lang=zh-cn`, or the shorthands `--en` / `--zh-cn`):

```bash
# npm (note the extra --)
npm create shane-new-doc@latest -- --lang=zh-cn

# pnpm
pnpm create shane-new-doc@latest --lang=zh-cn
```

<details>
<summary>Alternative: install the package directly</summary>

```bash
# npm
npm install -D shane-new-doc

# pnpm
pnpm add -D shane-new-doc
pnpm approve-builds
```

> pnpm v9/v10 blocks a new dependency's install scripts by default. Run `pnpm approve-builds`, use the arrow keys to select `shane-new-doc`, press space to check it, then enter to confirm. To skip this every time, add to your project's `package.json`:
> ```json
> "pnpm": { "onlyBuiltDependencies": ["shane-new-doc"] }
> ```

</details>

Once installed, `pnpm new-doc` is ready to use.

## Full documentation

Interactive & command mode, all arguments, language settings, and exactly what happens during install (every check it runs, every file it can touch) are all covered in the docs site:

📖 **https://shane-docs.pages.dev/en/cli/new-doc/** (简体中文: **https://shane-docs.pages.dev/zh-cn/cli/new-doc/**)

## License

MIT
