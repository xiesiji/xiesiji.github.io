// Embedded by each build script: the delivered HTML stays fully offline-capable.
const printStyles = `
.print-book { display:none; }
@page { size:A4 landscape; margin:0; }
@media print {
  html, body { display:block !important; width:auto !important; min-width:0 !important; height:auto !important; min-height:0 !important; margin:0 !important; padding:0 !important; background:#fff !important; overflow:visible !important; }
  body > :not(.print-book) { display:none !important; }
  body > .print-book { display:block !important; margin:0; padding:0; width:297mm; color:#352a25; font-family:'Patrick Hand',Patrick,cursive; print-color-adjust:exact; -webkit-print-color-adjust:exact; }
  .print-book *, .print-book *::before, .print-book *::after { box-sizing:border-box; animation:none !important; transition:none !important; }
  .print-sheet { width:297mm; height:209mm; padding:10mm; margin:0; background:#fff; break-inside:avoid; break-after:page; page-break-inside:avoid; page-break-after:always; }
  .print-sheet:last-child { break-after:auto; page-break-after:auto; }
  .print-story { height:100%; display:grid; grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr); gap:6mm; align-items:center; }
  .print-copy { min-width:0; text-align:left; padding:0 2mm; }
  .print-title { font:400 28pt/1.2 'Patrick Hand',Patrick,cursive; margin:0; padding:0; color:#352a25; letter-spacing:normal; text-wrap:balance; }
  .print-title span { display:block; }
  .print-title span + span { margin-top:2mm; }
  .print-answer { margin:7mm 0 0; font:400 23pt/1.2 'Patrick Hand',Patrick,cursive; color:#ad3d28; }
  .print-feedback { margin:6mm 0 0; font:400 16pt/1.3 'Patrick Hand',Patrick,cursive; color:#236b60; text-align:inherit; }
  .print-caption { margin:6mm 0 0; font:400 16pt/1.3 'Patrick Hand',Patrick,cursive; color:#74675c; }
  .print-image { display:block; width:100%; height:auto; max-height:183mm; aspect-ratio:1; object-fit:contain; margin:0; padding:0; border:0; border-radius:0; }
  .print-sheet--top, .print-sheet--left { display:flex; flex-direction:column; justify-content:center; align-items:center; gap:3mm; }
  .print-visual { position:relative; flex:none; width:230.666mm; height:173mm; margin:0; padding:0; }
  .print-visual .print-image { width:100%; height:100%; max-height:none; aspect-ratio:4/3; }
  .print-visual .print-title { position:absolute; text-align:center; top:4%; left:4%; right:4%; font-size:27pt; line-height:1.1; }
  .print-visual .print-title span + span { margin-top:0; }
  .print-sheet--left .print-title { left:6%; right:auto; top:34%; width:32%; text-align:left; font-size:28pt; line-height:1.16; }
  .print-sheet--top > .print-feedback, .print-sheet--left > .print-feedback { margin:0; min-height:10mm; max-width:260mm; text-align:center; }
}
`;

function buildPrintBook(records, layout) {
  const root = document.createElement('section');
  root.className = 'print-book';
  root.setAttribute('aria-hidden', 'true');
  const paragraph = (className, text) => {
    const node = document.createElement('p');
    node.className = className;
    node.textContent = text;
    return node;
  };
  records.forEach(record => {
    const sheet = document.createElement('section');
    sheet.className = 'print-sheet print-sheet--' + layout;
    const title = document.createElement('h2');
    title.className = 'print-title';
    record.lines.forEach(line => {
      const span = document.createElement('span');
      span.textContent = line;
      title.append(span);
    });
    const image = document.createElement('img');
    image.className = 'print-image';
    image.src = record.image;
    image.alt = record.alt || '';
    image.loading = 'eager';
    if (layout === 'spread') {
      const story = document.createElement('div');
      story.className = 'print-story';
      const copy = document.createElement('div');
      copy.className = 'print-copy';
      copy.append(title);
      if (record.answer) copy.append(paragraph('print-answer', record.answer));
      else if (record.caption && !/tap|click/i.test(record.caption)) copy.append(paragraph('print-caption', record.caption));
      if (record.feedback) copy.append(paragraph('print-feedback', record.feedback));
      story.append(copy, image);
      sheet.append(story);
    } else {
      const visual = document.createElement('div');
      visual.className = 'print-visual';
      visual.append(image, title);
      sheet.append(visual);
      if (record.feedback) sheet.append(paragraph('print-feedback', record.feedback));
    }
    root.append(sheet);
  });
  document.body.append(root);
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      window.print();
    }
  });
  window.addEventListener('beforeprint', () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });
}

export function withPrintLayout(html, kind = 'spread') {
  if (html.includes('className = \'print-book\'')) throw new Error('Print layout already installed');
  html = html.replace('</head>', '<style id="print-book-styles">' + printStyles + '</style>\n</head>');
  let records;
  if (kind === 'top') {
    const feedback = ['', 'Crunch, crunch!', 'Let’s brush!', 'Let’s brush them!', 'Let’s care for our teeth!', 'Great brushing!', 'All sides. Well done!', 'Morning AND night!', 'Hooray for brushing!'];
    records = `STORY.map((page, i) => ({lines:page.text.split(String.fromCharCode(10)), image:IMAGES[page.id], alt:page.alt, feedback:${JSON.stringify(feedback)}[i]}))`;
  } else if (kind === 'left') {
    records = 'book.pages.map((page, i) => ({lines:page.lines, image:images[i], alt:page.alt, feedback:page.tap}))';
  } else {
    records = `pages.map((page, i) => ({...page, image:images[page.resultImage || page.id], alt:page.resultAlt || page.alt}))`;
    if (kind === 'bear') {
      records = `pages.map((page, i) => ({...page, image:images[i === 6 ? pages[5].id : page.id], alt:i === 6 ? 'Little Bear shows empty paws after putting the tissue inside the bin.' : page.alt}))`;
    }
  }
  const code = '\n' + buildPrintBook.toString() + '\nbuildPrintBook(' + records + ', ' + JSON.stringify(['spread','bear'].includes(kind) ? 'spread' : kind) + ');\n';
  if (kind === 'spread' || kind === 'bear') {
    const marker = '    show(0, true);';
    if (!html.includes(marker)) throw new Error('Missing reader initialization');
    html = html.replace(marker, marker + code);
  } else {
    const marker = html.lastIndexOf('</script>');
    if (marker < 0) throw new Error('Missing reader script');
    html = html.slice(0, marker) + code + html.slice(marker);
  }
  return html;
}
