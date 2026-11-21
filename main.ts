import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "app", "data", "trophies.json"), "utf-8");
const data = JSON.parse(raw);
const list = Array.isArray(data) ? data : data.trophies || [];

const byGrade = {};
for (const t of list) byGrade[t.grade] = (byGrade[t.grade] || 0) + 1;
const missable = list.filter((t) => t.missable === true);

console.log("Leonida Platinum Atlas: " + list.length + " trofi GTA VI (PS5)");
console.log("Platinum: " + (byGrade.platinum || 0));
console.log("Gold: " + (byGrade.gold || 0));
console.log("Silver: " + (byGrade.silver || 0));
console.log("Bronze: " + (byGrade.bronze || 0));
console.log("Missable: " + missable.length);
console.log("Missable: " + missable.map((t) => t.name).join(", "));
