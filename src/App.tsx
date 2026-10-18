import { useEffect, useState } from "react";

type Page = "home" | "quemSomos" | "proposta" | "tecnologia" | "contato" | "solucoes" | "komvos" | "pop9" | "komm";
const groups = [
  { title: "Engenharia & Desenvolvimento", items: ["Desenvolvimento", "APIs", "Banco de dados", "Redes", "Soluções personalizadas"] },
  { title: "Inteligência Artificial & Automação", items: ["IA", "Automações", "Agentes de IA e bots"] },
  { title: "Dados & Inteligência Analítica", items: ["Data Science", "Insights e predições"] },
  { title: "Growth & Marketing", items: ["Gestão de tráfego", "Marketing digital", "Growth"] },
  { title: "Inteligência de Mercado", items: ["Market Prospect"] }
];
const links: { id: Page; label: string; code: string }[] = [
  { id: "quemSomos", label: "Quem somos", code: 'const quemSomos = "inteligência aplicada";' },
  { id: "proposta", label: "Proposta", code: 'const proposta = "crescimento conectado";' },
  { id: "tecnologia", label: "Tecnologia", code: 'const tecnologia = ["AI", "Data", "Growth"];' },
  { id: "contato", label: "Contato", code: 'const contato = "vamos conversar";' },
  { id: "solucoes", label: "Soluções", code: "const nossasSolucoes = [...];" }
];
const descriptions: Record<Page, { heading: string; sub: string }> = {
 home: { heading: "", sub: "" },
 quemSomos: { heading: "Inteligência em movimento.", sub: "A NØUS conecta engenharia, dados, criatividade e estratégia para transformar desafios em evolução real." },
 proposta: { heading: "Crescimento por design.", sub: "Da descoberta à implementação: conectamos produto, dados e mercado para gerar resultados mensuráveis." },
 tecnologia: { heading: "Arquitetura para evoluir.", sub: "RAG, GraphRAG, JEV, agentes autônomos, MCP, LLMs, bancos vetoriais, MLOps e engenharia de contexto." },
 contato: { heading: "Vamos construir o próximo passo.", sub: "Conte o que sua empresa precisa. Vamos conversar sobre possibilidades." },
 solucoes: { heading: "Soluções que conectam.", sub: "Uma estrutura multidisciplinar para resolver problemas reais." },
 komvos: { heading: "KømVøS", sub: "Uma experiência conectada de tecnologia, relacionamento e inteligência." },
 pop9: { heading: "PØP9", sub: "Gestão inteligente de pedidos e operações." },
 komm: { heading: "KØMM", sub: "Gestão de bares e operações com clareza e agilidade." }
};
function KomvosMark() { return <svg viewBox="0 0 170 110" role="img" aria-label="Símbolo de conexões KømVøS"><defs><linearGradient id="k" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#24D3ED"/><stop offset=".55" stopColor="#347FEA"/><stop offset="1" stopColor="#9160DF"/></linearGradient></defs><g stroke="url(#k)" strokeWidth="8" strokeLinecap="round" fill="none"><path d="M22 53L65 19L111 49L153 18M22 53L67 89L111 49L153 88M65 19L67 89M153 18L153 88"/></g><g fill="#fff" stroke="url(#k)" strokeWidth="7"><circle cx="22" cy="53" r="10"/><circle cx="65" cy="19" r="10"/><circle cx="67" cy="89" r="10"/><circle cx="111" cy="49" r="10"/><circle cx="153" cy="18" r="10"/><circle cx="153" cy="88" r="10"/></g></svg> }
export default function App() {
 const [page, setPage] = useState<Page>("home");
 const [intro, setIntro] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 const [sent, setSent] = useState(false);
 useEffect(() => { if (!intro) return; const timer = window.setTimeout(() => setIntro(false), 5100); return () => clearTimeout(timer); }, [intro]);
 const navigate = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
 return <div className="app">
  {intro && <div className="intro"><div className="intro-logo">N<span className="o">Ø</span>US<span className="accent">/</span></div><div className="type-line">Conecte. Entenda. Evolua.<span className="cursor">_</span></div><button className="skip" onClick={() => setIntro(false)}>Pular introdução ↗</button></div>}
  <header className="header"><button className="wordmark" onClick={() => navigate("home")} aria-label="Ir para a página inicial">N<span>Ø</span>US<span className="orange">/</span></button><span className="header-caption">TECHNOLOGY × INTELLIGENCE × GROWTH</span><button className="menu-contact" onClick={() => navigate("contato")}>Vamos conversar ↗</button></header>
  <main>
  {page === "home" ? <>
   <section className="hero cinematic-hero">
     <div className="hero-stage" aria-hidden="true">
       <div className="stage-grid"/><div className="stage-halo"/>
       <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
       <div className="float-panel code-panel"><div className="float-top"><i/><i/><i/><span>src / intelligence.ts</span></div><pre>{`import { innovation } from "nous";

const future = connect({
  technology: true,
  people: true,
  growth: "∞"
});

await future.evolve();`}</pre></div>
       <div className="float-panel tree-panel"><div className="float-top"><i/><i/><i/><span>EXPLORER</span></div><pre>{`▾ NØUS
  ▾ src
    ◇ components
    ◇ experiences
    ◇ intelligence
  ◇ products
  ◇ innovation.ts`}</pre></div>
       <div className="float-panel terminal-panel"><div className="float-top"><i/><i/><i/><span>TERMINAL</span></div><pre>{`› npm run evolve
✓ Connecting systems
✓ Intelligence online
✓ Future is ready_`}</pre></div>
       <div className="float-panel data-panel"><span>GROWTH / ANALYTICS</span><div className="chart-bars"><b/><b/><b/><b/><b/><b/><b/></div></div>
       <span className="circuit-label label-one">dev_</span><span className="circuit-label label-two">analytics_</span><span className="circuit-label label-three">growth_</span>
     </div>
     <div className="hero-brand">
       <div className="brand-symbol" aria-hidden="true"><svg viewBox="0 0 220 190"><defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b2549"/><stop offset=".48" stopColor="#21466d"/><stop offset="1" stopColor="#061832"/></linearGradient></defs><path d="M34 135V61L105 17L187 68V130L119 171L35 120" fill="none" stroke="url(#metal)" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round"/><path d="M61 103L117 65L169 111" fill="none" stroke="url(#metal)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
       <div className="hero-wordmark">N<span className="hero-o">Ø</span>US</div>
       <div className="hero-tagline">CONECTE. ENTENDA. EVOLUA.<span className="cursor">_</span></div>
       <p>Engenharia, inteligência e crescimento em uma nova dimensão.</p>
       <button className="discover" onClick={() => document.getElementById("experiencias")?.scrollIntoView({behavior:"smooth"})}>EXPLORAR EXPERIÊNCIAS <span>↘</span></button>
     </div>
     <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><span>NØUS / DIGITAL EXPERIENCE — 2026</span></div>
   </section>
   <section id="experiencias" className="windows" aria-label="Nossos produtos"><button className="window products-window" onClick={() => navigate("pop9")}><div className="window-bar"><span className="dots">● ● ●</span><span>PRODUCTS_</span><span>↗</span></div><div className="product-grid"><div className="product-mini"><strong>PØP9<span className="orange">.</span></strong><small>ORDER MANAGEMENT</small><span className="mini-graph">▂ ▃ ▅ ▄ ▇ ▆ █</span></div><div className="product-mini"><strong>KØMM<span className="orange">.</span></strong><small>BAR OPERATIONS</small><span className="mini-bars">▌ ▌ ▌ ▌</span></div></div><div className="window-footer">EXPLORE PRODUCTS <span>↗</span></div></button><button className="window komvos-window" onClick={() => navigate("komvos")}><div className="window-bar"><span className="dots">● ● ●</span><span>KØMVØS / FLAGSHIP</span><span>↗</span></div><div className="komvos-content"><KomvosMark/><strong>KømVøS</strong><span>CONNECTED INTELLIGENCE</span></div><div className="window-footer">EXPLORE THE EXPERIENCE <span>↗</span></div></button></section>
   <section className="navigation-code"><div className="section-label">01 / EXPLORE NØUS</div><h2>Explore o que<br/>nos move<span className="orange">.</span></h2><div className="code-links">{links.map((link, i) => <button key={link.id} onClick={() => navigate(link.id)}><span className="line-number">{String(i + 1).padStart(2, "0")}</span><code>{link.code}</code><span className="arrow">↗</span></button>)}</div></section>
  </> : <section className="inner-page"><button className="back" onClick={() => navigate("home")}>← Voltar ao início</button><div className="section-label">NØUS / {page.toUpperCase()}</div><h1>{descriptions[page].heading}</h1><p>{descriptions[page].sub}</p>{page === "solucoes" && <div className="group-grid">{groups.map((group, i) => <article className="group" key={group.title}><span>0{i + 1}</span><h2>{group.title}</h2><p>{group.items.join(" · ")}</p></article>)}</div>}{page === "tecnologia" && <div className="tech-grid">{["RAG + GraphRAG","Agentes & multiagentes","MCP + integrações","Dados vetoriais","MLOps / LLMOps","Modelos generativos"].map(x => <div key={x} className="tech-node">{x}</div>)}</div>}{page === "contato" && <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}><label>Seu nome<input required name="nome" placeholder="Como podemos chamar você?"/></label><label>Seu e-mail<input required name="email" type="email" placeholder="voce@empresa.com"/></label><label>Seu projeto<textarea required name="mensagem" rows={4} placeholder="O que você quer construir?"/></label><button type="submit">Preparar contato ↗</button>{sent && <p role="status">Formulário demonstrativo: envio ao backend ainda não configurado. Nenhuma mensagem foi enviada.</p>}</form>}{page === "komvos" && <div className="product-showcase"><KomvosMark/><strong>KømVøS</strong></div>}{(page === "pop9" || page === "komm") && <div className="product-showcase dark"><strong>{page === "pop9" ? "PØP9" : "KØMM"}<span className="orange">.</span></strong></div>}</section>}
  </main><footer><span>NØUS © {new Date().getFullYear()}</span><span>Conecte. Entenda. Evolua.</span><button onClick={() => { navigate("home"); setIntro(true); }}>Rever introdução ↗</button></footer>
 </div>;
}
