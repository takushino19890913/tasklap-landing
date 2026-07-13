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

function IntroLayer(){
 const t=useTranslations("v2");
 const bubbles=t.raw("hero.bubbles") as string[];
 const [active,setActive]=useState(false);
 const [shown,setShown]=useState(0);            // 何個目の吹き出しまで出したか（bubbles.length+1 = 質問カード）
 const [phase,setPhase]=useState<"chat"|"no"|"leaving">("chat");
 useEffect(()=>{setActive(document.documentElement.hasAttribute("data-intro"))},[]);
 const reveal=useCallback(()=>{
  setPhase("leaving");
  setTimeout(()=>{const el=document.documentElement;el.removeAttribute("data-intro");el.setAttribute("data-intro-reveal","1");setActive(false)},480);
 },[]);
 useEffect(()=>{ // 吹き出し→質問カードの順次表示
  if(!active)return;
  const timers=bubbles.map((_,i)=>setTimeout(()=>setShown(s=>Math.max(s,i+1)),300+i*380));
  timers.push(setTimeout(()=>setShown(bubbles.length+1),300+bubbles.length*380+300));
  return()=>timers.forEach(clearTimeout);
 },[active,bubbles]);
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
 return <motion.div className="intro-overlay" initial={{opacity:1}} animate={{opacity:phase==="leaving"?0:1}} transition={{duration:.45,ease:"easeOut"}}>
  <div className="hero-glow hero-glow-a"/><div className="hero-glow hero-glow-b"/>
  <div className="intro-panel">
   {bubbles.map((b,i)=>
    <motion.div key={i} className={`intro-row${i%2?" is-right":""}`}
     initial={{opacity:0,y:18,scale:.7}}
     animate={i<shown?(phase==="leaving"?{opacity:0,y:-30,scale:.9,transition:{duration:.3,delay:i*.04}}:{opacity:1,y:0,scale:1,transition:{...spring,delay:0}}):{}}
    ><span className="intro-bubble" style={{transform:`rotate(${i%2?1.2:-1.2}deg)`}}>{b}</span></motion.div>)}
   <AnimatePresence mode="wait">
    {shown>bubbles.length&&phase==="chat"&&
     <motion.div key="q" className="intro-q" initial={{opacity:0,y:22,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-10,scale:.97}} transition={spring}>
      <p>{t("intro.question")}</p>
      <div className="intro-q-actions">
       <button className="intro-yes" onClick={reveal}>{t("intro.yes")}</button>
       <button className="intro-no" onClick={()=>setPhase("no")}>{t("intro.no")}</button>
      </div>
     </motion.div>}
    {phase==="no"&&
     <motion.div key="no" className="intro-q" initial={{opacity:0,y:22,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={spring}>
      <p className="intro-no-msg">{t("intro.noMsg")}</p>
      <div className="intro-q-actions"><button className="intro-yes" onClick={reveal}>{t("intro.noCta")}</button></div>
     </motion.div>}
   </AnimatePresence>
  </div>
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
