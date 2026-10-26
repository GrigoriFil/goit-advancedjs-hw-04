import{a as q,S as M,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const A="49000091-3868361750e1c7c48df9380e6",F="https://pixabay.com/api/",p=15;async function f(t,s){return(await q.get(F,{params:{key:A,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:s}})).data}const g=document.querySelector(".gallery"),h=document.querySelector(".loader-container"),y=document.querySelector(".load-more-btn"),O=new M(".gallery a",{captionsData:"alt",captionDelay:250});function L(t){const s=t.map(({webformatURL:o,largeImageURL:l,tags:e,likes:r,views:i,comments:P,downloads:E})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${l}">
          <img class="gallery-image" src="${o}" alt="${e}" />
        </a>
        <ul class="stats">
          <li class="stat-item">
            <p class="stat-title">Likes</p>
            <p class="stat-value">${r}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Views</p>
            <p class="stat-value">${i}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Comments</p>
            <p class="stat-value">${P}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Downloads</p>
            <p class="stat-value">${E}</p>
          </li>
        </ul>
      </li>`).join("");g.insertAdjacentHTML("beforeend",s),O.refresh()}function x(){g.innerHTML=""}function w(){h.classList.remove("is-hidden")}function S(){h.classList.add("is-hidden")}function c(){y.classList.remove("is-hidden")}function B(){y.classList.add("is-hidden")}const b=document.querySelector(".form"),R=document.querySelector(".load-more-btn");let u="",a=1,d=0;const m={position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB",progressBarColor:"#B51B1B",maxWidth:432};b.addEventListener("submit",$);R.addEventListener("click",C);async function $(t){t.preventDefault();const s=t.currentTarget.elements["search-text"].value.trim();if(s===""){n.warning({position:"topRight",message:"Please enter a search query!"});return}u=s,a=1,x(),B(),w();try{const o=await f(u,a);if(o.hits.length===0){n.error({...m,message:"Sorry, there are no images matching your search query. Please, try again!"});return}d=Math.ceil(o.totalHits/p),L(o.hits),a<d?c():v()}catch{n.error({...m,message:"Something went wrong. Please try again later."})}finally{S(),b.reset()}}async function C(){a+=1,B(),w();try{const t=await f(u,a);L(t.hits),T(),a<d?c():v()}catch{a-=1,c(),n.error({...m,message:"Something went wrong. Please try again later."})}finally{S()}}function v(){n.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}function T(){const t=document.querySelector(".gallery-item");if(!t)return;const{height:s}=t.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
