import urllib.request
import json
try:
    req = urllib.request.Request("http://127.0.0.1:5000/api/hod/parent-communication/refresh-status", method='POST')
    req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print("HTTPError:", e.code)
    print(e.read().decode())
except Exception as e:
    print(str(e))
