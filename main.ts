// Leonida Platinum Atlas, the hand-in program (Node 22, standard library only).
//
// What it does: it takes this repository's guide (the static files in app/)
// and its screenshots (screenshots/) and hands them to the grader by copying
// both into the output directory, then writing /output/dossier.json, the
// summary the judge reads, with the vendored make.fun library.
//
// The library lives at vendor/makefun-frontend.ts and must stay exactly as
// the kit ships it: the scorer runs its own copy of the same file and
// requires dossier.json to be byte for byte what that library writes.
//
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader, MAKEFUN_OUTPUT_DIR is unset and /output is used.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The repository root is the directory this file sits in.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
// The grader sets /output; local runs override it with MAKEFUN_OUTPUT_DIR.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Copy the guide and its screenshots into the output directory.
mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// Build the dossier from what was copied. The caps mirror the scorer's own
// gate so this program fails where the scorer would refuse the entry: at
// most 4 screenshots of 256 KiB each, at most 993 files and directories in
// app/ totalling 48 MiB, and the dossier text capped at 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// Say what was handed in, so the run log shows it worked.
console.log(`handed in: app/ + screenshots/ copied to ${outputDir}, dossier.json written (${dossier.length} bytes)`);
