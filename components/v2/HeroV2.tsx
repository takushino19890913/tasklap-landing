"use client";
import {useEffect,useState} from "react"; import {useLocale,useTranslations} from "next-intl"; import {AnimatePresence,motion,useReducedMotion} from "framer-motion"; import {Apple,Check,ChevronDown,ClipboardList,SkipForward} from "lucide-react"; import type {Locale} from "../../i18n"; import {appStoreUrl} from "./app-store";

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

// イントロ演出: 悩み吹き出しが順に湧く → 一斉に消える → 「そんなあなたに、」→ 本体コピーが立ち上がる。
// 発火判定は app/layout.tsx の inline script（data-intro属性・セッション1回・reduced-motion除外）。
const BUBBLE_POS=[
 {x:32,y:5,d:.2,r:-2,s:1.3},   // 1個目=リード（大きめ・中央上）
 {x:6,y:26,d:.6,r:-5,s:1},
 {x:60,y:22,d:.9,r:3,s:1},
 {x:20,y:48,d:1.2,r:2,s:.95},
 {x:66,y:52,d:1.45,r:-3,s:1.05},
 {x:10,y:70,d:1.7,r:4,s:.95},
 {x:44,y:76,d:1.9,r:-2,s:1},
];

function IntroLayer(){
 const t=useTranslations("v2");
 const bubbles=t.raw("hero.bubbles") as string[];
 useEffect(()=>{
  const el=document.documentElement;
  if(!el.hasAttribute("data-intro"))return;
  const done=()=>el.removeAttribute("data-intro");
  const tm=setTimeout(done,5000);
  const skip=()=>{clearTimeout(tm);done()};
  const opts={once:true} as const;
  addEventListener("pointerdown",skip,opts);
  addEventListener("wheel",skip,{once:true,passive:true});
  addEventListener("keydown",skip,opts);
  return()=>{clearTimeout(tm);removeEventListener("pointerdown",skip);removeEventListener("wheel",skip);removeEventListener("keydown",skip)};
 },[]);
 return <div className="intro-bubbles" aria-hidden="true">
  {bubbles.map((b,i)=>{const p=BUBBLE_POS[i]||BUBBLE_POS[0];
   return <div key={i} className="b-out" style={{"--bx":`${p.x}%`,"--by":`${p.y}%`,"--bd":`${p.d}s`,"--br":p.r,"--bs":p.s} as React.CSSProperties}>
    <div className="b-pop"><span className="intro-bubble">{b}</span></div>
   </div>;})}
  <div className="intro-interstitial">{t("hero.interstitial")}</div>
 </div>;
}

const late=(s:number)=>({"--ld":`${s}s`} as React.CSSProperties);

export default function HeroV2(){const t=useTranslations("v2"),locale=useLocale() as Locale,reduce=useReducedMotion();return <section className="v2-hero"><div className="hero-glow hero-glow-a"/><div className="hero-glow hero-glow-b"/><IntroLayer/><div className="v2-container relative grid min-h-[92svh] items-center gap-14 pb-20 pt-28 lg:grid-cols-[1.05fr_.95fr]">
 <div>
  <div className="v2-kicker intro-late" style={late(3.55)}>{t("hero.kicker")}</div>
  <h1 className="hero-title mt-6 intro-late" style={late(3.65)}>{t("hero.h1")}</h1>
  <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted sm:text-lg intro-late" style={late(3.8)}>{t("hero.sub")}</p>
  <div className="mt-8 flex flex-wrap items-center gap-3 intro-late" style={late(3.9)}><a href={appStoreUrl(locale)} target="_blank" rel="noreferrer" className="app-store-badge"><Apple fill="currentColor" size={27}/><span><small>Download on the</small><strong>App Store</strong></span></a><span className="soon-pill">{t("playSoon")}</span></div>
  <p className="mt-5 text-sm font-bold text-muted intro-late" style={late(3.95)}>{t("hero.trust")}</p>
 </div>
 <div className="relative mx-auto w-full max-w-[480px] intro-late" style={late(3.85)}><div className="demo-label">{t("hero.demoLabel")}</div><FocusDemo/></div>
 <motion.a href="#statement" className="scroll-cue intro-late" style={late(4.2)} animate={reduce?{}:{y:[0,8,0]}} transition={{duration:2,repeat:Infinity}}><span>{t("scroll")}</span><ChevronDown size={16}/></motion.a>
 </div></section>}
