import{a as v,S as w,i as p}from"./assets/vendor-mdVVRe9K.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const b="46333898-2c3ef88233fdb340cf3d447ca",E="https://pixabay.com/api/",f=15;async function m(s,r){const i=new URLSearchParams({key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:r}),o=`${E}?${i}`,{data:{hits:e,totalHits:t},status:n}=await v.get(o);if(n!==200)throw a.classList.add("is-hidden"),new Error("Server is not responding properly");if(e.length===0)throw a.classList.add("is-hidden"),new Error("No photos found");return{hits:e,totalHits:t}}const u=document.querySelector(".gallery"),S=new w(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.7}),h=s=>{const r=s.map(({webformatURL:i,largeImageURL:o,tags:e,likes:t,views:n,comments:y,downloads:L})=>`<li class="gallery-item">
      <a href="${o}" class="gallery-link"><img src="${i}" alt="${e}" class="gallery-img"></a>
      <div class="info-wrapper">
        <p class="info-item">likes<span>${t}</span></p>
        <p class="info-item">views<span>${n}</span></p>
        <p class="info-item">comments<span>${y}</span></p>
        <p class="info-item">downloads<span>${L}</span></p>
      </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",r),S.refresh(),u.addEventListener("click",i=>i.preventDefault())},P=document.querySelector(".js-search-form"),c=document.querySelector(".js-btn-load-more"),a=document.querySelector(".loader-js");P.addEventListener("submit",$);c.addEventListener("click",q);let l=1,d=null,g=0;async function $(s){s.preventDefault(),u.innerHTML="",l=1;const r=s.currentTarget;if(d=r.elements.query.value,d!==""){c.classList.add("is-hidden"),a.classList.remove("is-hidden");try{const{hits:i,totalHits:o}=await m(d,l);g=Math.ceil(o/f),a.classList.add("is-hidden"),h(i),c.classList.remove("is-hidden")}catch(i){c.classList.add("is-hidden"),a.classList.add("is-hidden"),console.log(i),p.error({position:"topRight",message:i.message})}finally{r.reset()}}}async function q(){l+=1;try{c.classList.add("is-hidden"),a.classList.remove("is-hidden");const{hits:s}=await m(d,l);if(h(s),O(),l>=g){p.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}c.classList.remove("is-hidden")}catch(s){p.error({position:"topRight",message:s.message})}finally{a.classList.add("is-hidden")}}function O(){const r=u.lastElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
