const {chromium}=require('playwright');const fr=require('/tmp/fontroute.js');
const F='file:///home/claude/pf/out/'+encodeURIComponent('컨디션신호등_포트폴리오.html')+'?print=1';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1.5,reducedMotion:'reduce'});await fr(ctx);
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(F);await p.waitForTimeout(2000);
const ids=await p.$$eval('.ch',x=>x.map(e=>e.id));
for(const [i,id] of ids.entries()){
  await p.evaluate(id=>{const s=document.getElementById(id);window.scrollTo(0,s.offsetTop-124);},id);await p.waitForTimeout(500);
  const h=await p.evaluate(id=>document.getElementById(id).offsetHeight,id);
  await p.setViewportSize({width:1440,height:Math.max(900,h+124)});await p.waitForTimeout(300);
  await p.evaluate(id=>{const s=document.getElementById(id);window.scrollTo(0,s.offsetTop-124);},id);await p.waitForTimeout(500);
  await p.screenshot({path:`/tmp/ppdf/p${String(i).padStart(2,'0')}.png`});
  await p.setViewportSize({width:1440,height:900});
}
await b.close();console.log(ids.length,'errors',errs);})();
