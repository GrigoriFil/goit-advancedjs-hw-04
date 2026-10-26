import{a as f,S as g,i as l}from"./assets/vendor-B4VkUtbg.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const h="49000091-3868361750e1c7c48df9380e6",y="https://pixabay.com/api/";function L(r){return f.get(y,{params:{key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(s=>s.data)}const c=document.querySelector(".gallery"),u=document.querySelector(".loader-container"),S=new g(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const s=r.map(({webformatURL:a,largeImageURL:i,tags:e,likes:t,views:o,comments:m,downloads:d})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img class="gallery-image" src="${a}" alt="${e}" />
        </a>
        <ul class="stats">
          <li class="stat-item">
            <p class="stat-title">Likes</p>
            <p class="stat-value">${t}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Views</p>
            <p class="stat-value">${o}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Comments</p>
            <p class="stat-value">${m}</p>
          </li>
          <li class="stat-item">
            <p class="stat-title">Downloads</p>
            <p class="stat-value">${d}</p>
          </li>
        </ul>
      </li>`).join("");c.insertAdjacentHTML("beforeend",s),S.refresh()}function v(){c.innerHTML=""}function q(){u.classList.remove("is-hidden")}function w(){u.classList.add("is-hidden")}const p=document.querySelector(".form"),n={position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB",progressBarColor:"#B51B1B",maxWidth:432};p.addEventListener("submit",A);function A(r){r.preventDefault();const s=r.currentTarget.elements["search-text"].value.trim();if(s===""){l.warning({message:"Please enter a search query!",position:"topRight"});return}v(),q(),L(s).then(a=>{if(a.hits.length===0){l.error({...n,message:"Sorry, there are no images matching your search query. Please, try again!"});return}b(a.hits)}).catch(()=>{l.error({...n,message:"Something went wrong. Please try again later."})}).finally(()=>{w(),p.reset()})}
//# sourceMappingURL=index.js.map
