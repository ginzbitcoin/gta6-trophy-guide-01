import { buildDossier, canonicalJson } from "./vendor/makefun-frontend.ts";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here);
const stageDir = join(repoRoot, ".dossier-stage");
const outDir = "/output";

if (existsSync(stageDir)) rmSync(stageDir, { recursive: true, force: true });
mkdirSync(stageDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(stageDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(stageDir, "screenshots"), { recursive: true });

const dossier = await buildDossier(stageDir, { text_max_bytes: 163840 });
let text: string;
if (typeof dossier === "string") {
  text = dossier;
} else if (dossier instanceof Uint8Array) {
  text = new TextDecoder().decode(dossier);
} else {
  text = canonicalJson(dossier);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "dossier.json"), text);
console.log("dossier written:", text.length, "bytes to", join(outDir, "dossier.json"));
