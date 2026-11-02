import {manualLibrary,manualGroups} from './manuals-config.js';
const text=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fileIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h9l5 5v13H5ZM14 3v6h5M8 13h8M8 17h6"/></svg>';
const openIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const size=n=>n>=1048576?(n/1048576).toLocaleString('sv-SE',{maximumFractionDigits:1})+' MB':Math.max(1,Math.round(n/1024))+' kB';
export function mountManualLibrary(root,brand){
 if(!root?.querySelector)return ()=>{};
 const notice=root.querySelector('.manual-library-status');const reload=root.querySelector('[data-manual-refresh]');
 if(!manualLibrary.enabled){notice.textContent='OneDrive-kopplingen är inte aktiverad ännu. Du kan tills vidare öppna de befintliga anvisningarna nedan.';return ()=>{};}
 let stopped=false,loading=false,updated=false;let controller;
 function safeLink(value){try{const u=new URL(value,location.origin);return u.origin===location.origin&&u.pathname.startsWith(manualLibrary.endpoint+'/')?u.pathname:null}catch{return null}}
 async function refresh(){
  if(stopped||loading)return;loading=true;controller=new AbortController();reload.disabled=true;root.setAttribute('aria-busy','true');
  notice.textContent=updated?'Uppdaterar dokumentlistorna…':'Hämtar dokument…';
  try{
   const response=await fetch(manualLibrary.endpoint+'/'+encodeURIComponent(brand.id),{signal:controller.signal,cache:'no-store'});
   if(!response.ok)throw Error('unavailable');const result=await response.json();if(stopped)return;
   if(result.status!=='success'||!Array.isArray(result.groups)||!manualGroups.every(g=>result.groups.some(x=>x.id===g.id&&Array.isArray(x.files))))throw Error('invalid');
   for(const group of manualGroups){
    const files=result.groups.find(x=>x.id===group.id).files;if(files.some(f=>typeof f.name!=='string'||!safeLink(f.url)))throw Error('invalid');const list=root.querySelector('[data-manual-group="'+group.id+'"]');
    list.innerHTML=files.length?files.map(file=>{const url=safeLink(file.url);if(!url)return '';const ext=String(file.name).split('.').pop().toUpperCase();return `<li><a class="manual-file" href="${text(url)}" target="_blank" rel="noopener"><span class="manual-file-icon">${fileIcon}</span><span class="manual-file-copy"><strong>${text(file.name)}</strong><small>${text(ext)}${Number.isFinite(file.size)?' · '+size(file.size):''}</small></span><span class="manual-file-open">Öppna ${openIcon}</span></a></li>`}).join(''):'<li class="manual-list-empty">Inga dokument i den här mappen.</li>';
   }
   updated=true;notice.textContent='Uppdaterad '+new Date().toLocaleTimeString('sv-SE',{hour:'2-digit',minute:'2-digit'})+'. Dokumentlistorna hämtas automatiskt från OneDrive.';
  }catch(e){if(e.name!=='AbortError')notice.textContent=updated?'Kunde inte uppdatera. Listorna nedan visar tidigare hämtade dokument. Försök igen.':'Dokumentlistorna kunde inte hämtas. Försök igen eller kontakta vår service.';}
  finally{loading=false;if(!stopped){reload.disabled=false;root.removeAttribute('aria-busy')}}
 }
 reload.hidden=false;reload.addEventListener('click',refresh);
 const visible=()=>{if(document.visibilityState==='visible')refresh()};document.addEventListener('visibilitychange',visible);
 const interval=setInterval(()=>{if(document.visibilityState==='visible')refresh()},60000);refresh();
 return ()=>{stopped=true;controller?.abort();clearInterval(interval);reload.removeEventListener('click',refresh);document.removeEventListener('visibilitychange',visible)};
}
