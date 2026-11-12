import {readFile,writeFile,mkdir,access,unlink} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=path.dirname(fileURLToPath(import.meta.url));
const layout=process.argv.includes('--layout');
const story=JSON.parse(await readFile(path.join(dir,'story.json'),'utf8'));
await mkdir(path.join(dir,'pages'),{recursive:true});
const images=[];
for(let i=1;i<=story.pages.length;i++){
 const id=String(i).padStart(2,'0');
 const asset=path.join(dir,'assets',id+'.jpg');
 if(layout){
  const padded=path.join(dir,'assets',id+'.png');
  execFileSync('sips',['--padToHeightWidth','1200','1600','--padColor','FFFFFF',path.join(dir,'originals',id+'.png'),'--out',padded],{stdio:'ignore'});
  execFileSync('sips',['-s','format','jpeg','-s','formatOptions','85',padded,'--out',asset],{stdio:'ignore'});
  await unlink(padded);
 }
 const file=layout?asset:path.join(dir,'pages',id+'.jpg');
 await access(file);
 images.push('data:image/jpeg;base64,'+(await readFile(file)).toString('base64'));
}
const font='data:font/ttf;base64,'+(await readFile(path.join(dir,'fonts','PatrickHand-Regular.ttf'))).toString('base64');
const license=await readFile(path.join(dir,'fonts','OFL.txt'),'utf8');
let html=(await readFile(path.join(dir,'book.template.html'),'utf8')).replace('__FONT__',()=>font).replace('__STORY__',()=>JSON.stringify(story)).replace('__IMAGES__',()=>JSON.stringify(images));
if(!layout)html=html.replace('</style>','.copy{display:none}</style>');
html=html.replace('</head>','<!-- Patrick Hand font: SIL Open Font License 1.1. Full license follows.\n'+license.replaceAll('--','—')+'\n--></head>');
await writeFile(path.join(dir,layout?'layout-preview.html':'Brush-Brush-Roo.html'),html);
console.log('Built '+(layout?'editable layout preview':'standalone book with text embedded in all 9 images'));
