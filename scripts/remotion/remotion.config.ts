import {Config} from '@remotion/cli/config';

// Chromium que já vem instalado no ambiente (Playwright). Pode ser trocado pela variável REMOTION_BROWSER.
Config.setBrowserExecutable(process.env.REMOTION_BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome');
Config.setChromeMode('chrome-for-testing');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(18);
Config.setX264Preset('veryfast');
Config.setOverwriteOutput(true);
