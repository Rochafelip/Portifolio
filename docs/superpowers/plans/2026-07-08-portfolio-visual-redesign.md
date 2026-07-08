# Portfolio Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's inconsistent, hardcoded color scheme and mismatched components with a unified design-token system (single emerald-green accent), a consistent button component, a scroll-spy header, and a scrollable-page-friendly timeline for the experience list.

**Architecture:** Pure CSS/JSX changes to an existing React + Vite site. No new dependencies, no build config changes, no content changes. Central CSS custom properties (`:root` tokens) defined once in `src/index.css`; every component `.css` file is edited to reference those tokens instead of hardcoded hex values. Two new global utility classes (`.btn-primary`, `.btn-secondary`) replace all ad-hoc button styles. `Header.jsx` gains an `IntersectionObserver`-based active-link tracker. `AboutMe.jsx`/`AboutMe.css` replace the scrolling experience box with a vertical timeline.

**Tech Stack:** React 18 (Vite), plain CSS (no CSS-in-JS, no Sass), Bootstrap classes used ad-hoc in JSX, Swiper for the project slider, bootstrap-icons + devicon for icons.

**Spec:** `docs/superpowers/specs/2026-07-08-portfolio-visual-redesign-design.md`

**Verification approach:** This project has no automated test suite (it's a static portfolio site). Each task is verified by (a) `grep` checks confirming old hardcoded colors are gone from the file just edited, and (b) a final build + manual visual pass in the browser. Do not add a test framework — that would be out of scope.

---

### Task 1: Design tokens, dead light-mode removal, global button classes (`src/index.css`)

**Files:**
- Modify: `src/index.css` (full rewrite)

- [ ] **Step 1: Replace the entire file contents**

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --color-accent: #2dd4a7;
  --color-accent-dark: #1fae87;
  --color-accent-rgb: 45, 212, 167;

  --color-bg: #14161a;
  --color-surface: #1c1f24;
  --color-surface-alt: #20242a;

  --color-text: #f4faf8;
  --color-text-muted: #9aa5ab;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
}

body {
  margin: 0;
  min-width: 220px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  color: var(--color-text);
}

a {
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: inherit;
}
a:hover {
  color: var(--color-accent-dark);
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: var(--color-accent);
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.btn-primary {
  background: var(--color-accent);
  color: #0c1210;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-block;
  background: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-sm);
  padding: 0.55rem 1.35rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

header.fixed-top {
  background-color: var(--color-bg);
  color: var(--color-text);
  z-index: 1030;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

header .nav-link {
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.2s ease;
}
header .nav-link:hover {
  color: var(--color-accent);
}

#sobre {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  background-color: var(--color-bg);
  color: var(--color-text);
}

#sobre h2,
#sobre p {
  margin-bottom: 1rem;
}

#sobre a {
  margin-right: 1rem;
  font-size: 1.5rem;
  color: var(--color-text);
  transition: color 0.2s ease;
}
#sobre a:hover {
  color: var(--color-accent);
}
```

- [ ] **Step 2: Verify no old colors remain in this file**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#242424\|#1c1c1c" src/index.css`
Expected: no output (empty result)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: introduce design tokens and unified button classes"
```

---

### Task 2: `ProfileBanner` — tokens, section divider, primary button

**Files:**
- Modify: `src/components/ProfileBanner/ProfileBanner.css` (full rewrite)
- Modify: `src/components/ProfileBanner/ProfileBanner.jsx:54-60`

- [ ] **Step 1: Replace `ProfileBanner.css` contents**

```css
#sobre {
  background-color: var(--color-bg);
  padding: 4rem 1rem;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.25);
}

#foto-perfil {
  max-width: 340px;
  border: 4px solid var(--color-accent);
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

#foto-perfil:hover {
  transform: scale(1.10);
}

.typing {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text);
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid var(--color-accent);
  width: 0;
  animation: typing 2.5s steps(30, end) forwards, blink 0.7s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.lead {
  color: var(--color-text-muted);
  font-size: 1.2rem;
}

