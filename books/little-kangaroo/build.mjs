import { withPrintLayout } from '../print-layout.mjs';
import {readFile,writeFile,mkdir,unlink} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=path.dirname(fileURLToPath(import.meta.url));
const story=JSON.parse(await readFile(path.join(dir,'story.json'),'utf8'));
await mkdir(path.join(dir,'assets'),{recursive:true});
const images=[];
for(let i=1;i<=story.pages.length;i++){
 const id=String(i).padStart(2,'0');
 const asset=path.join(dir,'assets',id+'.webp');
 const padded=path.join(dir,'assets',id+'-working.png');
 // Preserve the approved composition and its white margins, then resize.
 execFileSync('sips',['--padToHeightWidth','1200','1600','--padColor','FFFFFF',path.join(dir,'originals',id+'.png'),'--out',padded],{stdio:'ignore'});
 execFileSync('sips',['--resampleHeightWidth','900','1200',padded],{stdio:'ignore'});
 execFileSync('cwebp',['-quiet','-q','78','-m','6','-metadata','none',padded,'-o',asset],{stdio:'ignore'});
 await unlink(padded);
 images.push('data:image/webp;base64,'+(await readFile(asset)).toString('base64'));
}
const font='data:font/ttf;base64,'+(await readFile(path.join(dir,'fonts','PatrickHand-Regular.ttf'))).toString('base64');
const license=await readFile(path.join(dir,'fonts','OFL.txt'),'utf8');
let html=(await readFile(path.join(dir,'book.template.html'),'utf8')).replace('__FONT__',()=>font).replace('__STORY__',()=>JSON.stringify(story)).replace('__IMAGES__',()=>JSON.stringify(images));
html=html.replace('</head>','<!-- Patrick Hand font: SIL Open Font License 1.1. Full license follows.\n'+license.replaceAll('--','—')+'\n--></head>');
await writeFile(path.join(dir,'Brush-Brush-Roo.html'),withPrintLayout(html, 'left'));
console.log('Built standalone book: HTML text over 9 text-free 1200×900 WebP illustrations.');
