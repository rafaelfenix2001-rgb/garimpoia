# Guia: criar o repositório no GitHub e conectar

O projeto já tem Git local, com um commit inicial na branch `main`. Falta só criar o repositório no GitHub e enviar.

## Passo a passo

1. Entre em github.com e faça login (conta gratuita serve).
2. Clique em **New repository**.
3. Nome: `garimpo-ia`.
4. Escolha **Private** ou **Public** (veja a observação abaixo).
5. **Não** marque "Add a README", `.gitignore` nem licença. O projeto já tem os seus, e marcar cria conflito no primeiro envio.
6. Clique em **Create repository**. O GitHub mostra uma URL do tipo `https://github.com/SEU_USUARIO/garimpo-ia.git`.
7. No PowerShell, dentro da pasta do projeto:

```powershell
git remote add origin https://github.com/SEU_USUARIO/garimpo-ia.git
git push -u origin main
```

8. O Windows pode abrir uma janela para você entrar no GitHub. Entre normalmente.
9. Na aba **Actions** do repositório, o fluxo "CI" roda sozinho. Ele faz lint, tipos, testes, build e build para Workers. Nenhum deploy nem segredo é usado.

## Observação: proteção da branch `main`

O briefing pede `main` protegida (nada entra sem pull request). Pela documentação do GitHub, **proteção de branch em repositório privado exige plano pago** (Pro, Team ou Enterprise). No plano gratuito ela só vale em repositório **público**.

Opções sem gastar:

- Repositório **público**: protege a `main` de graça. O código fica visível, mas não há segredo nenhum nele (`.env.local` é ignorado). Confira isso antes de publicar.
- Repositório **privado**: sem proteção automática. Combine a regra de sempre abrir pull request em vez de enviar direto para `main`, e use o CI como conferência.

A escolha é sua. Por padrão, eu recomendo começar **privado**, por não haver ainda nada para mostrar, e rever quando houver motivo.

## Depois de enviar

Me avise e eu sigo o fluxo do briefing: branches curtas (`feat/*`, `fix/*`, `chore/*`) e pull requests.
