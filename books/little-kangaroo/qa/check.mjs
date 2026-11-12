import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const dir=path.dirname(fileURLToPath(import.meta.url));
function b(...args){return execFileSync('agent-browser',['--session','roo-qa',...args],{encoding:'utf8'}).trim()}
function evaluate(s){return JSON.parse(b('eval',s))}
const url='http://127.0.0.1:8765/books/little-kangaroo/Brush-Brush-Roo.html';
b('open',url);
const report={viewports:[],interactions:{},offline:{}};
for(const [w,h] of [[2560,1080],[1512,837],[1440,900],[1280,800],[1024,768],[1000,1000],[768,1024],[390,844],[320,694],[844,390]]){
 b('set','viewport',String(w),String(h));
 const result=evaluate(`(async()=>{await document.fonts.ready;const results=[];for(let n=0;n<9;n++){index=n;render();await $('art').decode();const r=$('page').getBoundingClientRect();results.push({page:n+1,image:$('art').naturalWidth===1200&&$('art').naturalHeight===900,ratio:Math.abs(r.width/r.height-4/3)<.01,noHorizontalOverflow:document.documentElement.scrollWidth<=innerWidth,controlsFit:[...document.querySelectorAll('nav button')].filter(e=>getComputedStyle(e).display!=='none').every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44&&r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight}),htmlTextVisible:getComputedStyle($('copy')).display!=='none'&&[...$('copy').children].map(e=>e.textContent).join(' ')===book.pages[n].lines.join(' '),textFits:[...$('copy').children].every(e=>{const range=document.createRange();range.selectNodeContents(e);const b=range.getBoundingClientRect();return b.left>=r.left&&b.right<=r.left+r.width*.41&&b.bottom<=r.bottom})})}index=0;render();await $('art').decode();return{size:[innerWidth,innerHeight],font:document.fonts.check('20px Patrick'),results}})()`);
 report.viewports.push(result);
 if([[1512,837],[768,1024],[320,694],[844,390]].some(([a,c])=>a===w&&c===h)) b('screenshot',path.join(dir,`viewport-${w}x${h}.png`));
}
b('set','viewport','1512','837');
b('click','#next');
report.interactions.next=evaluate('index===1');
b('press','ArrowRight');report.interactions.keyboardNext=evaluate('index===2');
b('press','ArrowLeft');report.interactions.keyboardBack=evaluate('index===1');
b('click','#prev');report.interactions.back=evaluate('index===0');
b('click','#page');report.interactions.tap=evaluate("$('feedback').classList.contains('show')&&$('feedback').textContent===book.pages[0].tap&&index===0");
b('eval','index=7;render()');b('click','#next');report.interactions.lastPage=evaluate("index===8&&getComputedStyle($('restart')).display!=='none'");
b('click','#restart');report.interactions.restart=evaluate("index===0&&$('prev').disabled");
b('click','#read');report.interactions.readAloud=evaluate("!('speechSynthesis' in window)||typeof speechSynthesis.speak==='function'");
b('open','file://'+path.resolve(dir,'../Brush-Brush-Roo.html'));
report.offline=evaluate("(async()=>{await $('art').decode();await document.fonts.ready;return{image:$('art').naturalWidth===1200,font:document.fonts.check('20px Patrick'),pages:images.length,externalResources:performance.getEntriesByType('resource').filter(e=>/^https?:/.test(e.name)).length}})()");
report.passed=report.viewports.every(v=>v.font&&v.results.every(r=>r.image&&r.ratio&&r.noHorizontalOverflow&&r.controlsFit&&r.htmlTextVisible&&r.textFits))&&Object.values(report.interactions).every(Boolean)&&report.offline.image&&report.offline.font&&report.offline.externalResources===0;
writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:report.passed,viewports:report.viewports.map(v=>({size:v.size,passed:v.results.every(r=>r.image&&r.ratio&&r.noHorizontalOverflow&&r.controlsFit&&r.htmlTextVisible&&r.textFits),failures:v.results.filter(r=>!r.image||!r.ratio||!r.noHorizontalOverflow||!r.controlsFit||(!r.htmlTextVisible||!r.textFits))})),interactions:report.interactions,offline:report.offline},null,2));
b('close');
if(!report.passed)process.exitCode=1;
