# 3D Character Models

This directory is strictly for storing 3D character models and animations used in the cinematic entrance portal.

## How to use Mixamo Character

1. Visit [Mixamo.com](https://www.mixamo.com) and log in with an Adobe account.
2. Select a character that matches your desired theme (e.g., a male character with a suit/blazer).
3. Search for a "Walking" animation. 
4. Apply the animation to the character and ensure **"In Place"** is checked.
5. Click **Download** with the following settings:
   - Format: `GLTF` or `FBX`
   - Skin: `With Skin`
   - Frames per Second: `60` or `30`
6. If you downloaded an FBX, use a converter (like Blender) to export it as a `.glb` file.
7. Rename the final file exactly to: `student.glb`
8. Place `student.glb` in this directory (`public/models/student.glb`).

The cinematic entrance system is designed to automatically detect this file, extract its animations, and map the scene flow to it perfectly.
