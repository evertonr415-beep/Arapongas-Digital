# Segurança — Arapongas Digital

## Princípios
- Nenhum segredo, senha, token privilegiado ou connection string deve ser commitado no repositório.
- Dados públicos devem ser lidos somente pelas views públicas autorizadas.
- Operações autenticadas devem respeitar RLS e vínculo entre usuário, perfil e empresa.
- Interfaces administrativas permanecem fail-closed até confirmação de papel `admin` ou `superadmin` pelo backend.
- Conteúdo fornecido por usuários deve ser renderizado como texto, nunca interpolado diretamente em HTML.
- Ações sensíveis de comerciante e administrador não devem confiar em IDs de empresa enviados apenas pelo navegador.

## Produção
Antes do lançamento, validar CORS, trusted origins do provedor de autenticação, políticas RLS, recuperação de senha, headers de segurança, CSP, cookies, rate limiting, logs de auditoria e testes de autorização entre tenants.

## Privacidade / LGPD
Coletar apenas dados necessários para a finalidade informada, separar dados públicos de dados de conta, oferecer informações claras sobre tratamento e retenção e definir processo operacional para solicitações do titular antes da abertura pública.

## Reporte
Falhas de segurança não devem ser publicadas com credenciais, tokens ou dados pessoais. Revogar imediatamente qualquer credencial exposta e registrar a correção no processo interno do projeto.
