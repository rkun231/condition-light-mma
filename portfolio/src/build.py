import base64, io, qrcode, sys
APP='../../index.html'
ICON='../../icon-192.png'
URL='https://rkun231.github.io/condition-light-mma/portfolio/'
def b64(path): return base64.b64encode(open(path,'rb').read()).decode()
q=qrcode.QRCode(border=1,box_size=8,error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data(URL); q.make(fit=True)
buf=io.BytesIO(); q.make_image(fill_color="black",back_color="white").save(buf,format='PNG')
QR='data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
ICO='data:image/png;base64,'+b64(ICON)
for src,out in [('pres.src.html','컨디션신호등_포트폴리오_발표자료.html'),('detail.src.html','컨디션신호등_포트폴리오_자세히보기.html'),('play.src.html','컨디션신호등_포트폴리오.html')]:
    try: s=open(src,encoding='utf-8').read()
    except FileNotFoundError: continue
    s=s.replace('__CSS__',open('common.css',encoding='utf-8').read()).replace('__APP_B64__',b64(APP)).replace('__QR__',QR).replace('__ICON__',ICO)
    open('out/'+out,'w',encoding='utf-8').write(s); print(out,len(s))
