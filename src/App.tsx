import { useState } from "react";
type Page = "home" | "pop9" | "komm" | "komvos" | "quemSomos" | "proposta" | "tecnologia" | "solucoes" | "contato";
const links: {page:Page;code:string}[] = [
 {page:"quemSomos",code:'const quemSomos = "inteligência aplicada";'},
 {page:"proposta",code:'const proposta = "crescimento conectado";'},
 {page:"tecnologia",code:'const tecnologia = ["AI", "Data", "Growth"];'},
 {page:"solucoes",code:'const nossasSolucoes = [...];'},
 {page:"contato",code:'const contato = "vamos conversar";'}
];
const areas = [
 {name:"Engenharia & Desenvolvimento",icon:"</>",color:"blue"},
 {name:"IA & Automação",icon:"✳",color:"orange"},
 {name:"Dados & Inteligência Analítica",icon:"▥",color:"cyan"},
 {name:"Growth & Marketing",icon:"↗",color:"orange"},
 {name:"Inteligência de Mercado",icon:"◎",color:"blue"}
];
const copy: Record<Page,[string,string]> = {
 home:["",""],pop9:["PØP9","Gestão inteligente de pedidos e operações."],
 komm:["KØMM","Gestão de bares e operações com clareza."],
 komvos:["KømVøS","Tecnologia, relacionamento e inteligência conectados."],
 quemSomos:["Inteligência aplicada.","Conectamos pessoas, processos e tecnologia."],
 proposta:["Crescimento conectado.","Engenharia, estratégia e evolução mensurável."],
 tecnologia:["Tecnologia que evolui.","RAG, GraphRAG, JEV, agentes, MCP, LLMs e dados."],
 solucoes:["Soluções que conectam.","Desenvolvimento, automação, dados, growth e inteligência de mercado."],
 contato:["Vamos conversar.","Conte o que você quer construir."]
};
function Mark(){return <span className="mark">N<span>Ø</span>US<b>/</b></span>}
function Network(){return <svg className="network" viewBox="0 0 180 115" aria-hidden="true"><defs><linearGradient id="n" x2="1" y2="1"><stop stopColor="#21d5eb"/><stop offset=".55" stopColor="#3484ed"/><stop offset="1" stopColor="#9160df"/></linearGradient></defs><path d="M20 55 67 17 113 53 160 20M20 55 67 97 113 53 160 95M67 17 67 97M160 20 160 95" stroke="url(#n)" strokeWidth="6" fill="none"/>{[[20,55],[67,17],[113,53],[160,20],[67,97],[160,95]].map(([cx,cy])=><circle key={cx+"-"+cy} cx={cx} cy={cy} r="9" fill="#fff" stroke="url(#n)" strokeWidth="5"/>)}</svg>}
export default function App(){
 const [page,setPage]=useState<Page>("home");
 const [intro,setIntro]=useState(false);
 const [sent,setSent]=useState(false);
 const navigate=(p:Page)=>{const go=()=>{setPage(p);window.scrollTo(0,0)};const d=document as Document & {startViewTransition?:(cb:()=>void)=>unknown};if(d.startViewTransition&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.startViewTransition(go);else go()};
 return <div className="app">
 {intro&&<div className="intro"><Mark/><p>Conecte. Entenda. Evolua.<span className="cursor">_</span></p><button onClick={()=>setIntro(false)}>Entrar ↗</button></div>}
 <header><button className="logo" onClick={()=>navigate("home")} aria-label="NØUS — voltar à página inicial"><Mark/></button><span className="header-note">TECHNOLOGY × INTELLIGENCE × GROWTH</span><button className="header-link" onClick={()=>navigate("contato")}>Vamos conversar ↗</button></header>
 <main>{page==="home"?<>
 <section className="hero"><div className="watermark" aria-hidden="true"><Mark/></div><div className="hero-copy"><span className="overline">NØUS / DIGITAL EXPERIENCE</span><h1>Conecte.<br/>Entenda.<br/><em>Evolua.</em></h1><p>Engenharia, inteligência e crescimento em uma nova dimensão.</p><button className="explore" onClick={()=>document.getElementById("produtos")?.scrollIntoView({behavior:"smooth"})}>EXPLORAR EXPERIÊNCIAS ↘</button></div><div className="ambient-tech" aria-hidden="true"><span className="tech-icon t1">⌘</span><span className="tech-icon t2">{"{ }"}</span><span className="tech-icon t3">▥</span><span className="tech-icon t4">↗</span><span className="tech-icon t5">◎</span><span className="tech-icon t6">◈</span></div><div className="cursor-label">const future = "NØUS";<span className="cursor">_</span></div></section>
 <section className="windows" id="produtos" aria-label="Produtos NØUS"><div className="products-window window"><div className="window-head">PRODUCTS_ <span>↗</span></div><div className="product-options"><button onClick={()=>navigate("pop9")} className="mini-product pop"><span className="flame">✦</span><strong>PØP9</strong><small>ORDER MANAGEMENT</small></button><button onClick={()=>navigate("komm")} className="mini-product komm"><span className="bars">▮▮▮</span><strong>KØMM</strong><small>BAR OPERATIONS</small></button></div></div><button className="window komvos-window" onClick={()=>navigate("komvos")}><div className="window-head">KØMVØS / FLAGSHIP <span>↗</span></div><div className="komvos-center"><Network/><strong>KømVøS</strong><small>CONNECTED INTELLIGENCE</small></div></button></section>
 <section className="code-nav"><span className="overline">01 / EXPLORE NØUS</span><h2>Explore o que<br/>nos move<span className="orange">.</span></h2>{links.map((link,i)=><button className="code-link" key={link.page} onClick={()=>navigate(link.page)}><span className="number">0{i+1}</span><code>{link.code}</code><span>↗</span></button>)}</section>
 <section className="areas"><span className="overline">02 / ÁREAS DE ATUAÇÃO</span><h2>Inteligência em cada conexão<span className="orange">.</span></h2><div className="area-grid">{areas.map(a=><button key={a.name} className={"area "+a.color} onClick={()=>navigate("solucoes")}><span className="area-icon">{a.icon}</span><strong>{a.name}</strong><span className="area-arrow">↗</span></button>)}</div></section>
 </>:<section className={"inner inner-"+page}><span className="overline">NØUS / {page.toUpperCase()}</span><h1>{copy[page][0]}</h1><p>{copy[page][1]}</p>{page==="komvos"&&<div className="showcase showcase-komvos"><Network/></div>}{(page==="pop9"||page==="komm")&&<div className={"showcase showcase-"+page}><strong>{copy[page][0]}<span className="orange">.</span></strong></div>}{page==="solucoes"&&<div className="area-grid">{areas.map(a=><div className={"area "+a.color} key={a.name}><span className="area-icon">{a.icon}</span><strong>{a.name}</strong></div>)}</div>}{page==="tecnologia"&&<div className="tags">{["RAG","GraphRAG","JEV","Agentes de IA","MCP","LLMs","MLOps","Bancos vetoriais"].map(t=><span key={t}>{t}</span>)}</div>}{page==="contato"&&<form className="contact" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Nome<input required placeholder="Seu nome"/></label><label>E-mail<input required type="email" placeholder="voce@empresa.com"/></label><label>Projeto<textarea required placeholder="Conte sobre seu projeto"/></label><button>Preparar contato ↗</button>{sent&&<p role="status">Formulário demonstrativo. Nenhuma mensagem foi enviada.</p>}</form>}<button className="return" onClick={()=>navigate("home")} aria-label="Voltar à Home pela marca NØUS"><Mark/></button></section>}</main>
 <footer><span>NØUS © {new Date().getFullYear()}</span><span>Conecte. Entenda. Evolua.</span><button onClick={()=>{navigate("home");setIntro(true)}}>Rever introdução ↗</button></footer>
 </div>
}