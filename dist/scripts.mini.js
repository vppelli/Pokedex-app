let pokemonRepository=function(){let e=[];function t(){return e}function i(t){e.push(t)}function n(){$("#modal").modal("hide")}function a(e){return s(),fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){o(),e.imageUrl=t.sprites.other["official-artwork"].front_default,e.height=t.height,e.types=[],t.types.forEach(function(t){e.types.push(" "+t.type.name)}),e.ability=[],t.abilities.forEach(function(t){e.ability.push(" "+t.ability.name)}),e.weight=t.weight}).catch(function(e){console.error(e)})}function d(e){a(e).then(function(){var t;let i,a,d,l,s,o,r,c,p,m,h,u,L,f;t=e,(i=document.querySelector("#modal")).innerHTML="",(a=document.createElement("div")).classList.add("modal-dialog"),(d=document.createElement("div")).classList.add("modal-content"),(l=document.createElement("div")).classList.add("modal-header"),(s=document.createElement("h1")).classList.add("modal-title"),s.innerText=t.name,(o=document.createElement("button")).classList.add("btn"),o.innerText="X",o.addEventListener("click",n),(r=document.createElement("div")).classList.add("modal-body"),r.classList.add("bg-primary"),(c=document.createElement("div")).classList.add("mt-2"),c.classList.add("p-2"),c.classList.add("rounded-4"),c.classList.add("bg-secondary"),c.classList.add("text-white"),c.classList.add("text-center"),(p=document.createElement("p")).innerText="Weight: "+t.weight,(m=document.createElement("p")).innerText="Height: "+t.height,(h=document.createElement("p")).innerText="Types: "+t.types,(u=document.createElement("p")).innerText="Abilities: "+t.ability,(L=document.createElement("div")).classList.add("border"),L.classList.add("border-danger"),L.classList.add("rounded-4"),(f=document.createElement("img")).classList.add("img-thumbnail"),f.src=t.imageUrl,f.alt="Image of "+t.name,L.appendChild(f),r.appendChild(L),c.appendChild(m),c.appendChild(p),c.appendChild(h),c.appendChild(u),r.appendChild(c),l.appendChild(s),l.appendChild(o),d.appendChild(l),d.appendChild(r),a.appendChild(d),i.appendChild(a),$("#modal").modal("toggle")})}window.addEventListener("keydown",e=>{let t=document.querySelector("#modal");"Escape"===e.key&&t.classList.contains("show")&&n()});let l=document.querySelector("#modal");function s(){document.querySelector("#loading").classList.add("is-visible"),console.log("Loading")}function o(){document.querySelector("#loading").classList.remove("is-visible"),console.log("Done")}return l.addEventListener("click",e=>{e.target===l&&n()}),{getAll:t,add:i,addListItem:function e(t){let i=document.querySelector(".list-group"),n=document.createElement("li"),a=document.createElement("button");a.classList.add("list-group-item"),a.classList.add("rounded-4"),a.classList.add("m-1"),a.classList.add("btn"),a.classList.add("btn-danger"),a.classList.add("btn-block"),a.innerText=t.name,n.appendChild(a),i.appendChild(n),a.addEventListener("click",function(){d(t)})},loadList:function e(){return s(),fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){o(),e.results.forEach(function(e){i({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:a,showDetails:d}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});