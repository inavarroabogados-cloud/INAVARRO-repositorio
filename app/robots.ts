import {firm} from '../lib/firm';
export default function robots(){return {rules:{userAgent:'*',disallow:firm.mode==='demo'?'/':['/orientador','/legal']},...(firm.origin&&firm.mode==='production'?{sitemap:firm.origin+'/sitemap.xml'}:{})}}