.social-icon-rounded {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  font-size: 1.25rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
}

.social-icon-rounded:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .typing {
    font-size: 1.7rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  #foto-perfil {
    max-width: 220px;
  }

  .social-icon-rounded {
    width: 42px;
    height: 42px;
    font-size: 1.1rem;
  }

  #sobre .btn-primary {
    width: 100%;
    padding: 0.7rem;
    font-size: 1.05rem;
  }
}
```

- [ ] **Step 2: Update the CTA button class in `ProfileBanner.jsx`**

Find (around line 54-60):

```jsx
            <button
              className="btn btn-contato"
              onClick={() => {
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}
            >Fale comigo              
            </button>
```

Replace with:

```jsx
            <button
              className="btn-primary"
              onClick={() => {
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Fale comigo
            </button>
```

- [ ] **Step 3: Verify no old colors remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#1c1c1c\|btn-contato" src/components/ProfileBanner/ProfileBanner.css src/components/ProfileBanner/ProfileBanner.jsx`
Expected: no output

- [ ] **Step 4: Commit**

```bash
git add src/components/ProfileBanner/ProfileBanner.css src/components/ProfileBanner/ProfileBanner.jsx
git commit -m "refactor: apply design tokens and unified button to ProfileBanner"
```

---

### Task 3: `Header` — tokens, active-section highlight (scroll-spy)

**Files:**
- Modify: `src/components/Header/Header.jsx` (full rewrite)
- Modify: `src/components/Header/Header.css` (full rewrite)

- [ ] **Step 1: Replace `Header.jsx` contents**

```jsx
import React, { useState, useEffect } from 'react';
import './Header.css';

const NAV_ITEMS = [
  { id: 'sobre', label: 'Início' },
  { id: 'about-me', label: 'Sobre Mim' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="custom-header">
      <div className="container">
        <div className="header-container">
          <h4 className="logo">Felipe Rocha</h4>

          <button
            className="menu-toggle"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="custom-toggler-icon"></span>
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(`#${item.id}`)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

- [ ] **Step 2: Replace `Header.css` contents**

```css
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  position: relative;
}

.logo {
  margin: 0;
  font-weight: bold;
  color: var(--color-accent);
  font-size: 1.40rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.custom-header {
  width: 100%;
  background-color: var(--color-surface);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.custom-toggler-icon {
  width: 30px;
  height: 30px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links button {
  background: none;
  border: none;
  color: var(--color-text);
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-links button:hover {
  color: var(--color-accent);
}

.nav-links button.active {
  color: var(--color-accent);
  position: relative;
}

.nav-links button.active::after {
  content: '';
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: -2px;
  height: 2px;
  background-color: var(--color-accent);
}

/* Responsivo */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--color-surface);
    width: 100%;
    padding: 0.5rem 1rem;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links button {
    padding: 0.75rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-links button.active::after {
    display: none;
  }
}
```

- [ ] **Step 3: Verify no old colors remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#111\|#222" src/components/Header/Header.css src/components/Header/Header.jsx`
Expected: no output

- [ ] **Step 4: Manually verify scroll-spy behavior**

Run: `npm run dev`, open the printed local URL in the browser, and scroll through each section. Confirm the corresponding nav button turns green (`--color-accent`) and gets an underline as its section comes into view. Stop the dev server (Ctrl+C) when done.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header/Header.jsx src/components/Header/Header.css
git commit -m "feat: add scroll-spy active link highlighting to Header"
```

---

### Task 4: `AboutMe` — vertical timeline, tokens

**Files:**
- Modify: `src/components/AboutMe/AboutMe.jsx` (full rewrite)
- Modify: `src/components/AboutMe/AboutMe.css` (full rewrite)

- [ ] **Step 1: Replace `AboutMe.jsx` contents**

```jsx
import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me-section" id="about-me">
      <div className="about-me-wrapper">
        <h2 className="section-title px-3">Sobre Mim</h2>

        <div className="about-me-columns">
          <div className="experience-block">
            <h3>Experiências Profissionais</h3>

            <div className="timeline">
              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack Ruby — Projeto ESG</h5>
                <p>
                  Construção de API RESTful com autenticação JWT, dashboards interativos e controle de indicadores GRI/ODS usando Rails e React.
                </p>
                <small>Maio 2025 – Atual</small>
              </div>

              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack Ruby — Softex PE</h5>
                <p>
                  Aplicação full-stack com Hotwire e API Rails, testes com RSpec, autenticação segura e experiência em tempo real com Turbo.
                </p>
                <small>Fev 2024 – Abr 2025</small>
              </div>

              <div className="timeline-item">
                <h5>Suporte em Informática — TRE-PE</h5>
                <p>
                  Manutenção de estações Linux/Windows, monitoramento de rede e documentação técnica em ambiente público.
                </p>
                <small>Mar 2023 – Dez 2023</small>
              </div>

              <div className="timeline-item">
                <h5>Trainee Java Developer — BRX Retail</h5>
                <p>
                  Aprendizado acelerado em Oracle APEX e PL/SQL, com foco em queries otimizadas e participação em reuniões técnicas.
                </p>
                <small>Ago 2022 – Fev 2023</small>
              </div>

              <div className="timeline-item">
                <h5>Desenvolvedor Full Stack — SiDi</h5>
                <p>
                  App desktop com C# e UWP, consumo da PokéAPI e persistência local com NoSQL, priorizando UX e desempenho.
                </p>
                <small>Out 2021 – Jun 2022</small>
              </div>
            </div>
          </div>

          <div className="about-details">
            <div className="about-me-text">
              <p>
                Desenvolvedor de software com foco na construção de aplicações web completas, utilizando Ruby on Rails no backend. Para criar soluções robustas e entregar valor real aos projetos, também possuo conhecimento prático em tecnologias frontend como React.js, JavaScript, HTML e CSS. Com formação em Ciência da Computação e experiência com APIs, TDD e banco de dados como PostgreSQL, valorizo a escrita de código limpo, a colaboração em equipe e a entrega de produtos de alta qualidade.
              </p>
            </div>

            <div className="education-block">
              <h4>Formação Acadêmica</h4>
              <p className="mb-0">Bacharel em Ciência da Computação</p>
              <small>Universidade Católica de Pernambuco (UNICAP)</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
```

- [ ] **Step 2: Replace `AboutMe.css` contents**

```css
.about-me-section {
  background-color: var(--color-bg);
  min-height: 70vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.25);
  padding: 3rem 0;
}

.about-me-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: var(--radius-lg);
}

.about-me-wrapper h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-accent);
}

