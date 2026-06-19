import os
import re

filepath = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\components\3d\StudentCharacter.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

clothing_code = """
  // --- PROCEDURAL CLOTHING GENERATION ---
  useEffect(() => {
    if (!scene) return;
    if (scene.userData.clothingAdded) return;
    scene.userData.clothingAdded = true;

    // Premium Materials
    const blazerMat = new THREE.MeshStandardMaterial({ color: 0x0B1B3D, roughness: 0.9, metalness: 0.1 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.7, metalness: 0.0 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x0A1526, roughness: 0.9, metalness: 0.1 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x0F0F0F, roughness: 0.8, metalness: 0.2 });

    // Find bones
    const bones = {};
    scene.traverse((child) => {
      if (child.isBone) {
        bones[child.name] = child;
      }
    });

    const attach = (boneName, geo, mat, pos, rot, scale) => {
      const bone = bones[boneName];
      if (!bone) return;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.scale.set(...scale);
      // Cast shadows
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      bone.add(mesh);
    };

    // Geometries
    const capsuleGeo = new THREE.CapsuleGeometry(1, 1, 4, 16);
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeo = new THREE.SphereGeometry(1, 16, 16);

    // Standard bone scale in Mixamo is usually around 1 or 100. Assuming scale is 1, let's use 0.1 relative sizes.
    // However, if the avatar is small, we will use percentage of the bone. 
    // Mixamo bones usually point along Y.
    
    // --- TORSO (BLAZER & SHIRT) ---
    // Lower Torso / Abdomen (Spine1)
    attach('mixamorig:Spine1', capsuleGeo, blazerMat, [0, 0.1, 0], [0, 0, 0], [0.15, 0.15, 0.12]);
    // Shirt peek
    attach('mixamorig:Spine2', boxGeo, shirtMat, [0, 0.15, 0.08], [0, 0, 0], [0.1, 0.1, 0.05]);
    // Upper Torso / Chest (Spine2)
    attach('mixamorig:Spine2', capsuleGeo, blazerMat, [0, 0.1, 0], [0, 0, 0], [0.18, 0.15, 0.14]);
    // Shoulders
    attach('mixamorig:LeftShoulder', capsuleGeo, blazerMat, [0, 0.05, 0], [0, 0, 1.5], [0.08, 0.08, 0.08]);
    attach('mixamorig:RightShoulder', capsuleGeo, blazerMat, [0, 0.05, 0], [0, 0, -1.5], [0.08, 0.08, 0.08]);

    // --- SLEEVES (ARMS) ---
    // Left Arm
    attach('mixamorig:LeftArm', capsuleGeo, blazerMat, [0, 0.15, 0], [0, 0, 0], [0.07, 0.12, 0.07]);
    attach('mixamorig:LeftForeArm', capsuleGeo, blazerMat, [0, 0.12, 0], [0, 0, 0], [0.06, 0.12, 0.06]);
    // Right Arm
    attach('mixamorig:RightArm', capsuleGeo, blazerMat, [0, 0.15, 0], [0, 0, 0], [0.07, 0.12, 0.07]);
    attach('mixamorig:RightForeArm', capsuleGeo, blazerMat, [0, 0.12, 0], [0, 0, 0], [0.06, 0.12, 0.06]);

    // --- PANTS (LEGS) ---
    // Left Leg
    attach('mixamorig:LeftUpLeg', capsuleGeo, pantsMat, [0, 0.2, 0], [0, 0, 0], [0.1, 0.22, 0.1]);
    attach('mixamorig:LeftLeg', capsuleGeo, pantsMat, [0, 0.2, 0], [0, 0, 0], [0.09, 0.22, 0.09]);
    // Right Leg
    attach('mixamorig:RightUpLeg', capsuleGeo, pantsMat, [0, 0.2, 0], [0, 0, 0], [0.1, 0.22, 0.1]);
    attach('mixamorig:RightLeg', capsuleGeo, pantsMat, [0, 0.2, 0], [0, 0, 0], [0.09, 0.22, 0.09]);

    // --- SHOES ---
    // Left Foot
    attach('mixamorig:LeftFoot', boxGeo, shoeMat, [0, 0.05, 0.05], [0, 0, 0], [0.08, 0.06, 0.18]);
    // Right Foot
    attach('mixamorig:RightFoot', boxGeo, shoeMat, [0, 0.05, 0.05], [0, 0, 0], [0.08, 0.06, 0.18]);

    // --- HAIR ---
    // Base hair
    attach('mixamorig:Head', sphereGeo, hairMat, [0, 0.12, 0.02], [0, 0, 0], [0.11, 0.1, 0.12]);
    // Tufts to make it modern
    attach('mixamorig:Head', sphereGeo, hairMat, [0, 0.2, 0.08], [0.2, 0, 0], [0.08, 0.05, 0.08]); // Front bang
    attach('mixamorig:Head', sphereGeo, hairMat, [-0.08, 0.15, -0.05], [0, 0, 0.2], [0.05, 0.08, 0.08]); // Left side
    attach('mixamorig:Head', sphereGeo, hairMat, [0.08, 0.15, -0.05], [0, 0, -0.2], [0.05, 0.08, 0.08]); // Right side
    attach('mixamorig:Head', sphereGeo, hairMat, [0, 0.18, -0.08], [-0.2, 0, 0], [0.08, 0.08, 0.05]); // Back crown

  }, [scene]);
"""

if "// --- PROCEDURAL CLOTHING GENERATION ---" not in content:
    # Insert it right before the second useEffect
    content = content.replace("  // GSAP Cinematic Sequence", clothing_code + "\n  // GSAP Cinematic Sequence")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected procedural clothing script.")
else:
    print("Already injected.")
