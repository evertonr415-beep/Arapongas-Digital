// Merchant-side defensive guards layered over the authenticated API.
(()=>{
 const A=window.ArapongasDigitalAuth;
 if(!A)return;
 const normalizeProduct=input=>{
  const out={...(input||{})};
  const raw=out.stock_quantity;
  if(raw!==''&&raw!=null){
   const stock=Number(raw);
   if(!Number.isFinite(stock)||stock<0||!Number.isInteger(stock))throw new Error('Estoque inválido.');
   out.stock_quantity=stock;
   out.in_stock=stock>0;
  }else{
   out.stock_quantity=null;
   out.in_stock=Boolean(out.in_stock);
  }
  return out;
 };
 const create=A.createProduct.bind(A),update=A.updateProduct.bind(A);
 A.createProduct=input=>create(normalizeProduct(input));
 A.updateProduct=(id,input)=>update(id,normalizeProduct(input));
 A.normalizeProductStock=normalizeProduct;
})();
