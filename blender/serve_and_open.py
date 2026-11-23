# Serves the portfolio folder on http://localhost:8000 and opens it in the
# default browser. Run from Blender's Python Console:
#   exec(open(r"C:\Users\abnou\OneDrive\Desktop\my-portfolio-main\blender\serve_and_open.py").read())
# The server stops when Blender closes.
import os, threading, http.server, socketserver, webbrowser, traceback

ROOT = r"C:\Users\abnou\OneDrive\Desktop\my-portfolio-main"
PORT = 8000
OPEN_BROWSER = False   # set True to also pop open your default browser
NOTE = os.path.join(ROOT, "models", "_server.txt")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)
    def log_message(self, *a):
        pass

def note(msg):
    try:
        open(NOTE, "w").write(msg)
    except Exception:
        pass
    print(msg)

try:
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    note("serving %s on http://localhost:%d" % (ROOT, PORT))
except OSError as e:
    note("bind failed (maybe already running): %r" % (e,))
except Exception:
    note("FATAL\n" + traceback.format_exc())

if OPEN_BROWSER:
    try:
        webbrowser.open("http://localhost:%d/index.html" % PORT)
    except Exception:
        note("browser open failed\n" + traceback.format_exc())
