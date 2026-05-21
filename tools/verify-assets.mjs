import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const html = readFileSync("index.html", "utf8");
const config = readFileSync("gyms.config.ts", "utf8");
const badText = ["Luxury Wellness Club", "Refined surfaces", "Cinematic Dark Premium"];
for (const text of badText) {
  if (html.includes(text) || config.includes(text)) {
    console.error(`Forbidden generic copy found: ${text}`);
    process.exit(1);
  }
}
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
if (/class="logo-shell|data-logo|<img[^>]+logo\.png/.test(html)) {
  console.error("Logo image shell is not allowed when real logo is not available.");
  process.exit(1);
}
console.log(`Asset audit passed: ${new Set(matches).size} local image paths verified.`);
