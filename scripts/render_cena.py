"""Renderiza scene/cena.html em vídeo (public/nous-abertura-v2.mp4).
Uso:  python3 scripts/render_cena.py            -> vídeo completo
      python3 scripts/render_cena.py teste 1.5 6 -> PNGs de teste em /tmp
Requer: playwright (chromium) e ffmpeg."""
import os,subprocess,sys
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUR,FPS=11.0,30
def run(times=None):
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path=os.environ.get("CHROMIUM","/opt/pw-browsers/chromium"))
        pg=b.new_page(viewport={"width":1600,"height":900})
        pg.goto("file://"+os.path.join(ROOT,"scene","cena.html"));pg.wait_for_timeout(2000)
        if times:
            for t in times:
                pg.evaluate("t=>render(t)",t);pg.screenshot(path=f"/tmp/cena_{t}.png")
            b.close();return
        out=os.path.join(ROOT,"public","nous-abertura-v2.mp4")
        cmd=["ffmpeg","-v","error","-y","-f","image2pipe","-framerate",str(FPS),"-c:v","png","-i","-"]
        audio=os.environ.get("AUDIO")
        if audio:cmd+=["-i",audio,"-af",f"afade=t=in:d=0.6,afade=t=out:st={DUR-1.2}:d=1.2","-c:a","aac","-b:a","112k"]
        cmd+=["-vf","scale=1280:720:flags=lanczos","-c:v","libx264","-crf","20","-preset","slow","-pix_fmt","yuv420p","-t",str(DUR),"-movflags","+faststart",out]
        pr=subprocess.Popen(cmd,stdin=subprocess.PIPE)
        for k in range(int(DUR*FPS)):
            pg.evaluate("t=>render(t)",k/FPS);pr.stdin.write(pg.screenshot())
        pr.stdin.close();pr.wait();b.close()
if __name__=="__main__":
    run([float(x) for x in sys.argv[2:]] if len(sys.argv)>1 and sys.argv[1]=="teste" else None)
