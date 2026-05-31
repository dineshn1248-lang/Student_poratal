import urllib.request
import json
try:
    req = urllib.request.Request("http://127.0.0.1:5000/api/hod/parent-communication/logs")
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print(e.read().decode())
except Exception as e:
    print(str(e))
