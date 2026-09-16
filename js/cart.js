// Mini-carrinho local: agrupa itens por empresa e gera pedido para WhatsApp.
const CART_KEY='arapongas_digital_cart_v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{return[]}};
const write=items=>{localStorage.setItem(CART_KEY,JSON.stringify(items));window.dispatchEvent(new CustomEvent('ad:cart',{detail:items}))};
function add(item){let items=read();const foreign=items.length&&items[0].businessId!==item.businessId;if(foreign&&!confirm('Seu carrinho tem itens de outra empresa. Limpar e adicionar este produto?'))return false;if(foreign)items=[];const found=items.find(x=>x.id===item.id);if(found)found.qty+=1;else items.push({...item,qty:1});write(items);return true}
function remove(id){write(read().filter(x=>x.id!==id))}
function setQty(id,qty){const items=read(),x=items.find(i=>i.id===id);if(!x)return;if(qty<=0)return remove(id);x.qty=qty;write(items)}
function clear(){write([])}
function total(){return read().reduce((s,x)=>s+(Number(x.price)||0)*x.qty,0)}
function message(){const items=read();if(!items.length)return'';const lines=['Olá! Montei este pedido no Arapongas Digital:',''];items.forEach(x=>lines.push(`• ${x.qty}x ${x.name}${x.price!=null?' — '+new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(x.price)*x.qty):' — consultar preço'}`));const known=items.every(x=>x.price!=null);if(known)lines.push('',`Total de referência: ${new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(total())}`);lines.push('','Pode confirmar disponibilidade e condições?');return lines.join('\n')}
window.ArapongasDigitalCart={read,add,remove,setQty,clear,total,message};
