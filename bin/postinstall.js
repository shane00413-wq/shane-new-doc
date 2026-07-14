#!/usr/bin/env node
import fs from "fs";
import path from "path";
const pkg=path.join(process.cwd(),"package.json");
if(fs.existsSync(pkg)){
 const d=JSON.parse(fs.readFileSync(pkg,"utf8"));
 d.scripts ??= {};
 if(!d.scripts["new-doc"]) d.scripts["new-doc"]="new-doc";
 fs.writeFileSync(pkg,JSON.stringify(d,null,2)+"\n");
}
