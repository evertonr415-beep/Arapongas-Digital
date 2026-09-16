# Arquitetura — Arapongas Digital

## Princípios
- Multi-cidade desde o banco.
- Navegação pública sem login obrigatório.
- Dados comerciais reais vêm do cadastro dos comerciantes.
- Nenhum segredo de banco é incluído no frontend.
- Escritas sensíveis exigem autenticação e autorização por papel/tenant.
- Operações administrativas geram trilha de auditoria.

## Camadas
1. Portal consumidor/PWA
2. Área do comerciante
3. Painel Master
4. Neon Auth
5. Neon Data API
6. PostgreSQL

## Leitura pública
A camada pública utiliza somente projeções seguras:
- `v_public_categories`
- `v_public_businesses`
- `v_public_products`
- `v_public_offers`

O papel `anonymous` recebe SELECT apenas nas views públicas e em `cities`. Tabelas privadas de perfis, assinaturas, favoritos, avaliações, agendamentos, métricas e auditoria não são expostas para leitura anônima.

## Multi-tenant
`city_id` delimita a cidade. `business_id` delimita o estabelecimento. O perfil autenticado terá papel `consumer`, `merchant`, `admin` ou `superadmin`; comerciantes só poderão alterar recursos pertencentes às próprias empresas.

## Busca
Empresas e produtos possuem índices full-text em português. Eventos de busca são armazenados separadamente para análises futuras.

## Publicação
GitHub é a fonte de código. Vercel será a camada de publicação do frontend. Neon permanece isolado como backend de dados/autenticação.
