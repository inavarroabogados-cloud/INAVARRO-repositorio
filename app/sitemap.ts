export const dynamic = 'force-static';
import {firm} from '../lib/firm';
import {guides} from '../lib/content';
export default function sitemap(){if(!firm.origin||firm.mode==='demo')return [];return ['','/guias','/contacto',...guides.map(g=>'/guias/'+g.slug)].map(path=>({url:firm.origin+path}))}
