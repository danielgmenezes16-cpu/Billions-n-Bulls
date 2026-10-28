// Gera vários quadros de uma composição com um único bundle.
// Uso: node stills.mjs <composição> <pasta de saída> <frame1,frame2,...> [escala]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const [comp, outDir, list, scale = '0.5'] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const composition = await selectComposition({serveUrl, id: comp, browserExecutable, chromeMode: 'chrome-for-testing'});
for (const f of list.split(',').map(Number)) {
	await renderStill({composition, serveUrl, frame: f, output: path.join(outDir, `f-${f}.png`), scale: Number(scale), browserExecutable, chromeMode: 'chrome-for-testing', imageFormat: 'png'});
	process.stdout.write(`${f} `);
}
console.log('\nok');
