// Camada pública de leitura do Arapongas Digital.
// Este endpoint não contém credenciais de banco. Operações privilegiadas nunca devem ser feitas no navegador.
const ARAPONGAS_API='https://ep-delicate-recipe-ac7oxhhf.apirest.sa-east-1.aws.neon.tech/arapongas_digital/rest/v1';

async function apiGet(resource, params=''){
  const response=await fetch(`${ARAPONGAS_API}/${resource}${params}`,{headers:{Accept:'application/json'}});
  if(!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}

window.ArapongasDigitalAPI={
  categories:()=>apiGet('categories','?select=id,name,slug,icon,sort_order&active=eq.true&order=sort_order.asc'),
  businesses:()=>apiGet('businesses','?select=id,name,slug,description,logo_url,cover_url,whatsapp,phone,instagram,website,verified,featured&active=eq.true&order=featured.desc,name.asc'),
  featuredProducts:()=>apiGet('products','?select=id,business_id,category_id,name,slug,description,price,promotional_price,in_stock,featured,updated_at&active=eq.true&featured=eq.true&order=updated_at.desc&limit=24'),
  offers:()=>apiGet('offers','?select=id,business_id,product_id,title,description,image_url,starts_at,ends_at,featured&active=eq.true&order=featured.desc,starts_at.desc&limit=24')
};
