import { buildDossier } from './vendor/makefun-frontend.ts';
import { writeFileSync } from 'node:fs';

const outDir = process.argv[2] || '.';
const dossier = buildDossier(outDir, { text_max_bytes: 163840 });
writeFileSync(outDir + '/dossier.json', dossier);
console.log('dossier written: ' + dossier.length + ' bytes');
