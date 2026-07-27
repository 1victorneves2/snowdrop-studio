# Snowdrop Studio — Landing Page

Site institucional da Snowdrop Studio. HTML puro, CSS modular, JS vanilla. Zero dependências de build. Pronto para hospedar em qualquer lugar.

---

## Estrutura do projeto

```
snowdrop-studio/
├── index.html          # Entrada principal
├── css/
│   ├── tokens.css      # Variáveis de design (cores, tipografia, espaçamento)
│   ├── base.css        # Reset + utilitários globais + scroll progress + reveal
│   ├── cursor.css      # Cursor customizado (desktop)
│   ├── nav.css         # Navbar fixa + menu mobile
│   ├── hero.css        # Hero (2 colunas) + bloom SVG + animações
│   ├── sections.css    # Serviços + Por que a Snowdrop + Processo
│   ├── portfolio.css   # Grid de projetos + arte + overlay hover
│   ├── marquee.css     # Faixa de tech stack (loop CSS puro)
│   ├── contact.css     # Contato (2 colunas) + founder + social
│   ├── footer.css      # Rodapé
│   └── responsive.css  # Media queries
├── js/
│   ├── flakes.js       # Partículas de neve com paralaxe (hero)
│   ├── typewriter.js   # Efeito de digitação no hero
│   ├── nav.js           # Scroll shrink + hamburger mobile
│   ├── reveal.js       # Reveal por scroll (stagger) + linha da tagline
│   ├── counter.js      # Contadores animados (seção de diferenciais)
│   ├── progress.js     # Barra de progresso de scroll + linha do processo
│   ├── cursor.js       # Cursor customizado com lag (fallback touch)
│   └── form.js         # Validação + envio do formulário
├── .gitignore
└── README.md
```

---

## Rodar localmente no VS Code

### Opção 1 — Live Server (recomendado)
1. Instale a extensão **Live Server** no VS Code
2. Clique com o botão direito em `index.html`
3. Clique em **"Open with Live Server"**
4. Abre em `http://127.0.0.1:5500`

### Opção 2 — Terminal simples
```bash
# Python 3
python3 -m http.server 3000

# Node.js (instale com: npm i -g serve)
npx serve .
```

---

## Subir no GitHub

```bash
# 1. Inicializa o repositório
git init
git add .
git commit -m "feat: initial landing page — Snowdrop Studio"

# 2. Cria o repositório no GitHub (via GitHub CLI)
gh repo create snowdrop-studio --public --source=. --push

# Ou manualmente:
git remote add origin https://github.com/SEU_USUARIO/snowdrop-studio.git
git branch -M main
git push -u origin main
```

---

## Deploy — opções gratuitas

### GitHub Pages (mais simples)
1. No GitHub → aba **Settings** do repositório
2. Vá em **Pages** → Source: `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)`
4. Salvar — fica em `https://seu-usuario.github.io/snowdrop-studio`

### Vercel (recomendado para domínio próprio)
```bash
npm i -g vercel
vercel
```
Ou conecte o repositório direto em [vercel.com](https://vercel.com) — detecta automaticamente.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --dir . --prod
```
Ou arraste a pasta em [app.netlify.com/drop](https://app.netlify.com/drop).

---

## Conectar domínio próprio (ex: snowdrop.io)

### Vercel
1. Dashboard → seu projeto → **Domains**
2. Adicione `snowdrop.io` e `www.snowdrop.io`
3. Vercel mostra os registros DNS — configure no seu registrador (Namecheap, GoDaddy, Cloudflare, etc.)
4. Propaga em até 48h (geralmente < 1h com Cloudflare)

### Registros DNS recomendados
| Tipo  | Nome | Valor                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21 (IP Vercel)  |
| CNAME | www  | cname.vercel-dns.com     |

---

## Conectar formulário de contato (backend)

Edite `js/form.js` e substitua o bloco `// TODO` por uma das opções:

### Formspree (sem backend, grátis)
```javascript
fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(form)
}).then(res => {
  if (res.ok) {
    successMsg.textContent = 'Mensagem enviada!';
    form.reset();
  }
});
```

### Backend próprio (Node.js/Express)
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: fields.name.input.value,
    email: fields.email.input.value,
    message: fields.message.input.value,
  })
});
```

---

## Próximos passos sugeridos

- [ ] Adicionar favicon (`/assets/favicon.ico`)
- [ ] Adicionar `sitemap.xml` para SEO
- [ ] Conectar formulário ao backend ou Formspree
- [ ] Adicionar Google Analytics ou Plausible
- [ ] Criar página de projeto individual (ex: `rhflow.html`)
- [ ] Migrar para Next.js quando precisar de mais páginas dinâmicas

---

**Snowdrop Studio** · Build · Ship · Grow
snowdropage@gmail.com · Manaus, BR
