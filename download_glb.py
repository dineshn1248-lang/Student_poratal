import urllib.request
import re

with open(r'C:\Users\dines.DELL\.gemini\antigravity\brain\d704b4fe-f662-4487-9852-2b7d21b71a1f\.system_generated\steps\2269\content.md', 'r', encoding='utf-8') as f:
    content = f.read().replace('\\u002F', '/')
    urls = re.findall(r'https?://[^\s"\'\>]+?\.glb[^\s"\'\>]*', content)
    
target_url = None
for u in set(urls):
    if 'tripo_retarget' in u and '20260618' in u: # The one from the URL ID
        target_url = u
        break

if not target_url:
    print("Could not find retargeted GLB URL!")
else:
    print(f"Downloading from: {target_url}")
    # Replace &amp; with & just in case
    target_url = target_url.replace('&amp;', '&')
    urllib.request.urlretrieve(target_url, r'public\models\student.glb')
    print("Downloaded successfully!")
