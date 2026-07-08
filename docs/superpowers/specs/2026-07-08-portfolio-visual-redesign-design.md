# Redesign Visual do Portfólio — Design

## Contexto

O portfólio (React + Vite + Bootstrap, tema escuro) acumulou inconsistências visuais ao longo do tempo:

- Três cores de destaque concorrendo: `#00fecb`, `#a6dac9`, e `#646cff` (resquício do template padrão do Vite, nunca removido).
- Nenhuma variável CSS/design token — cores, espaçamentos e tamanhos de fonte hardcoded e repetidos em cada arquivo `.css`.
- Todas as seções (`ProfileBanner`, `AboutMe`, `Skills`, `ProjectsSlider`, `ContactSection`) usam o mesmo fundo `#1c1c1c` chapado, sem separação visual.
- O bloco de "Experiências Profissionais" em `AboutMe` usa `max-height: 400px; overflow-y: auto`, criando um scroll interno dentro de uma página que já rola — confuso para o visitante.
- Botões de CTA com estilos diferentes entre seções: pill outline (`#sobre .btn-contato`), sólido quadrado (`.contact-section .btn-light`), outline (`ProjectsSlider` usa classes Bootstrap `btn-outline-light`).

Este documento define o design visual acordado com o usuário (validado via mockups no navegador) para resolver essas inconsistências, sem alterar a stack (React + Vite + Bootstrap + Swiper) nem o conteúdo/textos existentes.

## Escopo

**Dentro do escopo:**
- Sistema de design tokens (CSS custom properties) para cor, aplicado em todos os componentes.
- Reformulação da paleta: cor de marca única (verde-esmeralda), remoção das cores divergentes.
- Ritmo visual entre seções via divisor fino com brilho da cor de marca.
- Componente de botão unificado (primário/secundário) aplicado a todos os CTAs do site.
- Substituição do bloco de experiências por timeline vertical, sem scroll interno.
- Ajustes de consistência em Skills, ProjectsSlider e Footer para usar os mesmos tokens de superfície/cor.
- Scroll-spy simples no Header para destacar o link da seção visível.

**Fora do escopo:**
- Mudança de conteúdo/textos (experiências, descrições, etc.).
- Mudança de stack ou bibliotecas (mantém Bootstrap, Swiper, bootstrap-icons, devicon).
- Light mode / alternância de tema (o site já tem um bloco `@media (prefers-color-scheme: light)` legado em `index.css`; será removido já que o site é dark-only na prática — todas as seções forçam fundo escuro independente do tema do SO).
- Novas seções ou funcionalidades (ex.: blog, testemunhos).
- Alterações na lógica do `ProjectsSlider`/`fetchGitHubRepos.js` (fetch de repositórios do GitHub permanece igual).

## Decisões de design (validadas com mockups)

### 1. Paleta de cores — Design tokens em `index.css`

Novo bloco `:root` centralizando todas as cores usadas pelos componentes:

```css
:root {
  --color-accent: #2dd4a7;
  --color-accent-dark: #1fae87;
  --color-accent-rgb: 45, 212, 167; /* para usar em rgba() */

  --color-bg: #14161a;
  --color-surface: #1c1f24;
  --color-surface-alt: #20242a;

  --color-text: #f4faf8;
  --color-text-muted: #9aa5ab;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
}
```

Todos os `.css` de componentes passam a referenciar essas variáveis em vez de hex hardcoded. As cores antigas (`#00fecb`, `#a6dac9`, `#646cff`) são removidas do código — inclusive o bloco `a { color: #646cff }` residual do template Vite em `index.css`.

O bloco `@media (prefers-color-scheme: light)` em `index.css` é removido: o site é dark-only por design (a seção `#sobre` já força `--bg-color`/`--text-color` fixos independente do tema do SO, então o bloco light é código morto na prática).

### 2. Ritmo entre seções

Todas as seções compartilham `background-color: var(--color-bg)`. Cada seção (exceto a última) recebe `border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.25)` para criar uma separação sutil sem quebrar a continuidade do fundo.

### 3. Componente de botão unificado

Duas classes utilitárias novas (definidas uma vez, em `index.css` ou um novo `src/styles/buttons.css` importado globalmente):

```css
.btn-primary {
  background: var(--color-accent);
  color: #0c1210;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.2s ease;
}
.btn-primary:hover { background: var(--color-accent-dark); transform: translateY(-2px); }

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-sm);
  padding: 0.55rem 1.35rem;
  font-weight: 600;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.btn-secondary:hover { border-color: var(--color-accent); transform: translateY(-2px); }
```

Aplicação:
- `ProfileBanner`: "Fale comigo" → `.btn-primary`
- `ContactSection`: "Baixar Currículo" → `.btn-primary`
- `ProjectsSlider`: "Ver Projeto" → `.btn-primary`, "Ver no GitHub" → `.btn-secondary` (substituem as classes Bootstrap `btn-outline-light`)

### 4. Timeline de experiências profissionais (`AboutMe`)

Remove `max-height` / `overflow-y: auto` de `.experience-block`. Cada `.experience-item` passa a ter um marcador circular e uma linha vertical conectando os itens (via `::before`/`::after` ou um wrapper com `border-left`), no estilo timeline. A ordem cronológica dos itens permanece a mesma (mais recente primeiro), sem mudança de conteúdo.

### 5. Consistência entre Skills, ProjectsSlider, Footer

- `.SkillsColumn`, `.project-card` e `.about-me-text`/`.education-block` passam a usar `var(--color-surface)` em vez de `#2b2b2b` hardcoded.
- `.footer-section` passa a usar `var(--color-bg)` (ou `--color-surface` se precisar de leve contraste) em vez do `#001919` isolado que hoje destoa do resto do site.
- Bordas arredondadas padronizadas: cards menores (`skill-item`, `education-block`) usam `--radius-md`, cards maiores (`project-card`, `SkillsColumn`) usam `--radius-lg`.

### 6. Header — indicador de seção ativa

O `Header` ganha um `useEffect` com `IntersectionObserver` (ou scroll listener simples) que marca a seção atualmente visível e aplica uma classe `.active` ao botão de nav correspondente, estilizado com `color: var(--color-accent)` e um sublinhado sutil. Não altera o comportamento de clique/scroll existente (`scrollToSection`).

## Arquivos afetados

- `src/index.css` — tokens, remoção do light-mode morto, remoção do roxo residual, estilos `.btn-primary`/`.btn-secondary`
- `src/components/Header/Header.jsx` e `Header.css` — scroll-spy + estilo `.active`
- `src/components/ProfileBanner/ProfileBanner.css` — tokens, botão
- `src/components/AboutMe/AboutMe.jsx` e `AboutMe.css` — timeline (JSX muda pouco: estrutura de marcadores pode exigir wrapper extra por item)
- `src/components/Skills/Skill.css` — tokens
- `src/components/ProjectsSlider/ProjectsSlider.jsx` e `.css` — tokens, troca de classes de botão
- `src/components/ContactSection/ContactSection.css` — tokens, botão
- `src/components/Footer/Footer.css` — tokens

## Testes / verificação

Não há testes automatizados no projeto (é um portfólio estático). A verificação será visual:
- Rodar `npm run dev` e revisar cada seção manualmente (desktop e mobile/breakpoints existentes: 768px, 992px, 576px).
- Confirmar que não há mais scroll interno na seção de experiências.
- Confirmar que os links do Header destacam a seção correta ao rolar.
- Confirmar que não sobrou nenhuma referência às cores antigas (`grep -rn "00fecb\|a6dac9\|646cff"` deve retornar vazio, exceto se documentado como intencional).
