// Neon Auth + Data API authenticated layer. Public endpoints only; no privileged secrets.
const ARAPONGAS_AUTH='https://ep-delicate-recipe-ac7oxhhf.neonauth.sa-east-1.aws.neon.tech/arapongas_digital/auth';
const ARAPONGAS_DATA='https://ep-delicate-recipe-ac7oxhhf.apirest.sa-east-1.aws.neon.tech/arapongas_digital/rest/v1';
let cachedJwt=null;

async function authRequest(path,options={}){
  const response=await fetch(`${ARAPONGAS_AUTH}${path}`,{
    credentials:'include',
    headers:{'Content-Type':'application/json',Accept:'application/json',...(options.headers||{})},
    ...options
  });
  let data=null; try{data=await response.json()}catch{}
  if(!response.ok) throw new Error(data?.message||data?.error||`Auth ${response.status}`);
  const jwt=response.headers.get('set-auth-jwt');
  if(jwt){cachedJwt=jwt;if(data?.session)data.session.token=jwt;else if(data?.data?.session)data.data.session.token=jwt}
  return data;
}
async function session(){
  const data=await authRequest('/get-session',{method:'GET'});
  const token=data?.session?.token||data?.data?.session?.token;
  if(token)cachedJwt=token;
  return data;
}
async function jwt(){
  if(cachedJwt)return cachedJwt;
  const s=await session();
  return s?.session?.token||s?.data?.session?.token||cachedJwt||null;
}
async function dataRequest(resource,{method='GET',query='',body,prefer}={}){
  const token=await jwt();
  if(!token)throw new Error('Sessão autenticada sem token de dados.');
  const headers={Accept:'application/json',Authorization:`Bearer ${token}`};
  if(body!==undefined)headers['Content-Type']='application/json';
  if(prefer)headers.Prefer=prefer;
  const response=await fetch(`${ARAPONGAS_DATA}/${resource}${query}`,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
  let data=null;try{data=await response.json()}catch{}
  if(!response.ok)throw new Error(data?.message||data?.details||`Data API ${response.status}`);
  return data;
}
async function currentProfile(){
  const rows=await dataRequest('profiles',{query:'?select=id,auth_user_id,full_name,phone,role,city_id,avatar_url,active,created_at&limit=1'});
  return Array.isArray(rows)?rows[0]||null:null;
}
async function ensureProfile(user){
  if(!user?.id)throw new Error('Usuário autenticado inválido.');
  let profile=await currentProfile();
  if(profile)return profile;
  const rows=await dataRequest('profiles',{method:'POST',body:{auth_user_id:String(user.id),full_name:String(user.name||'').trim()||null,role:'consumer'},prefer:'return=representation'});
  profile=Array.isArray(rows)?rows[0]||null:null;
  if(!profile)profile=await currentProfile();
  return profile;
}
async function updateProfile(changes={}){
  const allowed={};
  if(Object.prototype.hasOwnProperty.call(changes,'full_name'))allowed.full_name=String(changes.full_name||'').trim().slice(0,160)||null;
  if(Object.prototype.hasOwnProperty.call(changes,'phone'))allowed.phone=String(changes.phone||'').replace(/[^0-9+() -]/g,'').trim().slice(0,30)||null;
  if(Object.prototype.hasOwnProperty.call(changes,'city_id'))allowed.city_id=changes.city_id||null;
  if(Object.prototype.hasOwnProperty.call(changes,'avatar_url'))allowed.avatar_url=changes.avatar_url||null;
  if(!Object.keys(allowed).length)return currentProfile();
  const rows=await dataRequest('profiles',{method:'PATCH',query:'?select=id,auth_user_id,full_name,phone,role,city_id,avatar_url,active',body:allowed,prefer:'return=representation'});
  return Array.isArray(rows)?rows[0]||null:null;
}
async function signOut(){try{return await authRequest('/sign-out',{method:'POST',body:'{}'})}finally{cachedJwt=null}}
window.ArapongasDigitalAuth={
  baseUrl:ARAPONGAS_AUTH,dataApiUrl:ARAPONGAS_DATA,
  session,jwt,
  signIn:(email,password)=>authRequest('/sign-in/email',{method:'POST',body:JSON.stringify({email,password})}),
  signUp:(name,email,password)=>authRequest('/sign-up/email',{method:'POST',body:JSON.stringify({name,email,password})}),
  signOut,currentProfile,ensureProfile,updateProfile,dataRequest
};
