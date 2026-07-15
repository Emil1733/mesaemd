const fs = require('fs'); 
const dirs = ['eastmark-pool-removal', 'las-sendas-pool-removal', 'red-mountain-ranch-pool-removal']; 
dirs.forEach(d => { 
  let p = `src/app/mesa/${d}/page.tsx`; 
  let c = fs.readFileSync(p, 'utf8'); 
  if(!c.includes('alternates:')) { 
    c = c.replace('};', `  alternates: { canonical: '/mesa/${d}' },\n};`); 
    fs.writeFileSync(p, c); 
  } 
});
