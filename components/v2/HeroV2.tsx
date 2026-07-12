"use client";
import {useState} from "react"; import {useLocale,useTranslations} from "next-intl"; import {AnimatePresence,motion,useReducedMotion} from "framer-motion"; import {Apple,Check,ChevronDown,ClipboardList,SkipForward} from "lucide-react"; import type {Locale} from "../../i18n"; import {appStoreUrl} from "./app-store";

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

export default function HeroV2(){const t=useTranslations("v2"),locale=useLocale() as Locale,reduce=useReducedMotion();return <section className="v2-hero"><div className="hero-glow hero-glow-a"/><div className="hero-glow hero-glow-b"/><div className="v2-container relative grid min-h-[92svh] items-center gap-14 pb-20 pt-28 lg:grid-cols-[1.05fr_.95fr]">
 <div><div className="v2-kicker">{t("hero.kicker")}</div><h1 className="hero-title mt-6">{t("hero.h1")}</h1><p className="mt-6 max-w-xl text-base leading-[1.9] text-muted sm:text-lg">{t("hero.sub")}</p><div className="mt-8 flex flex-wrap items-center gap-3"><a href={appStoreUrl(locale)} target="_blank" rel="noreferrer" className="app-store-badge"><Apple fill="currentColor" size={27}/><span><small>Download on the</small><strong>App Store</strong></span></a><span className="soon-pill">{t("playSoon")}</span></div><p className="mt-5 text-sm font-bold text-muted">{t("hero.trust")}</p></div>
 <div className="relative mx-auto w-full max-w-[480px]"><div className="demo-label">{t("hero.demoLabel")}</div><FocusDemo/></div>
 <motion.a href="#statement" className="scroll-cue" animate={reduce?{}:{y:[0,8,0]}} transition={{duration:2,repeat:Infinity}}><span>{t("scroll")}</span><ChevronDown size={16}/></motion.a>
 </div></section>}
