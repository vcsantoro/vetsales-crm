# VetSales CRM

MVP de CRM para prospecção veterinária construído com Next.js + Supabase.

## Recursos iniciais

- Login e cadastro com Supabase Auth
- Workspace isolado por usuário
- Dashboard comercial
- Base de leads com busca e filtros
- Ficha do lead
- Importação da base inicial de leads
- Templates parametrizáveis
- Canais configuráveis (e-mail / WhatsApp)
- Estrutura para campanhas, cadências, scoring, IA, opt-out e auditoria

## Stack

- Next.js 16 / React 19 / TypeScript
- Supabase (Postgres, Auth, RLS)
- Vercel

## Variáveis de ambiente

Crie as seguintes variáveis na Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xaizvucioojqnubejgye.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

> A publishable key do Supabase pode ficar no frontend; nunca exponha service_role/secret keys.

## Execução local

```bash
npm install
npm run dev
```

## Banco

As migrations estão em `supabase/migrations`.

## Segurança

As tabelas expostas usam Row Level Security (RLS) por workspace. Credenciais sensíveis de provedores externos não devem ser armazenadas diretamente no cliente.

## Deploy

Projeto conectado à Vercel para deploy contínuo a partir da branch `main`.
