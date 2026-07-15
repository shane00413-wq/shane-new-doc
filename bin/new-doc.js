#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";

const DOC_ROOT = "src/content/docs";
const IMG_ROOT = "public/img";

function clean(value) {
  return String(value ?? "").trim();
}

function yaml(value) {
  return clean(value)
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("\n", " ");
}

function checkFilename(filename) {
  const invalid = /[\\/:*?"<>|]/;
  if (invalid.test(filename) || filename.includes("..")) {
    throw new Error("文件名包含非法字符");
  }
}

function checkDirectory(directory) {
  const invalid = /[\\/:*?"<>|]/;
  if (invalid.test(directory) || directory.includes("..")) {
    throw new Error("目录包含非法字符");
  }
}

function checkPath(directory, filename) {
  const target = path.resolve(DOC_ROOT, directory, filename);
  const root = path.resolve(DOC_ROOT);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error("非法路径，不能离开 docs 目录");
  }
}

function checkOrder(order) {
  if (order && Number.isNaN(Number(order))) {
    throw new Error("排序(order)必须是数字");
  }
}

function createDoc({ directory, filename, title = "", description = "", order = "", useMdx = false }) {
  checkDirectory(directory);
  checkFilename(filename);
  checkOrder(order);

  title = title || filename.replace(/\.mdx?$/, "");

  if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
    console.log("ℹ️ 检测到已有扩展名，忽略 mdx 参数");
  } else {
    filename += useMdx ? ".mdx" : ".md";
  }

  checkPath(directory, filename);

  const dir = path.join(DOC_ROOT, directory);
  let filePath = path.join(dir, filename);

  // 同名 md/mdx 或同名文件自动追加编号，避免覆盖
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    let count = 2;
    do {
      filename = `${baseName}(${count})${ext}`;
      filePath = path.join(dir, filename);
      count++;
    } while (fs.existsSync(filePath));

    console.log(`ℹ️ 检测到已有同名文件，已自动改名为: ${filename}`);
  }

  fs.mkdirSync(dir, { recursive: true });

  let content = "---\n";
  content += `title: "${yaml(title)}"\n`;
  if (description) content += `description: "${yaml(description)}"\n`;
  if (order) content += `sidebar:\n  order: ${Number(order)}\n`;
  content += "---\n\n# " + title + "\n";

  fs.writeFileSync(filePath, content, "utf8");

  const imgDirName = filename.replace(/\.mdx?$/, "");
  const imgDir = path.join(IMG_ROOT, directory, imgDirName);
  fs.mkdirSync(imgDir, { recursive: true });

  console.log("\n✅ 创建成功:");
  console.log(filePath);
  console.log(`📁 配图文件夹: ${imgDir}`);
}

function parseSlashArgs(args) {
  const result = {};
  result.directory = args[0] || "";
  result.filename = args[1] || "";

  const parts = args.slice(2).flatMap(arg => arg.split("/").filter(Boolean));

  for (const item of parts) {
    const index = item.indexOf("=");
    if (index === -1) continue;
    const key = item.slice(0, index).trim().toLowerCase();
    const value = item.slice(index + 1).trim();
    const alias = {
      desc: "description",
      directory: "dir",
      order: "order",
      md: "mdx"
    };
    result[alias[key] || key] = value;
  }

  return result;
}

function commandMode(args) {
  const parsed = parseSlashArgs(args);

  if (!parsed.directory || !parsed.filename) {
    console.log(`
用法:

new-doc "目录" "文件名"/title=xxx/description=xxx/order=1/mdx=true

或者:

new-doc "目录" "文件名"\\
 title=xxx\\
 description=xxx\\
 order=1\\
 mdx=true

目录和文件名必须放前两个位置，其余参数可选。
`);
    process.exit(1);
  }

  try {
    createDoc({
      directory: parsed.directory,
      filename: parsed.filename,
      title: parsed.title || "",
      description: parsed.description || "",
      order: parsed.order || "",
      useMdx: String(parsed.mdx || "").toLowerCase() === "true",
    });
  } catch (error) {
    console.log("❌ " + error.message);
    process.exit(1);
  }
}

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = text => new Promise(resolve => rl.question(text, answer => resolve(clean(answer))));

  console.log("📄 Astro Starlight 新建文档\n");

  let directory = "";
  while (!directory) directory = await ask("目录: ");

  let filename = "";
  while (!filename) filename = await ask("文件名: ");

  try {
    checkFilename(filename);
  } catch (error) {
    console.log("❌ " + error.message);
    rl.close();
    return;
  }

  const title = await ask("标题(空格跳过): ");
  const description = await ask("描述(空格跳过): ");

  let order = "";
  while (true) {
    order = await ask("排序 order(空格跳过): ");
    if (!order || !Number.isNaN(Number(order))) break;
    console.log("❌ 排序必须是数字");
  }

  const mdxInput = await ask("是否启用 mdx? (y/N): ");
  rl.close();

  try {
    createDoc({ directory, filename, title, description, order, useMdx: /^y(es)?$/i.test(mdxInput) });
  } catch (error) {
    console.log("❌ " + error.message);
  }
}

const args = process.argv.slice(2);

if (args.length >= 2 && !args.includes("--dir") && !args.includes("--file")) {
  commandMode(args);
} else {
  interactiveMode();
}
