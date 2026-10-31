import {notFound} from 'next/navigation';
import Link from 'next/link';
import {guides} from '../../../lib/content';
import {firm} from '../../../lib/firm';
import Share from '../../../components/Share';
import {publicPath} from '../../../lib/paths';
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=guides.find(g=>g.slug===slug);return {title:g?.title,description:g?.short,...(firm.origin?{alternates:{canonical:firm.origin+'/guias/'+slug}}:{}),openGraph:{title:g?.title,description:g?.short,images:[publicPath('/social/'+slug+'-horizontal.png')]}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=guides.find(g=>g.slug===slug);if(!g)notFound();return <article className="section narrow"><Link href="/guias">← Todas las guías</Link><p className="eyebrow">ANTES DE DAR EL SIGUIENTE PASO</p><h1>{g.title}</h1><p className="lead">{g.short}</p><p className="notice">Contenido general provisional. Pendiente de revisión profesional; no hay revisor ni fecha de revisión atribuidos.</p><ol className="tips">{g.tips.map(t=><li key={t}>{t}</li>)}</ol><p>Una guía de INAVARRO Abogados.</p><Share slug={slug} title={g.title}/><div className="panel"><h2>¿Quieres ordenar tu consulta?</h2><p>Cinco preguntas generales, sin datos confidenciales.</p><Link href="/orientador" className="button">Conocer la herramienta ↗</Link></div></article>}