.about-me-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.experience-block {
  flex: 1 1 45%;
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
}

.experience-block h3 {
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(var(--color-accent-rgb), 0.35);
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.55rem;
  top: 0.35rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-surface);
}

.timeline-item h5 {
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  color: var(--color-text);
}

.timeline-item p {
  font-size: 0.95rem;
  text-align: justify;
}

.about-details {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-me-text {
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
  text-align: justify;
}

.about-me-text p {
  margin: 0;
}

.education-block {
  background-color: var(--color-surface-alt);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
}

.education-block h4 {
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.education-block p {
  margin: 0;
  font-weight: 500;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .about-me-columns {
    flex-direction: column;
  }
}
```

- [ ] **Step 3: Verify no old colors and no leftover scroll box remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|max-height\|overflow-y" src/components/AboutMe/AboutMe.css`
Expected: no output

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutMe/AboutMe.jsx src/components/AboutMe/AboutMe.css
git commit -m "refactor: replace scrolling experience box with vertical timeline"
```

---

### Task 5: `Skills` — tokens and section divider

**Files:**
- Modify: `src/components/Skills/Skill.css` (full rewrite)

- [ ] **Step 1: Replace `Skill.css` contents**

```css
.skills-section {
  background-color: var(--color-bg);
  padding: 2rem;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.25);
}

.skills-section h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-accent);
}

