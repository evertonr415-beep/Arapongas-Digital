// Configuração pública do Neon Auth. Não contém segredos.
const ARAPONGAS_AUTH='https://ep-delicate-recipe-ac7oxhhf.neonauth.sa-east-1.aws.neon.tech/arapongas_digital/auth';

async function authRequest(path,options={}){
  const response=await fetch(`${ARAPONGAS_AUTH}${path}`,{
    credentials:'include',
    headers:{'Content-Type':'application/json',Accept:'application/json',...(options.headers||{})},
    ...options
  });
  let data=null; try{data=await response.json()}catch{}
  if(!response.ok) throw new Error(data?.message||data?.error||`Auth ${response.status}`);
  return data;
}
window.ArapongasDigitalAuth={
  baseUrl:ARAPONGAS_AUTH,
  session:()=>authRequest('/get-session',{method:'GET'}),
  signIn:(email,password)=>authRequest('/sign-in/email',{method:'POST',body:JSON.stringify({email,password})}),
  signUp:(name,email,password)=>authRequest('/sign-up/email',{method:'POST',body:JSON.stringify({name,email,password})}),
  signOut:()=>authRequest('/sign-out',{method:'POST',body:'{}'})
};
