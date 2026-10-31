"""Generate brand cards from the same editorial source used by the app. Requires Pillow."""
from PIL import Image, ImageDraw, ImageFont
import json, subprocess, textwrap
from pathlib import Path
root=Path(__file__).resolve().parent.parent
# tsx emits JSON only; there is no visitor or case data in these files.
guides=json.loads(subprocess.check_output(['node','--import','tsx','-e',"import {guides} from './lib/content'; console.log(JSON.stringify(guides))"],cwd=root))
out=root/'public/social'; out.mkdir(parents=True,exist_ok=True)
for guide in guides:
 for fmt,(w,h) in {'cuadrado':(1080,1080),'vertical':(1080,1920),'horizontal':(1200,630)}.items():
  im=Image.new('RGB',(w,h),'#142b3c'); d=ImageDraw.Draw(im); margin=70
  serif='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'; sans='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
  small=ImageFont.truetype(sans,20); font=ImageFont.truetype(serif,48 if h==630 else 60); body=ImageFont.truetype(sans,25 if h==630 else 31)
  d.text((margin,50),'INAVARRO / ABOGADOS',font=small,fill='#f7f5ef'); d.line((margin,100,w-margin,100),fill='#a17b5d',width=2)
  y=145 if h==630 else 205
  for line in textwrap.wrap(guide['title'],width=36 if h==630 else 25):
   d.text((margin,y),line,font=font,fill='#f7f5ef'); y+=font.size+15
  y+=35
  tips=guide['tips'][:1] if h==630 else guide['tips'][:3]
  for i,tip in enumerate(tips):
   for line in textwrap.wrap(f'{i+1:02}  {tip}',width=66 if h==630 else 49):
    d.text((margin,y),line,font=body,fill='#e1e4de'); y+=body.size+14
   y+=20
  d.line((margin,h-125,w-margin,h-125),fill='#a17b5d',width=2)
  d.text((margin,h-100),'¿Y ahora qué? · Información general',font=small,fill='#f7f5ef')
  d.text((margin,h-65),'Contenido provisional · Pendiente de revisión',font=small,fill='#d5c0a9')
  im.save(out/f"{guide['slug']}-{fmt}.png")
print('12 tarjetas PNG generadas: 1080×1080, 1080×1920 y 1200×630')
