import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const html = readFileSync("index.html", "utf8");
const matches = [...html.matchAll(/["'(](\/gyms\/[^"'()]+\.(?:png|jpg|jpeg|webp|ico))["')]/g)].map((m) => m[1]);
const missing = [];
for (const asset of new Set(matches)) {
  const publicPath = join("public", asset);
  const rootPath = asset.replace(/^\//, "");
  if (!existsSync(publicPath) && !existsSync(rootPath)) missing.push(asset);
}
if (missing.length) {
  console.error("Missing assets:\n" + missing.join("\n"));
  process.exit(1);
}
console.log(`Asset audit passed: ${new Set(matches).size} local image paths verified.`);
