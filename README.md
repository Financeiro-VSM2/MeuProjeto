# MeuProjeto

Tela de login responsiva do Agravo, implementada com HTML, CSS e JavaScript sem dependências de build.

A segunda tela está disponível em `dashboard.html`. A tabela foi separada para `processes.html`, acessível pelo menu Processos.

## Supabase

1. Crie um projeto no Supabase e habilite o provedor de e-mail.
2. Copie a URL do projeto e a chave pública `anon` para `config.js`.
3. Mantenha o RLS habilitado nas tabelas e nunca use uma chave `service_role` no frontend.

O formulário já chama o endpoint de autenticação por senha do Supabase quando as duas configurações estão preenchidas. Sem configuração, ele permanece em modo de demonstração para permitir validar a interface.

## Cloudflare Pages

O projeto pode ser publicado diretamente no Cloudflare Pages usando a raiz do repositório como diretório de saída. Como é um site estático, não há comando de build necessário:

- **Build command:** deixe vazio
- **Build output directory:** `/`

Em produção, injete `config.js` durante o deploy ou substitua os valores pelos dados públicos do projeto. Chaves públicas não substituem as regras de segurança do Supabase.
