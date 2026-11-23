@echo off
REM Double-click to preview the 3D portfolio locally.
cd /d "%~dp0"
start "" http://localhost:8000/index.html
py -m http.server 8000 2>nul || python -m http.server 8000
