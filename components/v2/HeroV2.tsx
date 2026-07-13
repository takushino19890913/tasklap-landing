"use client";
import {useCallback,useEffect,useState} from "react"; import {useLocale,useTranslations} from "next-intl"; import {AnimatePresence,motion,useReducedMotion} from "framer-motion"; import {Apple,Check,ChevronDown,ClipboardList,SkipForward} from "lucide-react"; import type {Locale} from "../../i18n"; import {appStoreUrl} from "./app-store";

// ヒーロー右側は「フォーカスモード」の体験デモ（アプリの一画面一タスクUIを再現）
function FocusDemo(){
 const t=useTranslations("v2"),reduce=useReducedMotion();
 const tasks=t.raw("hero.demoTasks") as string[];
 const [idx,setIdx]=useState(0),[doneCount,setDoneCount]=useState(0);
 const total=tasks.length,finished=idx>=total,pct=Math.round(doneCount/total*100);
 const act=(complete:boolean)=>{if(complete)setDoneCount(c=>c+1);setIdx(i=>i+1)};
 return <div className="demo-card">
  <div className="mb-6 text-center">
   <p className="focus-count"><b>{doneCount}</b><span> / {total}</span></p>
   <p className="mt-1 text-sm font-bold text-muted">{pct}%</p>
  </div>
  <div className="focus-stage">
   <AnimatePresence mode="wait" initial={false}>
    {!finished
     ? <motion.div key={idx} initial={reduce?false:{opacity:0,x:32,scale:.97}} animate={{opacity:1,x:0,scale:1}} exit={reduce?undefined:{opacity:0,x:-32,scale:.97}} transition={{duration:reduce?0:.28,ease:[.22,.61,.36,1]}} className="focus-task">
        <span className="focus-task-icon"><ClipboardList size={22}/></span>
        <p>{tasks[idx]}</p>
       </motion.div>
     : <motion.div key="done" initial={reduce?false:{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{type:"spring",stiffness:320,damping:24}} className="focus-task focus-done">
        <span className="focus-task-icon done"><Check size={22}/></span>
        <p>{t("hero.demoDone")}</p>
        <button onClick={()=>{setIdx(0);setDoneCount(0)}}>{t("hero.reset")}</button>
       </motion.div>}
   </AnimatePresence>
  </div>
  {!finished&&<div className="focus-actions">
   <button className="focus-btn-skip" onClick={()=>act(false)}><SkipForward size={18}/>{t("hero.demoSkip")}</button>
   <button className="focus-btn-done" onClick={()=>act(true)}><Check size={18}/>{t("hero.demoComplete")}</button>
  </div>}
 </div>;
}

// イントロ: 悩み吹き出しがチャット風に積み上がる → 「そんな悩み、ありませんか？」に Yes/No で答える →
// Yes: 吹き出しを払ってヒーローへ / No: ユーモア返しから合流。
// 発火判定は app/layout.tsx の inline script（data-intro 属性・セッション1回・reduced-motion 除外）。
const spring={type:"spring",stiffness:420,damping:28} as const;

// 第一幕: 具体的な愚痴（チャット欄・ぽん…ぽん…とゆっくり）
const BUBBLE_LAYOUT=[
 {side:"l",inset:"0%",  gap:0,  rot:-1.8,scale:1.16,at:300},
 {side:"r",inset:"5%",  gap:6,  rot:1.1, scale:1,   at:1250},
 {side:"l",inset:"13%", gap:20, rot:-0.5,scale:.93, at:2050},
 {side:"r",inset:"0%",  gap:4,  rot:2.0, scale:1.05,at:2700},
 {side:"l",inset:"4%",  gap:24, rot:-1.2,scale:.96, at:3200},
 {side:"r",inset:"11%", gap:10, rot:0.7, scale:1,   at:3600},
] as const;
// 第二幕: 感情の決壊（画面のあちこちに、加速しながら割り込む）
const EMO_LAYOUT:{x:string;y:string;rot:number;scale:number;at:number;hot?:boolean}[]=[
 {x:"12%",y:"14%",rot:-7,scale:.9, at:3950},
 {x:"70%",y:"11%",rot:5, scale:.95,at:4250},
 {x:"5%", y:"46%",rot:4, scale:.9, at:4520},
 {x:"76%",y:"40%",rot:-5,scale:.85,at:4760},
 {x:"9%", y:"72%",rot:-4,scale:.95,at:4970},
 {x:"66%",y:"74%",rot:6, scale:.85,at:5160},
 {x:"40%",y:"8%", rot:-3,scale:.8, at:5330},
 {x:"58%",y:"60%",rot:8, scale:.8, at:5480},
 {x:"24%",y:"26%",rot:5, scale:.85,at:5610},
 {x:"82%",y:"58%",rot:-6,scale:.8, at:5725},
 {x:"16%",y:"58%",rot:3, scale:.8, at:5825},
 {x:"48%",y:"86%",rot:-5,scale:.85,at:5915},
 {x:"80%",y:"24%",rot:4, scale:.9, at:5995},
 {x:"30%",y:"68%",rot:-6,scale:.8, at:6070},
 {x:"60%",y:"30%",rot:7, scale:.78,at:6140},
 {x:"26%",y:"36%",rot:-3,scale:1.5,at:6280,hot:true}, // 最後に最大の叫び「Todoアプリなんて、もう嫌だ！」
];
const QUESTION_AT=7800; // 最後の叫びの余韻をしっかり残してから問いかけ

function IntroLayer(){
 const t=useTranslations("v2");
 const bubbles=t.raw("hero.bubbles") as string[];
 const emos=t.raw("hero.bubblesEmo") as string[];
 const [active,setActive]=useState(false);
 const [shown,setShown]=useState(0);        // 具体的な愚痴の表示数
 const [emoShown,setEmoShown]=useState(0);  // 感情吹き出しの表示数
 const [phase,setPhase]=useState<"flood"|"ask"|"no"|"bridge"|"leaving">("flood");
 useEffect(()=>{setActive(document.documentElement.hasAttribute("data-intro"))},[]);
 const reveal=useCallback(()=>{
  setPhase("leaving");
  setTimeout(()=>{const el=document.documentElement;el.removeAttribute("data-intro");el.setAttribute("data-intro-reveal","1");setActive(false)},480);
 },[]);
 useEffect(()=>{ // ぽん…ぽん…→ポポポと加速するタイムライン
  if(!active)return;
  const timers=bubbles.map((_,i)=>setTimeout(()=>setShown(s=>Math.max(s,i+1)),(BUBBLE_LAYOUT[i]||BUBBLE_LAYOUT[0]).at));
  emos.forEach((_,i)=>timers.push(setTimeout(()=>setEmoShown(s=>Math.max(s,i+1)),(EMO_LAYOUT[i]||EMO_LAYOUT[0]).at)));
  timers.push(setTimeout(()=>setPhase(p=>p==="flood"?"ask":p),QUESTION_AT));
  return()=>timers.forEach(clearTimeout);
  // t.raw() は毎レンダーで新配列を返すため、配列そのものを deps に入れるとタイマーが張り直され続ける
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[active,bubbles.length,emos.length]);
 useEffect(()=>{ // スクロール/Escで即スキップ
  if(!active)return;
  const skip=()=>reveal();
  const key=(e:KeyboardEvent)=>{if(e.key==="Escape")skip()};
  addEventListener("wheel",skip,{once:true,passive:true});
  addEventListener("touchmove",skip,{once:true,passive:true});
  addEventListener("keydown",key);
  return()=>{removeEventListener("wheel",skip);removeEventListener("touchmove",skip);removeEventListener("keydown",key)};
 },[active,reveal]);
 if(!active)return null;
 const asking=phase==="ask"||phase==="no";
 const sweeping=phase==="bridge"||phase==="leaving";
 return <motion.div className="intro-overlay" initial={{opacity:1}} animate={{opacity:phase==="leaving"?0:1}} transition={{duration:.45,ease:"easeOut"}}>
  <div className="hero-glow hero-glow-a"/><div className="hero-glow hero-glow-b"/>
  {/* 第一幕: 具体的な愚痴（問いかけ時は薄く残す） */}
  <div className="intro-panel">
   {bubbles.map((b,i)=>{const L=BUBBLE_LAYOUT[i]||BUBBLE_LAYOUT[0];
    return <motion.div key={i} className={`intro-row${L.side==="r"?" is-right":""}`}
     style={{marginTop:L.gap,[L.side==="r"?"paddingRight":"paddingLeft"]:L.inset} as React.CSSProperties}
     initial={{opacity:0,y:18,scale:.7}}
     animate={i<shown?(sweeping?{opacity:0,y:-30,scale:.9,transition:{duration:.3,delay:i*.04}}:{opacity:1,y:0,scale:1,transition:spring}):{}}
    ><span className="intro-bubble" style={{transform:`rotate(${L.rot}deg)`,"--bsc":L.scale} as React.CSSProperties}>{b}</span></motion.div>;})}
  </div>
  {/* 第二幕: 感情の決壊（問いかけ時にはすっと消える） */}
  {emos.map((b,i)=>{const E=EMO_LAYOUT[i]||EMO_LAYOUT[0];
   return <motion.div key={`e${i}`} className={`intro-emo emo-${i}${E.hot?" is-hot":""}`}
    style={{"--ex":E.x,"--ey":E.y} as React.CSSProperties}
    initial={{opacity:0,y:14,scale:.5}}
    animate={i<emoShown?(sweeping?{opacity:0,scale:.6,transition:{duration:.22,delay:i*.02}}:asking?{opacity:E.hot?1:.55,y:0,scale:1,transition:{duration:.4}}:{opacity:1,y:0,scale:1,transition:{type:"spring",stiffness:520,damping:24}}):{}}
   ><span className="intro-bubble" style={{transform:`rotate(${E.rot}deg)`,"--bsc":E.scale} as React.CSSProperties}>{b}</span></motion.div>;})}
  {/* 第三幕: 問いかけ */}
  <AnimatePresence mode="wait">
   {phase==="ask"&&
    <div className="intro-ask" key="ask"><motion.div drag dragMomentum={false} className="intro-q" initial={{opacity:0,y:26,scale:.92}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:.97}} transition={spring}>
     <div className="intro-q-inner">
      <p>{t("intro.question")}</p>
      <div className="intro-q-actions">
       <button className="intro-yes" onClick={()=>{setPhase("bridge");setTimeout(reveal,3200)}}>{t("intro.yes")}</button>
       <button className="intro-no" onClick={()=>setPhase("no")}>{t("intro.no")}</button>
      </div>
      <p className="intro-drag-hint">{t("intro.dragHint")}</p>
     </div>
    </motion.div></div>}
   {phase==="no"&&
    <div className="intro-ask" key="no"><motion.div drag dragMomentum={false} className="intro-q" initial={{opacity:0,y:26,scale:.92}} animate={{opacity:1,y:0,scale:1}} transition={spring}>
     <div className="intro-q-inner">
      <p className="intro-no-msg">{t("intro.noMsg")}</p>
      <div className="intro-q-actions"><button className="intro-yes" onClick={reveal}>{t("intro.noCta")}</button></div>
      <p className="intro-drag-hint">{t("intro.dragHint")}</p>
     </div>
    </motion.div></div>}
   {phase==="bridge"&&
    <div className="intro-ask" key="bridge"><motion.p className="intro-bridge" initial={{opacity:0,scale:.82,y:26}} animate={{opacity:1,scale:1,y:0}} transition={{type:"spring",stiffness:300,damping:22}}>
     <span className="block">{t("intro.bridgeTop")}</span><span className="block bridge-em">{t("intro.bridgeBottom")}</span>
    </motion.p></div>}
  </AnimatePresence>
 </motion.div>;
}

const late=(s:number)=>({"--ld":`${s}s`} as React.CSSProperties);

export default function HeroV2(){const t=useTranslations("v2"),locale=useLocale() as Locale,reduce=useReducedMotion();const em=t("hero.h1Em");return <section className="v2-hero"><div className="hero-glow hero-glow-a"/><div className="hero-glow hero-glow-b"/><IntroLayer/><div className="v2-container relative grid min-h-[92svh] items-center gap-14 pb-20 pt-28 lg:grid-cols-[1.05fr_.95fr]">
 <div>
  <div className="v2-kicker intro-late" style={late(.05)}>{t("hero.kicker")}</div>
  <h1 className="hero-title mt-6 intro-late" style={late(.14)}>
   <span className={`block ${em==="top"?"text-v2-accent":""}`}>{t("hero.h1Top")}</span>
   <span className={`block ${em==="bottom"?"text-v2-accent":""}`}>{t("hero.h1Bottom")}</span>
  </h1>
  <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted sm:text-lg intro-late" style={late(.26)}>{t("hero.sub")}</p>
  <div className="mt-8 flex flex-wrap items-center gap-3 intro-late" style={late(.34)}><a href={appStoreUrl(locale)} target="_blank" rel="noreferrer" className="app-store-badge"><Apple fill="currentColor" size={27}/><span><small>Download on the</small><strong>App Store</strong></span></a><span className="soon-pill">{t("playSoon")}</span></div>
  <p className="mt-5 text-sm font-bold text-muted intro-late" style={late(.4)}>{t("hero.trust")}</p>
 </div>
 <div className="relative mx-auto w-full max-w-[480px] intro-late" style={late(.3)}><div className="demo-label">{t("hero.demoLabel")}</div><FocusDemo/></div>
 <motion.a href="#statement" className="scroll-cue intro-late" style={late(.55)} animate={reduce?{}:{y:[0,8,0]}} transition={{duration:2,repeat:Infinity}}><span>{t("scroll")}</span><ChevronDown size={16}/></motion.a>
 </div></section>}
