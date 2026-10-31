import {notFound} from 'next/navigation';
import {legal} from '../../../lib/content';
export function generateStaticParams(){return Object.keys(legal).map(slug=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:legal[slug as keyof typeof legal]?.title,robots:{index:false,follow:false}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=legal[slug as keyof typeof legal];if(!item)notFound();return <article className="section narrow"><p className="eyebrow">INFORMACIÓN Y TRANSPARENCIA</p><h1>{item.title}</h1><p className="notice">Borrador pendiente de validación profesional. No es un texto legal definitivo.</p><p className="lead">{item.text}</p></article>}
