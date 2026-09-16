// Camada pública de leitura do Arapongas Digital.
// Somente views públicas são consultadas no navegador; credenciais privilegiadas ficam fora do frontend.
const ARAPONGAS_API='https://ep-delicate-recipe-ac7oxhhf.apirest.sa-east-1.aws.neon.tech/arapongas_digital/rest/v1';

async function apiGet(resource, params=''){
  const response=await fetch(`${ARAPONGAS_API}/${resource}${params}`,{headers:{Accept:'application/json'}});
  if(!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const qs=s=>encodeURIComponent(String(s??''));
window.ArapongasDigitalAPI={
  categories:()=>apiGet('v_public_categories','?select=*&order=sort_order.asc,name.asc'),
  businesses:(cityId)=>apiGet('v_public_businesses',`?select=*&city_id=eq.${qs(cityId)}&order=featured.desc,name.asc`),
  businessBySlug:(slug)=>apiGet('v_public_businesses',`?select=*&slug=eq.${qs(slug)}&limit=1`),
  featuredProducts:(cityId)=>apiGet('v_public_products',`?select=*&city_id=eq.${qs(cityId)}&featured=eq.true&order=updated_at.desc&limit=24`),
  productsByBusiness:(businessId)=>apiGet('v_public_products',`?select=*&business_id=eq.${qs(businessId)}&order=featured.desc,name.asc&limit=100`),
  offers:(cityId)=>apiGet('v_public_offers',`?select=*&city_id=eq.${qs(cityId)}&order=featured.desc,starts_at.desc&limit=24`),
  search:async(cityId,query)=>{const q=String(query||'').trim();if(!q)return[];const like=qs(`*${q}*`);return apiGet('v_public_products',`?select=*&city_id=eq.${qs(cityId)}&or=(name.ilike.${like},description.ilike.${like},business_name.ilike.${like},category_name.ilike.${like})&order=featured.desc,updated_at.desc&limit=60`)},
  escape:esc
};
