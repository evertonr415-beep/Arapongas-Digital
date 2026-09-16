# Checklist de produção — Arapongas Digital

## Bloqueadores antes do lançamento
- [ ] Criar/importar projeto próprio do Arapongas Digital na Vercel e validar preview, build e rotas.
- [ ] Definir domínio oficial e validar HTTPS.
- [ ] Adicionar preview/produção aos trusted origins do Neon Auth.
- [ ] Desabilitar `Allow Localhost` no Neon Auth somente no fechamento de produção.
- [ ] Configurar provedor SMTP próprio para produção e validar entrega de e-mails.
- [ ] Habilitar/verificar estratégia de verificação de e-mail antes da abertura pública.
- [ ] Restringir CORS do Data API ao domínio oficial quando compatível com a arquitetura.
- [ ] Testar cadastro, login, logout, sessão e recuperação de senha ponta a ponta.
- [x] Validar RLS e autorização cruzada das tabelas tenant no banco (revisão de políticas concluída; QA ponta a ponta continua obrigatório).
- [x] Implementar vínculo autenticado usuário → profile → business antes de liberar CRUD do comerciante.
- [x] Confirmar papel admin/superadmin no backend antes de liberar Master Admin.
- [x] Revisar privilégios de `profiles`: `authenticated` não possui UPDATE em `role`, `active` ou `auth_user_id`; atualização fica limitada aos campos de perfil permitidos.
- [x] Revisar tabelas tenant para RLS e privilégios mínimos.
- [x] Definir CSP, frame-ancestors, referrer policy e demais headers de segurança no código; falta validar no preview real.
- [ ] Definir política final de privacidade, termos, controlador/canal LGPD e retenção.
- [x] Preparar PWA no código: manifest, ícone instalável, cache versionado, exclusão de áreas privadas e fallback offline; falta QA real em navegador/dispositivo.
- [ ] Testar PWA, atualização do service worker e comportamento offline no deployment real.
- [ ] Testar responsividade em iPhone/Android e desktop.
- [x] Revisar SEO, títulos/descriptions principais e robots no código; sitemap/canonical dependem do domínio oficial e QA do deployment.
- [x] Revisar o código por marcadores TODO/placeholder/mock/demo evidentes; nenhum marcador correspondente foi localizado na busca automatizada.
- [ ] Executar QA de fluxos críticos sem dados fictícios.

## Verificações concluídas em 16/09/2026
- Neon Auth ativo no banco `arapongas_digital` com e-mail/senha e cadastro habilitados.
- Data API ativa para o schema público.
- RLS e políticas tenant revisadas no banco.
- Vínculo de propriedade do comerciante validado no código e nas políticas.
- Autorização de admin/superadmin validada no backend/RPC e na camada cliente.
- Privilégios de coluna do perfil auditados diretamente no banco, sem permissão de autoelevação de papel pelo usuário autenticado.
- Função auxiliar `show_db_tree` auditada: não usa SECURITY DEFINER e não está exposta ao papel anonymous.
- Views públicas revisadas quanto à finalidade e exposição de dados.
- CSP adicionada à configuração Vercel, junto com HSTS, nosniff, frame deny, referrer policy, permissions policy e no-store/noindex para áreas privadas.
- `robots.txt` alinhado às áreas privadas/administrativas, incluindo login.
- Manifest PWA, ícone, Service Worker e fallback de navegação preparados para QA real.
- Termos de Uso pré-lançamento adicionados.
- Configuração do Neon Auth revalidada: trusted origins vazias, localhost ativo durante desenvolvimento, verificação de e-mail ainda não obrigatória e SMTP compartilhado em uso até o fechamento de produção.

## Pendências finais conhecidas
- A integração Vercel conectada ainda não expõe criação/importação de um novo projeto Arapongas Digital; tentativa direta de deployment sem contexto de projeto não é aceita. Não reutilizar projetos do Voto Forte.
- Trusted domains do Neon Auth continuam vazios até existir URL real de preview/produção.
- `Allow Localhost` continua ativo propositalmente durante desenvolvimento; deve ser desligado no fechamento de produção.
- SMTP compartilhado do Neon ainda está ativo; trocar por SMTP próprio antes do lançamento público.
- Verificação de e-mail não é obrigatória na configuração atual; definir e testar antes da abertura pública.
- Recuperação/redefinição de senha precisa ser implementada e testada conforme suporte oficial do Neon Auth para a arquitetura adotada.
- CSP está definida, mas precisa ser validada no navegador para detectar recursos eventualmente bloqueados.
- Preview Vercel e QA em navegador/dispositivos ainda pendentes.
- Sitemap e canonical devem ser gerados após definição do domínio oficial para evitar URLs fictícias/incorretas.
- Dados jurídicos definitivos da Política de Privacidade/Termos ainda precisam ser preenchidos.

## Não liberar antes disso
CRUD de empresas/produtos/serviços/ofertas/cupons, avaliações gravadas, fidelidade transacional, assinatura/pagamento e ações administrativas permanecem bloqueados até a autorização e isolamento correspondentes estarem comprovados em QA ponta a ponta.
