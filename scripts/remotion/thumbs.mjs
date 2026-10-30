// Renderiza várias Stills de uma vez. Uso: node thumbs.mjs <pasta> Thumb2A Thumb2B ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const [outDir, ...ids] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
for (const id of ids) {
	const composition = await selectComposition({serveUrl, id, browserExecutable, chromeMode: 'chrome-for-testing'});
	await renderStill({composition, serveUrl, output: path.join(outDir, `${id}.png`), browserExecutable, chromeMode: 'chrome-for-testing', imageFormat: 'png'});
	process.stdout.write(`${id} `);
}
console.log('\nok');
