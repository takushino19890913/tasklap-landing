import {BellOff,Coffee,Cloud,Gift,Languages,SunMoon} from "lucide-react";import {useTranslations} from "next-intl";import Reveal from "./Reveal";
// [赤い数字なし, ストリークなし(休んでいい), 登録任意, 無料, 8言語, テーマ]
const icons=[BellOff,Coffee,Cloud,Gift,Languages,SunMoon];
export default function BentoGrid(){const t=useTranslations("v2");return <section className="v2-section-2 py-24"><div className="v2-container"><div className="bento-grid">{icons.map((Icon,i)=><Reveal key={i} delay={(i%3)*.06} className="h-full"><div className="bento-card"><Icon/><h3>{t(`bento.${i}.title`)}</h3><p>{t(`bento.${i}.body`)}</p>{i===5&&<div className="mt-auto flex gap-2 pt-5"><i className="swatch bg-[#FBF4E9]"/><i className="swatch bg-[#14162B]"/></div>}{i===4&&<div className="mt-auto flex flex-wrap gap-1.5 pt-5">{["JA","EN","KO","DE","ES","FR","PT","ZH"].map(x=><span className="lang-chip" key={x}>{x}</span>)}</div>}</div></Reveal>)}</div></div></section>}

