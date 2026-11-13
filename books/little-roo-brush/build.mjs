import { withPrintLayout } from '../print-layout.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=path.dirname(fileURLToPath(import.meta.url));
const story=JSON.parse(await readFile(path.join(dir,'story.json'),'utf8'));
const images={};
for(const page of story){
  const png=path.join(dir,'assets',page.id+'.png');
  const jpg=path.join(dir,'assets',page.id+'.jpg');
  execFileSync('/usr/bin/sips',['-s','format','jpeg','-s','formatOptions','85',png,'--out',jpg],{stdio:'ignore'});
  images[page.id]='data:image/jpeg;base64,'+(await readFile(jpg)).toString('base64');
}
const font='data:font/ttf;base64,'+(await readFile(path.join(dir,'fonts/PatrickHand-Regular.ttf'))).toString('base64');
const license=await readFile(path.join(dir,'fonts/OFL.txt'),'utf8');
let html=await readFile(path.join(dir,'book.template.html'),'utf8');
for(const [token,value] of Object.entries({__STORY_DATA__:JSON.stringify(story),__IMAGE_DATA__:JSON.stringify(images),__FONT_DATA__:font,__FONT_LICENSE__:license})) html=html.replace(token,()=>value);
await writeFile(path.join(dir,'Brush-Little-Roo.html'),withPrintLayout(html, 'top'));
console.log('Built 9 pages, embedded images and Patrick Hand font.');
