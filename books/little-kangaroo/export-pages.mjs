import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=path.dirname(fileURLToPath(import.meta.url));
const base=process.argv[2]||'http://127.0.0.1:8765/books/little-kangaroo/';
function browser(...args){return execFileSync('agent-browser',['--session','roo-export',...args],{encoding:'utf8'}).trim()}
browser('open',base+'layout-preview.html');
browser('set','viewport','1600','1300');
browser('eval',`(async()=>{await document.fonts.ready;const s=document.createElement('style');s.textContent='body{padding:0;display:block;background:white}main{max-width:none}header,.hint,nav,footer,.sr{display:none}.page{width:1600px!important;max-width:none!important;border-radius:0;box-shadow:none;margin:0}.page:focus-visible{outline:none}';document.head.append(s);return true})()`);
for(let i=0;i<9;i++){
 browser('eval',`(async()=>{index=${i};render();await $('art').decode();await document.fonts.ready;return true})()`);
 browser('screenshot','#page',path.join(dir,'pages',String(i+1).padStart(2,'0')+'.jpg'),'--screenshot-format','jpeg','--screenshot-quality','92');
 console.log('Exported page '+(i+1));
}
browser('close');
