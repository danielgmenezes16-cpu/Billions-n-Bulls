// Gera vários quadros de uma composição com um único bundle.
// Uso: node stills.mjs <composição> <pasta de saída> <frame1,frame2,...> [escala]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';

// Várias composições num bundle só: node stills.mjs Ep10:5792,12808+Ep06:9000 <pasta> [escala] (arquivos <Comp>-f-<frame>.png)
const args = process.argv.slice(2);
const multi = args[0].includes(':');
const [outDir, scale = '0.5'] = multi ? args.slice(1) : [args[1], args[3]];
const jobs = multi ? args[0].split('+').map((j) => j.split(':')) : [[args[0], args[2]]];
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
for (const [comp, list] of jobs) {
	const composition = await selectComposition({serveUrl, id: comp, browserExecutable, chromeMode: 'chrome-for-testing'});
	for (const f of list.split(',').map(Number)) {
		const name = multi ? `${comp}-f-${f}.png` : `f-${f}.png`;
		await renderStill({composition, serveUrl, frame: f, output: path.join(outDir, name), scale: Number(scale), browserExecutable, chromeMode: 'chrome-for-testing', imageFormat: 'png'});
		process.stdout.write(`${comp}:${f} `);
	}
}
await fs.rm(serveUrl, {recursive: true, force: true}); // não deixar cópias do public/ (~1,3 GB) no /tmp
console.log('\nok');