.skills-section h4 {
  font-size: 1.6rem;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-accent);
  display: center;
  padding-bottom: 0.4rem;
}

.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.SkillsColumn {
  background-color: var(--color-surface);
  margin: 1rem;
  padding: 1rem;
  border-radius: var(--radius-lg);
  align-items: center;
  max-width: 340px;
}

.skills-box {
  border-radius: var(--radius-lg);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  min-height: 320px;
}

.skill-icon {
  font-size: 2rem;
  color: var(--color-text);
  transition: transform 0.3s ease, color 0.3s ease;
}

.skill-icon:hover {
  transform: scale(1.3);
}

.skill-item p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.skill-item {
  width: 100px;
}

@media (max-width: 768px) {
  .skills-section h2 {
    font-size: 2rem;
  }

  .skills-section h4 {
    font-size: 1.2rem;
  }

  .skill-icon {
    font-size: 2.3rem;
  }

  .skill-item {
    width: 80px;
  }

  .skills-box {
    padding: 1.5rem;
  }
}
```

- [ ] **Step 2: Verify no old colors remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#1c1c1c\|#2b2b2b\|#f8f9fa" src/components/Skills/Skill.css`
Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills/Skill.css
git commit -m "refactor: apply design tokens to Skills section"
```

---

### Task 6: `ProjectsSlider` — tokens, section divider, unified buttons

**Files:**
- Modify: `src/components/ProjectsSlider/ProjectsSlider.css` (full rewrite)
- Modify: `src/components/ProjectsSlider/ProjectsSlider.jsx:60-77`

- [ ] **Step 1: Replace `ProjectsSlider.css` contents**

```css
.projects-slider-section {
  background-color: var(--color-bg);
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.25);
}

.projects-slider-section .container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.TextContainer {
  color: var(--color-accent);
  font-weight: bold;
  font-size: 2.5rem;
  padding: 1rem;
  text-align: center;
}

.swiper-wrapper {
  display: flex;
}

.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
  min-height: 480px;
  max-height: 480px;
  border-radius: var(--radius-lg);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.project-card h4 {
  color: var(--color-text);
}

.project-card p {
  color: var(--color-text-muted);
}

