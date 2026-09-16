# Checklist de produção — Arapongas Digital

## Bloqueadores antes do lançamento
- [ ] Criar projeto de produção na Vercel e validar build/rotas.
- [ ] Definir domínio oficial e HTTPS.
- [ ] Adicionar domínio oficial aos trusted origins do Neon Auth.
- [ ] Restringir CORS do Data API ao domínio oficial quando compatível com a arquitetura.
- [ ] Testar cadastro, login, logout, sessão e recuperação de senha ponta a ponta.
- [x] Validar RLS e autorização cruzada das tabelas tenant no banco (revisão de políticas concluída; QA ponta a ponta continua obrigatório).
- [x] Implementar vínculo autenticado usuário → profile → business antes de liberar CRUD do comerciante.
- [x] Confirmar papel admin/superadmin no backend antes de liberar Master Admin.
- [x] Revisar tabelas tenant para RLS e privilégios mínimos.
- [ ] Revisar CSP, frame-ancestors, referrer policy e demais headers de segurança.
- [ ] Definir política final de privacidade, termos, controlador/canal LGPD e retenção.
- [ ] Testar PWA, cache, atualização do service worker e comportamento offline.
- [ ] Testar responsividade em iPhone/Android e desktop.
- [ ] Validar SEO, títulos, descriptions, sitemap e robots.
- [x] Revisar o código por marcadores TODO/placeholder/mock/demo evidentes no branch principal; nenhum marcador correspondente foi localizado na busca automatizada.
- [ ] Executar QA de fluxos críticos sem dados fictícios.

## Verificações concluídas em 16/09/2026
- Neon Auth ativo no banco `arapongas_digital`.
- Data API ativa para o schema público.
- RLS e políticas tenant revisadas no banco.
- Vínculo de propriedade do comerciante validado no código e nas políticas.
- Autorização de admin/superadmin validada no backend/RPC e na camada cliente.
- Headers existentes da Vercel revisados: HSTS, nosniff, frame deny, referrer policy, permissions policy e no-store/noindex para áreas privadas.

## Pendências finais conhecidas
- Trusted domains do Neon Auth ainda vazios até existir URL real de preview/produção.
- Recuperação/redefinição de senha precisa ser implementada e testada.
- CSP precisa ser definida sem quebrar os scripts/recursos atuais.
- Preview Vercel e QA em navegador/dispositivos ainda pendentes.

## Não liberar antes disso
CRUD de empresas/produtos/serviços/ofertas/cupons, avaliações gravadas, fidelidade transacional, assinatura/pagamento e ações administrativas permanecem bloqueados até a autorização e isolamento correspondentes estarem comprovados em QA ponta a ponta.
