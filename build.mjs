import {readFile,writeFile,mkdir} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});
const html=await readFile('index.html','utf8');
const server=await readFile('server.mjs','utf8');
await writeFile('dist/server/index.js',`const HTML=${JSON.stringify(html)};\n${server}`);
