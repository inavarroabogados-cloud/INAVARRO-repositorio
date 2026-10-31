import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const origin=process.env.STATIC_TEST_ORIGIN||'http://127.0.0.1:3001';
const mount='/y-ahora-que';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const context=await browser.newContext();const page=await context.newPage();const failures=[];
 page.on('pageerror',e=>failures.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&r.url().includes(mount))failures.push(r.status()+' '+r.url())});
 await page.goto(origin+'/');assert.equal(await page.locator('aside a[href="/y-ahora-que/"]').count(),1);
 await page.locator('aside a[href="/y-ahora-que/"]').click();assert.match(page.url(),/\/y-ahora-que\/$/);
 await page.getByRole('link',{name:'Ordenar mi consulta'}).first().click();
 for(let i=0;i<5;i++){await page.getByRole('radio',{name:'No lo sé',exact:true}).check();await page.getByRole('button',{name:i===4?'Ver mi resumen':'Continuar'}).click()}
 await page.getByRole('heading',{name:'Tu siguiente paso, un poco más claro.'}).waitFor();
 assert.match(page.url(),/\/y-ahora-que\/orientador\/$/);assert.equal(await page.evaluate(()=>localStorage.length),0);
 await page.getByRole('link',{name:'Solicitar una consulta',exact:false}).last().click();await page.waitForURL(/\/y-ahora-que\/contacto\/$/);
 for(const width of [360,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/orientador/','/contacto/','/guias/preparar-consulta/']){
   await page.goto(origin+mount+route);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(a.violations.map(v=>v.id),[]);
  }
 }
 await page.goto(origin+mount+'/guias/preparar-consulta/');
 for(const a of await page.getByRole('link',{name:/Descargar/}).all()){const href=await a.getAttribute('href');assert.ok(href.startsWith(mount+'/social/'));assert.equal((await page.request.get(origin+href)).status(),200)}
 assert.ok((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
 await page.goto(origin+mount+'/');assert.equal(await page.locator('.brand img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
 await page.screenshot({path:'/tmp/inavarro-static-final.png',fullPage:true});
 assert.deepEqual(failures,[]);
 console.log('Static integration PASS: portal link, mounted five-step journey, contact, 4 widths × 4 pages axe, downloads, assets and noindex; no browser errors or failed tool requests.');
}finally{await browser.close()}
