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
   <section className="hero"><div className="eyebrow"><span className="live-dot"/> UMA NOVA FORMA DE EVOLUIR</div><h1>Conecte.<br/>Entenda.<br/><em>Evolua.</em></h1><p>Tecnologia e inteligência aplicada ao crescimento dos negócios.</p><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="code-ghost ghost-one">const future = build(ideas);<br/>await intelligence.connect();<br/>growth.scale(∞);</div><div className="code-ghost ghost-two">src/components/<br/>├── App.tsx<br/>└── intelligence.ts</div></section>
   <section className="windows" aria-label="Nossos produtos"><button className="window products-window" onClick={() => navigate("pop9")}><div className="window-bar"><span className="dots">● ● ●</span><span>PRODUCTS_</span><span>↗</span></div><div className="product-grid"><div className="product-mini"><strong>PØP9<span className="orange">.</span></strong><small>ORDER MANAGEMENT</small><span className="mini-graph">▂ ▃ ▅ ▄ ▇ ▆ █</span></div><div className="product-mini"><strong>KØMM<span className="orange">.</span></strong><small>BAR OPERATIONS</small><span className="mini-bars">▌ ▌ ▌ ▌</span></div></div><div className="window-footer">EXPLORE PRODUCTS <span>↗</span></div></button><button className="window komvos-window" onClick={() => navigate("komvos")}><div className="window-bar"><span className="dots">● ● ●</span><span>KØMVØS / FLAGSHIP</span><span>↗</span></div><div className="komvos-content"><KomvosMark/><strong>KømVøS</strong><span>CONNECTED INTELLIGENCE</span></div><div className="window-footer">EXPLORE THE EXPERIENCE <span>↗</span></div></button></section>
   <section className="navigation-code"><div className="section-label">01 / EXPLORE NØUS</div><h2>Explore o que<br/>nos move<span className="orange">.</span></h2><div className="code-links">{links.map((link, i) => <button key={link.id} onClick={() => navigate(link.id)}><span className="line-number">{String(i + 1).padStart(2, "0")}</span><code>{link.code}</code><span className="arrow">↗</span></button>)}</div></section>
  </> : <section className="inner-page"><button className="back" onClick={() => navigate("home")}>← Voltar ao início</button><div className="section-label">NØUS / {page.toUpperCase()}</div><h1>{descriptions[page].heading}</h1><p>{descriptions[page].sub}</p>{page === "solucoes" && <div className="group-grid">{groups.map((group, i) => <article className="group" key={group.title}><span>0{i + 1}</span><h2>{group.title}</h2><p>{group.items.join(" · ")}</p></article>)}</div>}{page === "tecnologia" && <div className="tech-grid">{["RAG + GraphRAG","Agentes & multiagentes","MCP + integrações","Dados vetoriais","MLOps / LLMOps","Modelos generativos"].map(x => <div key={x} className="tech-node">{x}</div>)}</div>}{page === "contato" && <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}><label>Seu nome<input required name="nome" placeholder="Como podemos chamar você?"/></label><label>Seu e-mail<input required name="email" type="email" placeholder="voce@empresa.com"/></label><label>Seu projeto<textarea required name="mensagem" rows={4} placeholder="O que você quer construir?"/></label><button type="submit">Preparar contato ↗</button>{sent && <p role="status">Formulário demonstrativo: envio ao backend ainda não configurado. Nenhuma mensagem foi enviada.</p>}</form>}{page === "komvos" && <div className="product-showcase"><KomvosMark/><strong>KømVøS</strong></div>}{(page === "pop9" || page === "komm") && <div className="product-showcase dark"><strong>{page === "pop9" ? "PØP9" : "KØMM"}<span className="orange">.</span></strong></div>}</section>}
  </main><footer><span>NØUS © {new Date().getFullYear()}</span><span>Conecte. Entenda. Evolua.</span><button onClick={() => { navigate("home"); setIntro(true); }}>Rever introdução ↗</button></footer>
 </div>;
}
