"use client";
import Image from "next/image"; import Link from "next/link"; import {Globe, Moon, Sun} from "lucide-react";
import {useEffect,useState} from "react"; import {useLocale,useTranslations} from "next-intl"; import {usePathname,useRouter} from "next/navigation"; import {useTheme} from "next-themes";
import {locales,type Locale} from "../../i18n"; import {appStoreUrl} from "./app-store";
export default function SiteHeader(){
 const locale=useLocale() as Locale,t=useTranslations("v2"),router=useRouter(),path=usePathname(),{resolvedTheme,setTheme}=useTheme(); const [glass,setGlass]=useState(false); const [mounted,setMounted]=useState(false);
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{let raf=0;const on=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>setGlass(scrollY>24))};on();addEventListener("scroll",on,{passive:true});return()=>{removeEventListener("scroll",on);cancelAnimationFrame(raf)}},[]);
 const change=(e:React.ChangeEvent<HTMLSelectElement>)=>{const parts=path.split("/");parts[1]=e.target.value;router.push(parts.join("/")||`/${e.target.value}`)};
 return <header className={`v2-header ${glass?"is-glass":""}`}><div className="v2-container flex h-[72px] items-center justify-between gap-3">
  <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0" aria-label="TaskLap home"><Image src="/app_icon_transparent_128x128.png" width={42} height={42} alt="" priority/><span className="font-manrope text-xl font-extrabold">TaskLap</span></Link>
  <nav className="hidden md:flex items-center gap-8 text-sm font-bold"><a href={`/${locale}#features`}>{t("nav.features")}</a><a href={`/${locale}#download`}>{t("nav.download")}</a></nav>
  <div className="flex items-center gap-1.5 sm:gap-2"><label className="v2-icon-button relative" aria-label={t("nav.language")}><Globe size={18}/><select value={locale} onChange={change} className="absolute inset-0 cursor-pointer opacity-0" aria-label={t("nav.language")}>{locales.map(x=><option value={x} key={x}>{x.toUpperCase()}</option>)}</select></label>
  <button className="v2-icon-button" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} aria-label={t("nav.theme")}>{mounted&&resolvedTheme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
  <a href={appStoreUrl(locale)} target="_blank" rel="noreferrer" className="v2-button px-3.5 sm:px-5">{t("nav.cta")}</a></div>
 </div></header>
}

