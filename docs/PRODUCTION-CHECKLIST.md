# Checklist de produção — Arapongas Digital

## Bloqueadores antes do lançamento
- [ ] Criar projeto de produção na Vercel e validar build/rotas.
- [ ] Definir domínio oficial e HTTPS.
- [ ] Adicionar domínio oficial aos trusted origins do Neon Auth.
- [ ] Restringir CORS do Data API ao domínio oficial quando compatível com a arquitetura.
- [ ] Testar cadastro, login, logout, sessão e recuperação de senha ponta a ponta.
- [ ] Validar RLS e autorização cruzada entre dois consumidores e duas empresas.
- [ ] Implementar vínculo autenticado usuário → profile → business antes de liberar CRUD do comerciante.
- [ ] Confirmar papel admin/superadmin no backend antes de liberar Master Admin.
- [ ] Revisar todas as tabelas tenant para RLS e privilégios mínimos.
- [ ] Revisar CSP, frame-ancestors, referrer policy e demais headers de segurança.
- [ ] Definir política final de privacidade, termos, controlador/canal LGPD e retenção.
- [ ] Testar PWA, cache, atualização do service worker e comportamento offline.
- [ ] Testar responsividade em iPhone/Android e desktop.
- [ ] Validar SEO, títulos, descriptions, sitemap e robots.
- [ ] Remover placeholders que possam parecer funcionalidades ativas.
- [ ] Executar QA de fluxos críticos sem dados fictícios.

## Não liberar antes disso
CRUD de empresas/produtos/serviços/ofertas/cupons, avaliações gravadas, fidelidade transacional, assinatura/pagamento e ações administrativas permanecem bloqueados até a autorização e isolamento correspondentes estarem comprovados.
