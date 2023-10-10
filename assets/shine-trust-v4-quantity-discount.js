"use strict";!function(t){const e=setInterval((()=>{window.ST_GLOBALS&&(clearInterval(e),s().then((()=>console.info("ST Quantity Discount loaded"))))})),n={variants:[],availabilityMessage:(e,n="error")=>{const i="There’s not enough items in our stock, please select smaller bundle",a=e.querySelector(".st-quantity-discount-msg");if("error"===n){if(null===a){const n=t.createElement("div");n.classList.add("st-quantity-discount-msg"),n.classList.add("st-show"),n.innerText=i,e.appendChild(n)}else a.innerText=i,a.classList.add("st-show");e.classList.add("st-error")}else null!==a&&(e.classList.remove("st-error"),a.classList.remove("st-show"),a.innerText="")},calculatorSinglePrice:(t,e,n,i)=>{const a=parseFloat(t),o=parseInt(e);if("percent"===i){return{discountPrice:a*e-a*o*(parseFloat(n)/100),totalPrice:a*o}}if("amount"===i){return{discountPrice:a*o-parseFloat(n),totalPrice:a*o}}},calculatorPrice:(t,e,n)=>{const i=parseFloat(t);if("percent"===n){return i-i*(parseFloat(e)/100)}if("amount"===n){return i-parseFloat(e)}},calculatorVariant:(t,e)=>{const n={},i=t.querySelectorAll(".quantity-discount-item");for(let t=0;t<i.length;t++){const a=i[t].getAttribute("data-id"),o=i[t].querySelectorAll(".quantity-discount-item-variant-item");for(let t=0;t<o.length;t++){const i=o[t].querySelectorAll("select.st_quantity_discount_option"),s=[];for(let t=0;t<i.length;t++)s.push(i[t].value.toString().trim());const r=s.join("-");for(const t in e.variants){const i=e.variants[t];i.options.join("-")===r&&(n.hasOwnProperty(a)?(n[a].count+=1,n[a].totalPrice+=parseFloat(i.price),n[a].variants.hasOwnProperty(i.id)?n[a].variants[i.id].count+=1:n[a].variants[i.id]={count:1,inventory:parseInt(i.inventory_quantity),inventory_management:i.inventory_management,available:i.available}):n[a]={variants:{[i.id]:{count:1,inventory:parseInt(i.inventory_quantity),inventory_management:i.inventory_management,available:i.available}},count:1,totalPrice:parseFloat(i.price),hasSale:i.has_sale,inventory_management:i.inventory_management,inventory:parseInt(i.inventory_quantity),available:i.available})}}}return n},renderCartForm(e,n=!0,i){const a=this,o=t.querySelector(window.ST_GLOBALS.selectorForm),s=t.querySelectorAll('input[name="quantity"][type="number"],input[name="quantity"][type="text"]');if(null!==o){const r=o.querySelector("button.shopify-payment-button__button"),l=o.querySelector('input[name="id"]')||o.querySelector('select[name="id"]'),c=o.querySelectorAll('[name^="items"]');let u=o.querySelector('input[name="quantity"]');if(r&&(r.style.display=""),null===u){const e=t.createElement("INPUT");e.type="hidden",e.name="quantity",o.prepend(e),u=e}if(l.removeAttribute("disabled"),u.removeAttribute("disabled"),c.length)for(let t=0;t<c.length;t++)c[t].remove();if(a.variants=[],null!==e&&n){const{variants:n}=e;if(1===Object.keys(n).length){o.setAttribute("data-has-variant",0);for(const t in n){if(l.value=t,u.value=n[t].count,u.dispatchEvent(new Event("change",{bubbles:!0})),"hidden"===u.type.toLowerCase()&&u.remove(),s.length)for(let e=0;e<s.length;e++)s[e].value=parseInt(n[t].count),s[e].dispatchEvent(new Event("change",{bubbles:!0})),o.setAttribute("data-quantity",parseInt(n[t].count));a.variants.push({quantity:u.value,id:l.value.toString().trim()})}}else{l.setAttribute("disabled","disabled"),u.setAttribute("disabled","disabled"),r&&(r.style.display="none"),o.setAttribute("data-has-variant",1);let e=0;for(const i in n){const r=t.createElement("INPUT");r.type="hidden",r.name=`items[${e}][id]`,r.value=i,o.prepend(r);const l=t.createElement("INPUT");if(l.type="hidden",l.name=`items[${e}][quantity]`,l.value=n[i].count,"hidden"===u.type.toLowerCase()&&u.remove(),s.length)for(let t=0;t<s.length;t++)s[t].value=parseInt(n[i].count),s[t].dispatchEvent(new Event("change",{bubbles:!0})),o.setAttribute("data-quantity",parseInt(n[i].count));a.variants.push({quantity:n[i].count,id:i.toString().trim()}),o.prepend(l),e++}}}else{if(u.value=parseInt(i),u.dispatchEvent(new Event("change",{bubbles:!0})),"hidden"===u.type.toLowerCase()&&u.remove(),s.length)for(let t=0;t<s.length;t++)s[t].value=parseInt(i),s[t].dispatchEvent(new Event("change",{bubbles:!0})),o.setAttribute("data-quantity",parseInt(i));a.variants.push({quantity:parseInt(i),id:l.value.toString().trim()})}}}};class i{constructor(e,n){this.quantityDiscount=e,this.product=n,this.quantityDiscountEl=t.createElement("div"),this.quantityDiscountEl.classList.add("st-quantity-discount-block"),this.quantityDiscountEl.innerHTML=this.html(),this.events()}html(){const{quantityDiscountID:t,editorData:{heading:e,discountObjects:n,canChooseVariant:i}}=this.quantityDiscount;let a="";const{options:o,has_only_default_variant:s}=this.product;for(const t in o){a+=`\n                    <select class="st_quantity_discount_option" name="st_quantity_discount_options[${o[t].name}]">\n                `;for(let e in o[t].values){const n=o[t].values[e].replace('"',"&#x22;").replace("&#x22;","&#x27;");a+=`\n                        <option value="${n}">${n}</option>\n                    `}a+="\n                    </select>"}let r="";return n.length&&n.map(((t,e)=>{const n=parseInt(t.quantity);let o="";for(let t=1;t<=n;t++)o+=`\n                                <div class="quantity-discount-item-variant-item">\n                                    <div class="stt">#${t}</div>\n                                    ${a}\n                                </div>\n                            `;const l=window.ST_GLOBALS.translate(t.label),c=window.ST_GLOBALS.translate(t.title),u=window.ST_GLOBALS.translate(t.total);let d=window.ST_GLOBALS.translate(t.save);d="percent"===t.discountType?d.replace("{{DISCOUNT}}",`${t.discount}%`):d.replace("{{DISCOUNT}}",window.ST_GLOBALS.formatMoney(t.discount)),r+=`<div class="quantity-discount-item ${t.default?"active":""}" \n                            data-id="${t.itemID}"\n                            data-quantity="${t.quantity.toString().trim()}" \n                            data-discount="${t.discount.toString().trim()}"\n                            data-discount-type="${t.discountType}"\n                            >\n                            <div class="quantity-discount-item-heading">\n                                <div class="quantity-discount-item-label">\n                                     <span class="quantity-discount-input"></span>\n                                     ${""!==l?'<span class="quantity-discount-label">'+l+"</span>":""}\n                                     ${""!==c?'<span class="quantity-discount-title">'+c+"</span>":""}\n                                </div>\n                                <div class="quantity-discount-item-price">\n                                    ${""!==d?'<span class="quantity-discount-label-sale">'+d+"</span>":""}\n                                    <div class="quantity-discount-total-price">\n                                        ${""!==u?'<span class="quantity-discount-total-label">'+u+"</span>":""}\n                                        <span class="main-price"></span>\n                                        <span class="discount-price"></span>\n                                    </div>\n                                        \n                                </div>\n                            </div>\n                            <div class="quantity-discount-item-variant ${s?"one-variant":""} ${i?"can-choose-variant":""}">${o}</div>\n                        </div>`})),`\n                <div id="st-quantity-discount-${t}" class="quantity-discount-wrapper">\n                    <h2 class="quantity-discount-heading">${window.ST_GLOBALS.translate(e)}</h2>\n                    <div class="quantity-discount-items">${r}</div>\n                </div>\n            `}events(){const e=this,{has_only_default_variant:i,variant:a}=e.product,{editorData:{canChooseVariant:o}}=e.quantityDiscount,s=n.calculatorVariant(e.quantityDiscountEl,e.product),r=e.quantityDiscountEl.querySelectorAll(".quantity-discount-item");for(let t=0;t<r.length;t++){const l=r[t].getAttribute("data-id"),c=r[t].querySelector(".quantity-discount-item-label");if(c.addEventListener("click",(function(t){for(let t=0;t<r.length;t++)r[t].classList.remove("active");c.closest(".quantity-discount-item").classList.add("active");const a=c.closest(".quantity-discount-item"),s=a.getAttribute("data-id"),l=a.getAttribute("data-quantity")||1;if(i||!o)n.renderCartForm(null,o,l);else{const t=n.calculatorVariant(e.quantityDiscountEl,e.product);if(t.hasOwnProperty(s)){const i=t[s].variants;for(const t in i)(""===i[t].inventory_management&&!i[t].available||""!==i[t].inventory_management&&i[t].available&&i[t].inventory>0&&i[t].count>i[t].inventory)&&n.availabilityMessage(e.quantityDiscountEl,"error");n.renderCartForm(t[s],o,l)}}})),i){const e=r[t].getAttribute("data-quantity"),i=r[t].getAttribute("data-discount"),o=r[t].getAttribute("data-discount-type"),s=window.ST_GLOBALS.fixPrice(a.price),l=n.calculatorSinglePrice(s,e,i,o);r[t].querySelector(".discount-price").innerHTML=window.ST_GLOBALS.formatMoney(l.discountPrice),r[t].querySelector(".main-price").innerHTML=window.ST_GLOBALS.formatMoney(l.totalPrice)}else if(s.hasOwnProperty(l)){const e=r[t].getAttribute("data-discount"),i=r[t].getAttribute("data-discount-type"),a=window.ST_GLOBALS.fixPrice(s[l].totalPrice),o=n.calculatorPrice(a,e,i);r[t].querySelector(".discount-price").innerHTML=window.ST_GLOBALS.formatMoney(o),r[t].querySelector(".main-price").innerHTML=window.ST_GLOBALS.formatMoney(s[l].totalPrice)}const u=r[t].querySelectorAll("select.st_quantity_discount_option");if(u.length)for(let t=0;t<u.length;t++)u[t].addEventListener("change",(function(t){n.availabilityMessage(e.quantityDiscountEl,"success");const a=n.calculatorVariant(e.quantityDiscountEl,e.product),s=t.target.closest(".quantity-discount-item"),r=s.getAttribute("data-discount"),c=s.getAttribute("data-discount-type"),u=window.ST_GLOBALS.fixPrice(a[l].totalPrice),d=n.calculatorPrice(u,r,c);s.querySelector(".discount-price").innerHTML=window.ST_GLOBALS.formatMoney(d),s.querySelector(".main-price").innerHTML=window.ST_GLOBALS.formatMoney(a[l].totalPrice);const y=s.getAttribute("data-id"),p=s.getAttribute("data-quantity")||1;if(i||!o)n.renderCartForm(null,o,p);else if(a.hasOwnProperty(y)){const t=a[y].variants;for(const i in t)(""===t[i].inventory_management&&!t[i].available||""!==t[i].inventory_management&&t[i].available&&t[i].inventory>0&&t[i].count>t[i].inventory)&&n.availabilityMessage(e.quantityDiscountEl,"error");n.renderCartForm(a[y],o,p)}}))}setTimeout((()=>{const a=e.quantityDiscountEl.querySelector(".quantity-discount-item.active");if(n.availabilityMessage(e.quantityDiscountEl,"success"),a){const t=a.getAttribute("data-id"),r=a.getAttribute("data-quantity")||1;if(i||!o)n.renderCartForm(null,o,r);else if(s.hasOwnProperty(t)){const i=s[t].variants;for(const t in i)(""===i[t].inventory_management&&!i[t].available||""!==i[t].inventory_management&&i[t].available&&i[t].inventory>0&&i[t].count>i[t].inventory)&&n.availabilityMessage(e.quantityDiscountEl,"error");n.renderCartForm(s[t],o,r)}}let r=t.URL,l=null;const c=new URL(r);l=c.searchParams.get("variant")||null,l&&e.changeVariantEvent(l),t.addEventListener("change",(function(n){const i=t.URL,a=new URL(i);l=a.searchParams.get("variant")||null,l&&r!==i&&(r=i,e.changeVariantEvent(l))}))}),500)}changeVariantEvent(t){t=parseInt(t);const e=this,n=e.quantityDiscountEl.querySelectorAll(".quantity-discount-item");for(let i=0;i<n.length;i++){const a=n[i].querySelectorAll(".quantity-discount-item-variant-item");for(const n in e.product.variants){const i=e.product.variants[n];if(i.id===t){const{options:t}=i;for(let e=0;e<a.length;e++){const n=a[e].querySelectorAll("select");for(let e=0;e<n.length;e++)n[e].value=t[e],n[e].dispatchEvent(new Event("change"))}}}}}render(){return{quantityDiscountData:this.quantityDiscount,quantityDiscountEl:this.quantityDiscountEl}}}let a=null;const o={},s=async function(){if(!window.ST_PLAN||"Advanced"!==window.ST_PLAN?.name||"ACTIVE"!==window.ST_PLAN?.status)return;if(a=window.ST_GLOBALS.getBaseCDN(),"product"!==window.ST_GLOBALS.pageType)return;const e=window.ST_QUANTITY_DISCOUNTS||[];if(0===e.length)return;const s={};let l="";if(e.map(((t,e)=>{const{id:n,status:a,cssRender:r,editorData:c,productFilters:u,selectedProducts:d}=t;if(a){const{fontFamily:e,headingFontWeight:a,titleFontWeight:y,priceFontWeight:p,variantFontWeight:v}=c;l+=r,e?.fontFamily&&(s.hasOwnProperty(e.fontFamily)?s[e.fontFamily]={...s[e.fontFamily],headingFontWeight:a,titleFontWeight:y,priceFontWeight:p,variantFontWeight:v}:s[e.fontFamily]={headingFontWeight:a,titleFontWeight:y,priceFontWeight:p,variantFontWeight:v});const m=window.ST_GLOBALS.convertFilters(u,d),h=window.ST_GLOBALS.product||null;if(h){let{published_at:e,on_sale:a,inventory:s,collections:r,tags:l,title:c,id:u,available:d,price_min:y,price_max:p,vendor:v,type:S}=h;y=window.ST_GLOBALS.fixPrice(y),p=window.ST_GLOBALS.fixPrice(p);let g=!1;if(!m?.type&&m.select_all&&0===Object.keys(m.filters).length&&null===m.collection)g=!0;else if(m.select_all&&m.collection&&r.includes(m.collection))g=!0;else if(!m.select_all&&m.products.size)m.products.has(u)&&(g=!0);else if(m.select_all&&Object.keys(m.filters).length){let t=0,e=Object.keys(m.filters).length;for(const e in m.filters)"_s"===e&&c.includes(m.filters[e])&&(t+=1),"price"===e&&!isNaN(y)&&!isNaN(p)&&y>=m.filters[e].min&&p<=m.filters[e].max&&(t+=1),"tag"===e&&l.includes(`${m.filters.tag}`)&&(t+=1),"vendor"===e&&v===m.filters.vendor&&(t+=1),"type"===e&&S===m.filters.type&&(t+=1),"inventory"===e&&("instock"===m.filters.inventory.type&&d&&(t+=1),"outstock"!==m.filters.inventory.type||d||(t+=1),"less-than"===m.filters.inventory.type&&d&&!isNaN(s)&&s<=m.filters.inventory.lte&&(t+=1),"great-than"===m.filters.inventory.type&&d&&!isNaN(s)&&s>=m.filters.inventory.gte&&(t+=1));t===e&&(g=!0)}else if(m.type)if("new-arrival"===m.type){const t=window.ST_GLOBALS.dateWithTimeZone(e,window.ST_META_DATA.timeZone),n=window.ST_GLOBALS.dateWithTimeZone(m.date,window.ST_META_DATA.timeZone);t.getTime()>=n.getTime()&&(g=!0)}else"on-sale"===m.type&&a||"low-stock"===m.type&&s>0&&s<=m.quantity?g=!0:"out-stock"!==m.type||d||(g=!0);g&&(o[n]=new i(t,window.ST_GLOBALS.product).render())}}})),Object.keys(s).length){const t=Object.keys(s).map((t=>({fontFamily:t,fontWeight:[...new Set([parseInt(s[t].headingFontWeight),parseInt(s[t].titleFontWeight),parseInt(s[t].priceFontWeight),parseInt(s[t].variantFontWeight)])].filter((t=>!isNaN(t)&&t>0)).sort((function(t,e){return t-e})).join(";")})));t.length&&t.map((t=>{window.ST_LOADED_FONTS.includes(t.fontFamily)||window.ST_GLOBALS.loadFont(t)}))}l&&window.ST_GLOBALS.addStyle(l);for(const e in o){const{quantityDiscountEl:i,quantityDiscountData:a={}}=o[e],{id:s,quantityDiscountID:l=""}=a,c=t.querySelector('input[type="text"][name="quantity"]:not(.st-sticky-cart-input), input[type="number"][name="quantity"]:not(.st-sticky-cart-input)');if(c){let e=c.parentNode;const n=c.closest(".product-form__quantity");n?(e=n,n.style.display="none"):e?e.style.display="none":c.style.display="none";const a=e.parentNode,o=e.nextSibling,s=t.createDocumentFragment().appendChild(i);o?a.insertBefore(s,o):a.appendChild(s),a.classList.add(`st-quantity-${l}`)}else{const e=t.querySelector(window.ST_GLOBALS.selectorForm);if(e){let n=e;const a=n.parentNode,o=t.createDocumentFragment().appendChild(i);a.insertBefore(o,n)}}r(s);const u=t.querySelector(window.ST_GLOBALS.selectorForm);if(u){const t=u.querySelector('[type="submit"]');t&&t.addEventListener("click",(function(){fetch(window.ST_GLOBALS.apiUrl+"statistic",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({shop:window.ST_GLOBALS.shopDomain,serviceItemID:s,serviceType:"quantity-discount",variants:n.variants})}).then((t=>t.json())).then((async({data:t})=>{})).catch((t=>console.log(t)))}))}}},r=function(t){fetch(window.ST_GLOBALS.apiUrl+"total-views",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({shop:window.ST_GLOBALS.shopDomain,serviceItemID:t,serviceType:"quantity-discount"})}).then((t=>t.json())).then((async()=>{})).catch((t=>console.log(t)))}}(window.document);