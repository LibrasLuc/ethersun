const intro=document.querySelector('.intro'),site=document.querySelector('.site'),sun=document.querySelector('.intro-sun'),target=document.querySelector('.brand-mark');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion)document.body.style.overflow='hidden';
const pause=ms=>new Promise(resolve=>{const start=performance.now();const tick=now=>now-start>=ms?resolve():requestAnimationFrame(tick);requestAnimationFrame(tick)});
const play=async()=>{
 intro.classList.add('is-starting');await pause(400);intro.classList.add('is-spark');await pause(350);intro.classList.add('is-energy');await pause(700);intro.classList.add('is-birth');await pause(700);intro.classList.add('is-formed');await pause(120);intro.classList.add('is-wave');site.classList.add('is-revealed');await pause(180);
 const from=sun.getBoundingClientRect(),to=target.getBoundingClientRect(),scale=to.width/from.width,x=to.left+to.width/2-(from.left+from.width/2),y=to.top+to.height/2-(from.top+from.height/2);
  await sun.animate([{transform:'translate(0,0) scale(.88) rotate(0deg)'},{transform:`translate(${x}px,${y}px) scale(${scale}) rotate(0deg)`}],{duration:650,easing:'cubic-bezier(.72,0,.2,1)',fill:'forwards'}).finished;
 target.classList.add('is-visible');site.classList.add('is-awake');intro.classList.add('is-flaring');await pause(260);intro.classList.add('is-done');document.body.style.overflow='';
};if(reduceMotion){
 intro.classList.add('reduced-entry');
 site.classList.add('is-revealed','is-awake');
 target.classList.add('is-visible');
 requestAnimationFrame(()=>requestAnimationFrame(()=>intro.classList.add('is-visible')));
 setTimeout(()=>{intro.classList.add('is-done');setTimeout(()=>intro.remove(),500)},900);
}else play();
const clients=[
 {name:'Benze',logo:'assets/logo benze.webp'},
 {name:'Math',logo:'assets/favicon, math.svg'}
];
const track=document.querySelector('#client-track');
for(let group=0;group<2;group++){
 const row=document.createElement('div');row.className='logo-group';if(group)row.setAttribute('aria-hidden','true');
 for(let repeat=0;repeat<3;repeat++)for(const client of clients){const logo=document.createElement('img');logo.src=client.logo;logo.alt=group?'':client.name;logo.loading='lazy';row.append(logo)}
 track.append(row);
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const navToggle=document.querySelector('.nav-toggle');
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));document.querySelector('.nav').classList.toggle('menu-open',open)});
const nav=document.querySelector('.nav');
let scrollFrame=0;
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
 const href=link.getAttribute('href');if(href==='#')return;
 const destination=document.querySelector(href);if(!destination)return;
 event.preventDefault();
 navToggle.setAttribute('aria-expanded','false');nav.classList.remove('menu-open');
 if(link.closest('.nav-actions')){nav.querySelectorAll('.nav-actions a').forEach(item=>item.classList.toggle('is-active',item===link))}
 const start=window.scrollY;
 const end=Math.max(0,destination.getBoundingClientRect().top+start-nav.offsetHeight-12);
 history.pushState(null,'',href);
 cancelAnimationFrame(scrollFrame);
 const distance=end-start;
 const duration=Math.min(1350,Math.max(950,Math.abs(distance)*.65));
 const began=performance.now();
 function scrollStep(now){
  const progress=Math.min(1,(now-began)/duration);
  const eased=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;
  window.scrollTo({top:start+distance*eased,behavior:'instant'});
  if(progress<1)scrollFrame=requestAnimationFrame(scrollStep);
 }
 scrollFrame=requestAnimationFrame(scrollStep);
}));
addEventListener('scroll',()=>nav.classList.toggle('is-scrolled',scrollY>20),{passive:true});
const contactConfig={whatsapp:'5537999291484',email:''};
if(contactConfig.email)document.querySelectorAll('a[href^="mailto:"]').forEach(link=>link.href=`mailto:${contactConfig.email}`);
if(contactConfig.whatsapp){const number=contactConfig.whatsapp.replace(/\D/g,'');document.querySelectorAll('.whatsapp-link').forEach(link=>{link.href=`https://wa.me/${number}?text=${encodeURIComponent('Olá! Gostaria de conversar sobre um projeto com a ETHERSUN.')}`;link.target='_blank';link.rel='noopener noreferrer'})}
else document.querySelectorAll('.whatsapp-link').forEach(link=>{link.removeAttribute('href');link.classList.add('is-unconfigured');link.setAttribute('aria-disabled','true');link.title='Número do WhatsApp ainda não configurado'});
document.querySelectorAll('[data-conversion]').forEach(link=>link.addEventListener('click',()=>{if(link.getAttribute('aria-disabled')==='true')return;window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'ethersun_conversion',action:link.dataset.conversion})}));
const projects=[];
const testimonials=[];
// Adicione somente projetos e depoimentos autorizados e reais.
if(projects.length){
 const section=document.querySelector('#portfolio');section.hidden=false;
 section.innerHTML='<div class="eyebrow">PORTFÓLIO</div><h2>Projetos reais.</h2><div class="portfolio-grid"></div>';
 for(const project of projects){const card=document.createElement('article');const image=document.createElement('img');image.src=project.image;image.alt=project.name;image.loading='lazy';const title=document.createElement('h3');title.textContent=project.name;const category=document.createElement('p');category.textContent=project.category;card.append(image,title,category);section.querySelector('.portfolio-grid').append(card)}
}
if(testimonials.length){
 const section=document.querySelector('#depoimentos');section.hidden=false;
 section.innerHTML='<div class="eyebrow">DEPOIMENTOS</div><h2>Quem trabalhou com a ETHERSUN.</h2><div class="testimonials-grid"></div>';
 for(const testimonial of testimonials){const quote=document.createElement('blockquote');quote.textContent=testimonial.quote;const cite=document.createElement('cite');cite.textContent=`${testimonial.name} — ${testimonial.role}`;quote.append(cite);section.querySelector('.testimonials-grid').append(quote)}
}
const scene=document.querySelector('.product-scene');
const showcaseItems=[
 {category:'SITES PROFISSIONAIS',title:'Sua empresa bem apresentada.',description:'Páginas rápidas, responsivas e feitas para transformar visitas em contatos.',mobileTitle:'Presença que gera contatos.',points:['Identidade clara','Experiência mobile','Contato acessível'],theme:'sites'},
 {category:'SISTEMAS PERSONALIZADOS',title:'Sua operação em um só lugar.',description:'Clientes, agenda e informações organizados em uma ferramenta feita para seu processo.',mobileTitle:'Tudo organizado.',points:['Clientes','Agenda','Relatórios'],theme:'sistemas'},
 {category:'TRÁFEGO PAGO',title:'Campanhas com direção.',description:'Estratégia, acompanhamento e ajustes para alcançar as pessoas certas.',mobileTitle:'Alcance as pessoas certas.',points:['Planejamento','Campanhas','Otimização'],theme:'trafego'}
];
scene.innerHTML=`<div class="hero-laptop showcase-device" role="button" tabindex="0" aria-label="Avançar apresentação no notebook"><div class="laptop-frame"><div class="showcase-browser"><span></span><span></span><span></span><small>ethersun / apresentação</small></div><div class="showcase-desktop"><div class="showcase-sidebar"><b>ETHERSUN</b><i></i><i></i><i></i></div><div class="showcase-desktop-slides"></div></div></div><div class="laptop-foot"></div></div><div class="hero-phone showcase-device" role="button" tabindex="0" aria-label="Avançar apresentação no celular"><div class="phone-notch"></div><div class="showcase-mobile-slides"></div></div><div class="showcase-controls"><button class="showcase-prev" type="button" aria-label="Tela anterior">‹</button><div class="showcase-dots" aria-label="Telas da apresentação"></div><button class="showcase-next" type="button" aria-label="Próxima tela">›</button></div>`;
const desktopSlides=scene.querySelector('.showcase-desktop-slides');
const mobileSlides=scene.querySelector('.showcase-mobile-slides');
const dots=scene.querySelector('.showcase-dots');
showcaseItems.forEach((item,index)=>{
 const desktop=document.createElement('div');
 desktop.className=`showcase-slide showcase-${item.theme}`;
 desktop.innerHTML=`<small class="showcase-kicker"></small><h3></h3><p></p><div class="showcase-points"></div><span class="showcase-mini-action">Conheça nossa solução <span aria-hidden="true">↗</span></span>`;
 desktop.querySelector('.showcase-kicker').textContent=item.category;
 desktop.querySelector('h3').textContent=item.title;
 desktop.querySelector('p').textContent=item.description;
 desktop.querySelector('.showcase-points').replaceChildren(...item.points.map(point=>{const tag=document.createElement('span');tag.textContent=point;return tag}));
 desktopSlides.append(desktop);
 const mobile=document.createElement('div');
 mobile.className=`showcase-slide showcase-${item.theme}`;
 mobile.innerHTML=`<small class="showcase-kicker"></small><h3></h3><div class="showcase-mobile-list"></div><span class="showcase-mobile-action">Explorar <span aria-hidden="true">↗</span></span>`;
 mobile.querySelector('.showcase-kicker').textContent=item.category;
 mobile.querySelector('h3').textContent=item.mobileTitle;
 mobile.querySelector('.showcase-mobile-list').replaceChildren(...item.points.map(point=>{const row=document.createElement('span');row.textContent=point;return row}));
 mobileSlides.append(mobile);
 const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Mostrar ${item.category.toLowerCase()}`);dot.addEventListener('click',()=>selectSlide(index));dots.append(dot);
});
let currentSlide=0;
let autoTimer;
let hoveredDevice=false;
const allSlides=[...scene.querySelectorAll('.showcase-slide')];
const dotButtons=[...dots.querySelectorAll('button')];
function showSlide(index){
 currentSlide=(index+showcaseItems.length)%showcaseItems.length;
 allSlides.forEach((slide,i)=>{const active=i%showcaseItems.length===currentSlide;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active))});
 dotButtons.forEach((dot,i)=>{dot.classList.toggle('is-active',i===currentSlide);dot.setAttribute('aria-pressed',String(i===currentSlide))});
}
showSlide(0);
function scheduleNext(){
 clearTimeout(autoTimer);
 if(hoveredDevice||document.hidden)return;
 autoTimer=setTimeout(()=>{showSlide(currentSlide+1);scheduleNext()},3000);
}
function selectSlide(index){showSlide(index);scheduleNext()}
scene.querySelector('.showcase-prev').addEventListener('click',()=>selectSlide(currentSlide-1));
scene.querySelector('.showcase-next').addEventListener('click',()=>selectSlide(currentSlide+1));
scene.querySelectorAll('.showcase-device').forEach(device=>{
 device.addEventListener('click',()=>selectSlide(currentSlide+1));
 device.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectSlide(currentSlide+1)}});
 device.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hoveredDevice=true;clearTimeout(autoTimer)}});
 device.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){hoveredDevice=false;scheduleNext()}});
});
document.addEventListener('visibilitychange',scheduleNext);
scheduleNext();
