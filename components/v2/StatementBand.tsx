import {useTranslations} from "next-intl"; import Reveal from "./Reveal";
export default function StatementBand(){const t=useTranslations("v2");return <section id="statement" className="v2-section py-28 sm:py-40"><div className="v2-container max-w-5xl"><Reveal><div className="accent-rule"/><h2 className="statement-title"><span className="block">{t("statement.h2Top")}</span><span className="block">{t("statement.h2Bottom")}</span></h2></Reveal><Reveal delay={.06}><p className="mt-7 max-w-3xl text-base leading-[1.9] text-muted sm:text-lg">{t("statement.sub")}</p></Reveal></div></section>}

