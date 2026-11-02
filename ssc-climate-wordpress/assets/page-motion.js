// Gemensamt rörelsesystem: engångsentréer per sida, synligt innehåll som grundläge.
let introShown=false;
let keyboardInput=false;
const revealed=new Set();
document.addEventListener('keydown',()=>{keyboardInput=true;document.documentElement.dataset.inputMode='keyboard'},{capture:true});
document.addEventListener('pointerdown',()=>{keyboardInput=false;document.documentElement.dataset.inputMode='pointer'},{capture:true,passive:true});

export function mountPageMotion(root,route='/'){
 if(!root||keyboardInput||typeof Element.prototype.animate!=='function')return ()=>{};
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const style=getComputedStyle(root);
 const easing=style.getPropertyValue('--ease').trim();
 const duration=name=>Number.parseFloat(style.getPropertyValue(name));
 const animations=new Set();const pending=new Set();
 let observer=null,stopped=false;
 function play(element,delay=0,hero=false,imageOnly=false){
  if(stopped)return;
  element.style.removeProperty('opacity');pending.delete(element);
  const frames=reduced.matches||imageOnly?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}];
  const animation=element.animate(frames,{duration:reduced.matches?140:duration(hero?'--duration-hero':'--duration-reveal'),delay:reduced.matches?0:delay,easing,fill:'both'});
  animations.add(animation);
  animation.finished.then(()=>{animation.cancel();animations.delete(animation)},()=>{animations.delete(animation)});
 }
 function stop(){
  if(stopped)return;stopped=true;observer?.disconnect();
  pending.forEach(element=>element.style.removeProperty('opacity'));pending.clear();
  animations.forEach(animation=>animation.cancel());animations.clear();
  root.removeEventListener('focusin',showFocused);document.removeEventListener('keydown',stop,true);
  reduced.removeEventListener('change',stop);
 }
 function showFocused(e){if([...pending].some(element=>element.contains(e.target)))stop()}
 try{
  document.addEventListener('keydown',stop,{capture:true});root.addEventListener('focusin',showFocused);
  reduced.addEventListener('change',stop);
  const heroItems=root.querySelectorAll('.hero-content > h1,.hero-content > .hero-bottom');
  if(heroItems.length&&!introShown){heroItems.forEach((element,i)=>play(element,i*duration('--duration-stagger'),true));introShown=true;}
  if(reduced.matches||!('IntersectionObserver' in window))return stop;
  const candidates=[...root.querySelectorAll('.split > *,.customer-card,.customer-takeaways,.customer-story-hero,.customer-quote,.customer-highlights,.customer-company,.customer-collaboration,.need-card,.need-hero > *,.need-copy section,.solution-seo,.solution-proof,.panorama-content,.section-head,.category-card,.cta,.editorial-image,.service-card,.service-resource-heading,.service-brand-card,.service-resource-card,.about-copy > *,.person-card,.news-card,.reference-card,.company-feature > *,.career-application,.values,.contact-persons,.contact-notice,.detail-contact,.simple-products .product-img img')];
  const targets=candidates.filter(element=>!candidates.some(other=>other!==element&&other.contains(element)));
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;
    const element=entry.target;observer.unobserve(element);revealed.add(element.dataset.motionKey);
    const siblings=element.parentElement.matches('.category-grid,.split,.service-brand-grid,.service-support-grid')?[...element.parentElement.children]:[element];
    const delay=(siblings.indexOf(element)%3)*duration('--duration-stagger');
    // Produktlistans text och kort ligger stilla. Endast produktbilden tonas in.
    const imageOnly=element.matches('.simple-products .product-img img');play(element,delay,false,imageOnly);
   }
  },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  targets.forEach((element,i)=>{
   const key=route+':section-'+i;element.dataset.motionKey=key;
   if(revealed.has(key))return;
   const rect=element.getBoundingClientRect();
   // Innehåll som redan syns får aldrig döljas i efterhand.
   if(rect.top<window.innerHeight||element.contains(document.activeElement)){revealed.add(key);return;}
   pending.add(element);element.style.opacity='0';observer.observe(element);
  });
 }catch{stop()}
 return stop;
}
