// Mini-carrinho local: agrupa itens por empresa e gera pedido para WhatsApp.
const CART_KEY='arapongas_digital_cart_v1';
const finitePrice=v=>v!==null&&v!==''&&Number.isFinite(Number(v))&&Number(v)>=0;
const cleanText=(v,max=180)=>String(v??'').trim().slice(0,max);
function normalize(raw){if(!Array.isArray(raw))return[];return raw.slice(0,100).map(x=>{if(!x||typeof x!=='object')return null;const id=cleanText(x.id,80),businessId=cleanText(x.businessId,80),name=cleanText(x.name,180);if(!id||!businessId||!name)return null;const qty=Math.max(1,Math.min(99,Math.trunc(Number(x.qty)||1)));return{id,name,price:finitePrice(x.price)?Number(x.price):null,businessId,businessName:cleanText(x.businessName,180),businessSlug:cleanText(x.businessSlug,180),whatsapp:cleanText(x.whatsapp,40),qty}}).filter(Boolean)}
const read=()=>{try{return normalize(JSON.parse(localStorage.getItem(CART_KEY)||'[]'))}catch{return[]}};
const write=items=>{const safe=normalize(items);localStorage.setItem(CART_KEY,JSON.stringify(safe));window.dispatchEvent(new CustomEvent('ad:cart',{detail:safe}))};
function add(item){const normalized=normalize([{...item,qty:1}])[0];if(!normalized)return false;let items=read();const foreign=items.length&&items[0].businessId!==normalized.businessId;if(foreign&&!confirm('Seu carrinho tem itens de outra empresa. Limpar e adicionar este produto?'))return false;if(foreign)items=[];const found=items.find(x=>x.id===normalized.id);if(found)found.qty=Math.min(99,found.qty+1);else items.push(normalized);write(items);return true}
function remove(id){write(read().filter(x=>x.id!==String(id)))}
function setQty(id,qty){const items=read(),x=items.find(i=>i.id===String(id));if(!x)return;const q=Math.trunc(Number(qty));if(!Number.isFinite(q)||q<=0)return remove(id);x.qty=Math.min(99,q);write(items)}
function clear(){write([])}
function total(){return read().reduce((s,x)=>s+(finitePrice(x.price)?Number(x.price):0)*x.qty,0)}
function message(){const items=read();if(!items.length)return'';const fmt=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n),lines=['Olá! Montei este pedido no Arapongas Digital:',''];items.forEach(x=>lines.push(`• ${x.qty}x ${x.name}${finitePrice(x.price)?' — '+fmt(Number(x.price)*x.qty):' — consultar preço'}`));const known=items.every(x=>finitePrice(x.price));if(known)lines.push('',`Total de referência: ${fmt(total())}`);lines.push('','Pode confirmar disponibilidade e condições?');return lines.join('\n')}
window.ArapongasDigitalCart={read,add,remove,setQty,clear,total,message};
