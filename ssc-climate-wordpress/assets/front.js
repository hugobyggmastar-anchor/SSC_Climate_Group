(()=>{
 if(location.hash.startsWith('#/')){const [original,query='']=location.hash.slice(1).split('?');let route=original.replace(/^\/produkt\//,'/produkter/').replace(/^\/kategori\//,'/produktkategorier/').replace(/^\/om-oss\/nyheter/,'/nyheter').replace(/^\/om-oss\/kontakt$/,'/kontakt');const target=window.SSCWPRoutes?.[route];if(target){location.replace(target+(query?'?'+query:''));return;}}

 document.getElementById('main')?.setAttribute('tabindex','-1');
 const header=document.getElementById('header');const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
 const update=()=>header?.classList.toggle('is-scrolled',window.scrollY>12);
 window.addEventListener('scroll',update,{passive:true});update();
 menu?.addEventListener('click',e=>{e.preventDefault();const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Stäng meny':'Öppna meny');nav?.classList.toggle('open',open)});
 document.addEventListener('click',e=>{const dropdown=document.querySelector('.company-menu[open]');if(dropdown&&!dropdown.contains(e.target))dropdown.open=false});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const dropdown=document.querySelector('.company-menu[open]');if(dropdown){dropdown.open=false;dropdown.querySelector('summary')?.focus()}if(nav?.classList.contains('open'))menu?.click()}});
 const skip=document.querySelector('a.skip');skip?.addEventListener('click',e=>{e.preventDefault();document.getElementById('main')?.focus()});
 const library=document.querySelector('.manual-library');if(library)Promise.all([import('./manuals-client.js'),import('./manuals-config.js')]).then(([client,config])=>{const brand=config.manualBrands.find(b=>b.id===library.dataset.manualBrand);if(brand)client.mountManualLibrary(library,brand)}).catch(()=>{});
 // Original motion is progressive enhancement; all content is visible before JavaScript.
 import('./page-motion.js').then(m=>m.mountPageMotion(document.getElementById('main'),location.pathname)).catch(()=>{});
})();
