import re
with open(r'C:\Users\dines.DELL\.gemini\antigravity\brain\d704b4fe-f662-4487-9852-2b7d21b71a1f\.system_generated\steps\2269\content.md', 'r', encoding='utf-8') as f:
    content = f.read().replace('\\u002F', '/')
    urls = re.findall(r'https?://[^\s"\'\>]+?\.glb[^\s"\'\>]*', content)
    for u in set(urls):
        print(u)
