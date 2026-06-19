import struct
import json

def get_glb_json(filename):
    with open(filename, 'rb') as f:
        magic = f.read(4)
        version = struct.unpack('<I', f.read(4))[0]
        length = struct.unpack('<I', f.read(4))[0]
        
        chunk_length = struct.unpack('<I', f.read(4))[0]
        chunk_type = f.read(4)
        
        json_data = f.read(chunk_length)
        return json.loads(json_data.decode('utf-8'))

data = get_glb_json('public/models/student.glb')
for node in data.get('nodes', []):
    name = node.get('name', 'unnamed')
    if 'mixamorig' in name or 'Bone' in name or 'Head' in name:
        print(name)
