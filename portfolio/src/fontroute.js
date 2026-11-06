const fs=require('fs');const N='/tmp/fonts/node_modules/';
const rw=(css,dir)=>css.split('./files/').join(`file://${N}${dir}/files/`);
const G=rw(fs.readFileSync(N+'@fontsource/black-han-sans/400.css','utf8'),'@fontsource/black-han-sans')+
  ['600','800','800-italic','600-italic'].map(w=>{try{return rw(fs.readFileSync(N+`@fontsource/barlow-condensed/${w}.css`,'utf8'),'@fontsource/barlow-condensed')}catch(e){return ''}}).join('\n');
const P=fs.readFileSync(N+'pretendard/dist/web/variable/pretendardvariable.css','utf8').split('./woff2/').join(`file://${N}pretendard/dist/web/variable/woff2/`);
module.exports=async ctx=>{
  await ctx.route(/fonts\.googleapis\.com/,r=>r.fulfill({contentType:'text/css',body:G}));
  await ctx.route(/cdn\.jsdelivr\.net/,r=>r.fulfill({contentType:'text/css',body:P}));
  await ctx.route(/fonts\.gstatic\.com/,r=>r.abort());
};
