f = open('src/pages/principal/Dashboard.jsx', encoding='utf-8')
lines = f.readlines()
f.close()
for i in range(974, 1005):
    try:
        print(i+1, repr(lines[i][:90]))
    except:
        pass