.project-image img {
  max-height: 150px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.swiper-button-next,
.swiper-button-prev {
  color: var(--color-accent);
}

.swiper-pagination-bullet {
  background-color: #aaa;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  background-color: var(--color-accent);
  opacity: 1;
}

@media (max-width: 992px) {
  .TextContainer {
    font-size: 2rem;
  }

  .project-card {
    max-height: 450px;
  }

  .project-image img {
    max-height: 150px;
  }
}

@media (max-width: 768px) {
  .TextContainer {
    font-size: 1.8rem;
    padding: 0.5rem;
  }

  .project-card {
    max-height: 420px;
  }

  .project-image img {
    max-height: 120px;
  }
}

@media (max-width: 576px) {
  .project-card {
    max-height: 400px;
    padding: 0.5rem;
  }

  .project-image img {
    max-height: 100px;
  }

  .TextContainer {
    font-size: 1.6rem;
  }
}
```

- [ ] **Step 2: Replace the CTA buttons in `ProjectsSlider.jsx`**

Find (around line 60-77):

```jsx
                <div className="mb-0 d-flex justify-content-between align-items-center">
                  <a
                    href={repo.homepage || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 btn btn-sm btn-outline-light w-70"
                  >
                    Ver Projeto
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 btn btn-sm btn-outline-light w-70"
                  >
                    Ver no GitHub
                  </a>
                </div>
```

Replace with:

```jsx
                <div className="mb-0 d-flex justify-content-between align-items-center">
                  <a
                    href={repo.homepage || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Ver Projeto
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    Ver no GitHub
                  </a>
                </div>
```

- [ ] **Step 3: Verify no old colors or Bootstrap outline buttons remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#1c1c1c\|#2b2b2b\|btn-outline-light" src/components/ProjectsSlider/ProjectsSlider.css src/components/ProjectsSlider/ProjectsSlider.jsx`
Expected: no output

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSlider/ProjectsSlider.css src/components/ProjectsSlider/ProjectsSlider.jsx
git commit -m "refactor: apply design tokens and unified buttons to ProjectsSlider"
```

---

### Task 7: `ContactSection` — tokens, primary button

**Files:**
- Modify: `src/components/ContactSection/ContactSection.css` (full rewrite)
- Modify: `src/components/ContactSection/ContactSection.jsx:13-21`

- [ ] **Step 1: Replace `ContactSection.css` contents**

```css
.contact-section {
  background-color: var(--color-bg);
  padding: 2rem 1rem;
  min-height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.contact-section-title {
  color: var(--color-accent);
}

.contact-section h4,
.contact-section h6 {
  color: var(--color-text-muted);
}

.contact-section .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contact-section .btn-group .btn-primary {
  min-width: 200px;
  margin: 1rem;
}
```

- [ ] **Step 2: Update the download button in `ContactSection.jsx`**

Find (around line 13-21):

```jsx
        <div className="btn-group">
          <a
            href={cv}
            download
            className="btn btn-light"
          >
            Baixar Currículo
          </a>
        </div>
```

Replace with:

```jsx
        <div className="btn-group">
          <a
            href={cv}
            download
            className="btn-primary"
          >
            Baixar Currículo
          </a>
        </div>
```

- [ ] **Step 3: Verify no old colors remain**

Run: `grep -n "00fecb\|a6dac9\|646cff\|#1c1c1c\|#004745\|btn-light" src/components/ContactSection/ContactSection.css src/components/ContactSection/ContactSection.jsx`
Expected: no output

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactSection/ContactSection.css src/components/ContactSection/ContactSection.jsx
git commit -m "refactor: apply design tokens and unified button to ContactSection"
```

---

### Task 8: `Footer` — tokens

**Files:**
- Modify: `src/components/Footer/Footer.css` (full rewrite)

- [ ] **Step 1: Replace `Footer.css` contents**

```css
.footer-section {
  background-color: var(--color-surface);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  font-size: 1rem;
  text-align: center;
  min-height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-container {
  max-width: 1200px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-text {
  margin: 0;
  color: var(--color-text-muted);
}

.footer-links a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-accent);
}

@media (min-width: 600px) {
  .footer-container {
    flex-direction: row;
    justify-content: center;
  }
}
```

- [ ] **Step 2: Verify no old colors remain**

Run: `grep -n "001919\|#333" src/components/Footer/Footer.css`
Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer/Footer.css
git commit -m "refactor: apply design tokens to Footer"
```

---

### Task 9: Full-site verification

**Files:** none (verification only)

- [ ] **Step 1: Confirm no old colors remain anywhere in `src/`**

Run: `grep -rn "00fecb\|a6dac9\|646cff" src/`
Expected: no output (empty result). If anything is found, go back to the relevant task and fix it before continuing.

- [ ] **Step 2: Run a production build to catch any syntax errors**

Run: `npm run build`
Expected: build completes with no errors (exit code 0).

- [ ] **Step 3: Manually review the whole site**

Run: `npm run dev`, open the printed local URL in a browser, and check:
- Header nav highlights the correct section while scrolling (from Task 3).
- Hero, Sobre, Skills, Projetos, and Contato all share the same dark background with a faint green divider line between them, instead of one flat block.
- All CTAs ("Fale comigo", "Baixar Currículo", "Ver Projeto", "Ver no GitHub") share the same rounded-corner button style (green solid vs. outlined).
- The "Experiências Profissionais" list has no internal scrollbar and shows a timeline with markers.
- Resize the browser to mobile width (or use dev tools device toolbar) and confirm the mobile menu, timeline, and buttons still look correct at the 768px/992px/576px breakpoints.

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 4: Commit any final fixups found during manual review**

If Step 3 revealed issues, fix them in the relevant component file(s), then:

```bash
git add -A
git commit -m "fix: polish visual redesign after full-site review"
```

If no issues were found, skip this step (nothing to commit).
