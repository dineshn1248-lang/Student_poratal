import struct
import json

filepath = r"public\models\student.glb"
with open(filepath, "rb") as f:
    magic = f.read(4)
    if magic != b'glTF':
        print("Not a valid glTF file")
        exit()
    version, length = struct.unpack('<II', f.read(8))
    chunk_len, chunk_type = struct.unpack('<II', f.read(8))
    if chunk_type != 0x4E4F534A: # JSON
        print("First chunk is not JSON")
        exit()
    json_data = f.read(chunk_len).decode('utf-8')
    data = json.loads(json_data)
    
    print("Animations:")
    if 'animations' in data:
        for i, anim in enumerate(data['animations']):
            print(f"- {anim.get('name', f'Animation_{i}')}")
    else:
        print("NO ANIMATIONS FOUND in GLB!")
        
    print("\nMeshes:")
    if 'meshes' in data:
        for i, mesh in enumerate(data['meshes']):
            print(f"- {mesh.get('name', f'Mesh_{i}')}")

    import base64
    print("\nCalculating Bounding Box...")
    if 'accessors' in data and 'bufferViews' in data and 'buffers' in data:
        # Find the position accessor for the first primitive of the first mesh
        try:
            mesh = data['meshes'][0]
            primitive = mesh['primitives'][0]
            pos_accessor_idx = primitive['attributes']['POSITION']
            pos_accessor = data['accessors'][pos_accessor_idx]
            min_val = pos_accessor.get('min', [0,0,0])
            max_val = pos_accessor.get('max', [0,0,0])
            print(f"Min: {min_val}")
            print(f"Max: {max_val}")
            height = max_val[1] - min_val[1]
            print(f"Height: {height}")
        except Exception as e:
            print("Could not compute bounding box:", e)
