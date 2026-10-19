"""Gera o PDF curto da semana 1. Requer reportlab (não usado pela aplicação)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/Ponto-de-Foco-Semana-1.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
font_dir = Path('/System/Library/Fonts/Supplemental')
if (font_dir / 'Arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('Body', str(font_dir / 'Arial.ttf')))
    pdfmetrics.registerFont(TTFont('Body-Bold', str(font_dir / 'Arial Bold.ttf')))
    pdfmetrics.registerFontFamily('Body', normal='Body', bold='Body-Bold')
else:
    # Fontes base de PDF mantêm o script portável fora do macOS.
    pdfmetrics.registerFontFamily('Body', normal='Helvetica', bold='Helvetica-Bold')

regular = 'Body' if 'Body' in pdfmetrics.getRegisteredFontNames() else 'Helvetica'
bold = 'Body-Bold' if 'Body-Bold' in pdfmetrics.getRegisteredFontNames() else 'Helvetica-Bold'
INK = HexColor('#244237')
GREEN = HexColor('#164b3c')
MUTED = HexColor('#6d7e70')
PALE = HexColor('#eef3e7')
W, H = A4
M = 45
CW = W - 2*M
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle('Ponto de Foco - Entrega da semana 1')
c.setAuthor('José Gomes de Menezes')
c.setSubject('Telas base, navegação e infraestrutura inicial - Projeto Integrador')

styles = {
    'body': ParagraphStyle('body', fontName=regular, fontSize=10, leading=15, textColor=INK, spaceAfter=0),
    'small': ParagraphStyle('small', fontName=regular, fontSize=8.5, leading=13, textColor=MUTED),
    'cell': ParagraphStyle('cell', fontName=regular, fontSize=8.3, leading=12, textColor=INK),
    'heading': ParagraphStyle('heading', fontName=bold, fontSize=11, leading=15, textColor=GREEN),
}
def paragraph(text, y, kind='body', width=CW, x=M):
    p = Paragraph(text, styles[kind]); _, h = p.wrap(width, H)
    p.drawOn(c, x, y-h)
    return y-h

def base(page, label):
    c.setFillColor(GREEN); c.rect(0,H-10,W,10,fill=1,stroke=0)
    c.setFillColor(MUTED); c.setFont(bold,8)
    c.drawString(M,H-42,'PONTO DE FOCO  /  PROJETO INTEGRADOR')
    c.setStrokeColor(HexColor('#dfe7d8')); c.line(M,42,W-M,42)
    c.setFont(regular,7); c.setFillColor(MUTED)
    c.drawString(M,29,'Unifacisa | Sistemas de Informação | 19/10/2026')
    c.drawRightString(W-M,29,f'{label}  |  {page}/2')

base(1,'SEMANA 1')
c.setFillColor(INK); c.setFont(bold,27)
c.drawString(M,H-88,'Telas base e infraestrutura')
y = paragraph('Entrega da semana 1 - Ponto de Foco',H-103,'small') - 19
y = paragraph('<b>Estudante:</b> José Gomes de Menezes<br/><b>Docente:</b> David Victor dos Santos Andrade',y) - 18
y = paragraph('<b>Repositório do projeto</b>',y,'heading') - 7
y = paragraph('<link href="https://github.com/gomesmenezes/ponto-de-foco" color="#164b3c">github.com/gomesmenezes/ponto-de-foco</link>',y) - 5
y = paragraph('Repositório privado: o docente precisa de acesso autorizado para consultar o código e os commits.',y,'small') - 20
y = paragraph('O que foi preparado',y,'heading') - 8
y = paragraph('Protótipo navegável com telas de acesso, microárea e preparação, registro da visita, inspeção e focos, confirmação, fila de sincronização, mapa com prioridades ilustrativas e histórico. As telas representam as US01-US15 do Story Map e os retornos das decisões do User Flow.',y) - 16
y = paragraph('Stack tecnológica escolhida',y,'heading') - 10
rows = [
    ['Camada','Tecnologia e situação nesta semana'],
    ['Telas e painel','React + TypeScript + Vite. Protótipo responsivo implementado.'],
    ['Mapa','Leaflet + OpenStreetMap. Dados e prioridades fictícios.'],
    ['API inicial','Node.js + TypeScript + Fastify. Somente GET /health.'],
    ['Banco central','PostgreSQL + PostGIS. Modelo SQL; sem conexão ou migração executada.'],
    ['App móvel','Expo / React Native + TypeScript; SQLite local. Stack planejada, ainda sem app nativo.'],
    ['Versionamento','Git e GitHub; commits iniciais e verificações automatizadas.'],
]
data = [[Paragraph(text,styles['cell']) for text in row] for row in rows]
t = Table(data,colWidths=[105,CW-105],hAlign='LEFT')
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.4,HexColor('#e3e9df')),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
_,th=t.wrap(CW,H);t.drawOn(c,M,y-th);y-=th+18
y = paragraph('Como executar e apresentar',y,'heading') - 7
y = paragraph('Após instalar Node.js 22.12+ e npm: <b>npm ci</b> e <b>npm run dev</b>. Abra a URL indicada pelo Vite e clique em “Entrar no protótipo”. O README detalha a stack e as rotas; docs/semana-1.md contém o roteiro de apresentação.',y) - 13
y = paragraph('<b>Limite da entrega:</b> login, gravação e sincronização são simulações em memória. Não há banco conectado, persistência off-line, aplicação publicada ou validação com público real. Atualizar a página reinicia os dados.',y,'small')
assert y > 55, f'Conteúdo excedeu página 1: {y}'
c.showPage()

base(2,'EVIDÊNCIAS DAS TELAS')
c.setFillColor(INK); c.setFont(bold,25);c.drawString(M,H-88,'Do registro à visão do território')
y=paragraph('Captura do painel em navegador desktop, com dados fictícios e categorias fixas para demonstração. A interface móvel também foi conferida em largura de 390 px.',H-104,'small')-18
image=Image(str(ROOT/'docs/evidencias/painel-desktop.jpg'))
scale=min(CW/image.imageWidth,375/image.imageHeight)
image.drawHeight=image.imageHeight*scale;image.drawWidth=image.imageWidth*scale
image.drawOn(c,M+(CW-image.drawWidth)/2,y-image.drawHeight);y-=image.drawHeight+15
y=paragraph('Navegação representada',y,'heading')-8
y=paragraph('Acesso → microárea → preparação → visita → inspeção/focos → confirmação → fila → mapa/prioridades → histórico. Os cenários de erro de acesso, campos pendentes, cancelamento, falta de rede e rejeição de envio têm retornos demonstrativos.',y)-14
y=paragraph('Verificação técnica',y,'heading')-8
y=paragraph('Sete testes de transição e health check aprovados, checagem de tipos e build concluídos. Jornada conferida em desktop e celular. Evidências adicionais e registro de verificação estão no repositório.',y,'small')-12
y=paragraph('Fonte do escopo: TAP fornecido pelo estudante e <link href="https://whimsical.com/ponto-de-foco-story-map-user-flow-do-mvp-AqoQJKz7x3QnCbGWqKkcwB" color="#164b3c">Story Map / User Flow no Whimsical</link>. Esta captura não constitui evidência de aplicação com agentes reais.',y,'small')
assert y > 55, f'Conteúdo excedeu página 2: {y}'
c.save()
print(OUT)
