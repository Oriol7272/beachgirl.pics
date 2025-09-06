#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler
os.chdir(os.path.dirname(os.path.abspath(__file__)) or '.')

print(f"\n🌴 BeachGirl.pics - Server Running at http://localhost:{PORT}")
print(f"📍 El servidor seguirá corriendo en background\n")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
