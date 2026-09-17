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
- [x] Validar RLS e autorização cruzada das tabelas tenant no banco.
- [x] Aplicar no banco principal os entitlements de plano para produtos, destaques e criação de cupons, com verificação pós-migração.
- [x] Implementar vínculo autenticado usuário → profile → business antes de liberar CRUD do comerciante.
- [x] Confirmar papel admin/superadmin no backend antes de liberar Master Admin.
- [x] Revisar privilégios de `profiles`: `authenticated` não possui UPDATE em `role`, `active` ou `auth_user_id`; atualização fica limitada aos campos de perfil permitidos.
- [x] Revisar tabelas tenant para RLS e privilégios mínimos.
- [x] Remover execução pública/autenticada da função auxiliar `show_db_tree()` no banco principal.
- [x] Definir CSP, frame-ancestors, referrer policy e demais headers de segurança no código; falta validar no preview real.
- [ ] Definir política final de privacidade, termos, controlador/canal LGPD e retenção.
- [x] Preparar PWA no código: manifest, ícone instalável, cache versionado, exclusão de áreas privadas e fallback offline; falta QA real em navegador/dispositivo.
- [ ] Testar PWA, atualização do service worker e comportamento offline no deployment real.
- [ ] Testar responsividade em iPhone/Android e desktop.
- [x] Revisar SEO, títulos/descriptions principais e robots no código; sitemap/canonical dependem do domínio oficial e QA do deployment.
- [x] Revisar o código por marcadores TODO/placeholder/mock/demo evidentes; nenhum marcador correspondente foi localizado na busca automatizada.
- [ ] Executar QA de fluxos críticos sem dados fictícios.

## Verificações concluídas em 16–17/09/2026
- Neon Auth ativo no banco `arapongas_digital` com e-mail/senha e cadastro habilitados.
- Data API ativa para o schema público.
- RLS e políticas tenant revisadas no banco.
- Migração final de entitlements aplicada ao banco principal em 17/09/2026: produtos e cupons passaram a ter políticas separadas por operação, mantendo ownership e impondo os benefícios do plano no INSERT/UPDATE aplicável.
- Funções `business_plan_id`, `business_can_add_product`, `business_can_feature_product` e `business_can_use_coupons` verificadas após a migração: sem EXECUTE para `anonymous` e com EXECUTE para `authenticated`.
- Vínculo de propriedade do comerciante validado no código e nas políticas.
- Autorização de admin/superadmin validada no backend/RPC e na camada cliente.
- Privilégios de coluna do perfil auditados diretamente no banco, sem permissão de autoelevação de papel pelo usuário autenticado.
- Função auxiliar `show_db_tree()` não usa SECURITY DEFINER e teve EXECUTE revogado de PUBLIC, `anonymous` e `authenticated`; verificação pós-migração no banco principal confirmou `anonymous_execute=false` e `authenticated_execute=false`.
- Views públicas revisadas quanto à finalidade e exposição de dados.
- CSP adicionada à configuração Vercel, junto com HSTS, nosniff, frame deny, referrer policy, permissions policy e no-store/noindex para áreas privadas.
- Rotas pessoais de carrinho, favoritos, fidelidade e compartilhamento incluídas na proteção de cache/indexação; o carrinho passou a renderizar itens via DOM/event listeners em vez de HTML/eventos inline.
- `robots.txt` alinhado às áreas privadas/administrativas, incluindo login.
- Manifest PWA, ícone, Service Worker e fallback de navegação preparados para QA real.
- Termos de Uso pré-lançamento adicionados.
- Configuração do Neon Auth revalidada: trusted origins vazias, localhost ativo durante desenvolvimento, verificação de e-mail ainda não obrigatória e SMTP compartilhado em uso até o fechamento de produção.
- Branch de fechamento confirmada no commit-base de deployment `84ce9ffe16565d5b81122d488c04caa8ef523f51` antes desta atualização documental.

## Pendências finais conhecidas
- O conector Vercel aceita deployment com nome, ambiente e pacote de arquivos, mas não importa automaticamente uma branch GitHub por referência. Não reutilizar projetos do Voto Forte; o primeiro deployment deve ser um Preview próprio `arapongas-digital`.
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
