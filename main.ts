import { cpSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUTPUT_DIR || process.argv[2] || "/output";
const caps = { text_max_bytes: 163840 };

mkdirSync(outDir, { recursive: true });

const appSrc = join(here, "app");
const shotsSrc = join(here, "screenshots");
cpSync(appSrc, join(outDir, "app"), { recursive: true });
if (existsSync(shotsSrc)) {
  cpSync(shotsSrc, join(outDir, "screenshots"), { recursive: true });
}

const dossier = await buildDossier(outDir, caps);
if (dossier instanceof Uint8Array) {
  writeFileSync(join(outDir, "dossier.json"), dossier);
  console.log("dossier written to " + join(outDir, "dossier.json") + " (" + dossier.byteLength + " bytes)");
} else {
  const text = typeof dossier === "string" ? dossier : JSON.stringify(dossier, null, 2);
  writeFileSync(join(outDir, "dossier.json"), text);
  console.log("dossier written to " + join(outDir, "dossier.json") + " (" + text.length + " bytes)");
}
