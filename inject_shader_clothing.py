import os

filepath = r"c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\components\3d\StudentCharacter.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we import SkeletonUtils
if "SkeletonUtils" not in content:
    content = content.replace('import * as THREE from "three";', 'import * as THREE from "three";\nimport { SkeletonUtils } from "three-stdlib";')

clothing_code = """
  // --- SHADER-BASED SKINNED MESH CLOTHING ---
  useEffect(() => {
    if (!scene) return;
    
    // Clean up old procedural clothing so Hot Module Reloading works
    const oldMeshes = [];
    scene.traverse((child) => {
      if (child.name === "shader_clothing" || child.name === "procedural_hair") oldMeshes.push(child);
    });
    oldMeshes.forEach(mesh => mesh.parent && mesh.parent.remove(mesh));

    let bodyMesh = null;
    let headBone = null;
    scene.traverse((child) => {
      if (child.isSkinnedMesh && !bodyMesh) {
        bodyMesh = child;
      }
      if (child.isBone && child.name.includes('Head')) {
        headBone = child;
      }
    });

    if (!bodyMesh) return;

    // Clone the mesh for clothing
    const clothingGroup = SkeletonUtils.clone(bodyMesh.parent || bodyMesh);
    let clonedMesh = null;
    clothingGroup.traverse((child) => {
      if (child.isSkinnedMesh) {
        clonedMesh = child;
        child.name = "shader_clothing";
      }
    });

    if (clonedMesh) {
      // Scale up slightly to wrap around the original body
      // We scale the bones or the mesh? Actually, a vertex shader displacement is cleaner, 
      // but scaling the mesh node by 1.02 works for T-pose bounding.
      // Wait, scaling a SkinnedMesh node doesn't always scale the animated vertices cleanly if weights apply from unscaled bones.
      // The BEST way to expand a SkinnedMesh is in the vertex shader: `transformed += normal * 0.015;`
      
      const bones = clonedMesh.skeleton.bones;
      const uHiddenBones = new Array(150).fill(0.0);
      
      bones.forEach((bone, index) => {
        const name = bone.name.toLowerCase();
        // Hide Head, Neck, Hands
        if (name.includes('head') || name.includes('neck') || name.includes('hand')) {
          uHiddenBones[index] = 1.0;
        }
      });

      const clothingMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Color is overridden in shader
        roughness: 0.8,
        metalness: 0.1,
        side: THREE.DoubleSide
      });

      clothingMat.onBeforeCompile = (shader) => {
        shader.uniforms.uHiddenBones = { value: uHiddenBones };
        
        // Add uniforms & varyings
        shader.vertexShader = `
          uniform float uHiddenBones[150];
          varying float vIsHidden;
          varying vec3 vLocalPos;
        ` + shader.vertexShader;

        // Calculate hidden state & push vertices out
        shader.vertexShader = shader.vertexShader.replace(
          '#include <skinning_vertex>',
          `
          #include <skinning_vertex>
          
          float h1 = uHiddenBones[int(skinIndex.x)] * skinWeight.x;
          float h2 = uHiddenBones[int(skinIndex.y)] * skinWeight.y;
          float h3 = uHiddenBones[int(skinIndex.z)] * skinWeight.z;
          float h4 = uHiddenBones[int(skinIndex.w)] * skinWeight.w;
          
          vIsHidden = (h1 + h2 + h3 + h4) > 0.4 ? 1.0 : 0.0;
          vLocalPos = position;

          // Expand the clothing slightly so it sits ON TOP of the original skin!
          transformed += normal * 0.012; 
          `
        );

        shader.fragmentShader = `
          varying float vIsHidden;
          varying vec3 vLocalPos;
        ` + shader.fragmentShader;

        // Apply procedural colors and discard hidden parts
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <color_fragment>',
          `
          #include <color_fragment>
          
          if (vIsHidden > 0.5) discard;

          vec3 finalColor = vec3(0.04, 0.10, 0.24); // Navy Blue (Blazer/Pants)
          
          // Shoes (local Y < 12 approx, assuming Mixamo cm scale. If scale is 1m, it's < 0.12)
          // We will use relative values. Let's assume height is roughly 150-180.
          if (vLocalPos.y < 12.0) {
            finalColor = vec3(0.05, 0.05, 0.05); // Black shoes
          }
          
          // Shirt (V-neck cutout)
          if (vLocalPos.y > 110.0 && vLocalPos.y < 155.0) {
             // Front of body
             if (vLocalPos.z > 5.0) {
               // V shape
               float vWidth = (vLocalPos.y - 110.0) * 0.2;
               if (abs(vLocalPos.x) < vWidth) {
                 finalColor = vec3(0.95, 0.95, 0.95); // White shirt
               }
             }
          }

          diffuseColor.rgb = finalColor;
          `
        );
      };

      clonedMesh.material = clothingMat;
      clonedMesh.castShadow = true;
      clonedMesh.receiveShadow = true;
      
      bodyMesh.parent.add(clonedMesh);
    }

    // ADD REALISTIC HAIR (Spheres)
    if (headBone) {
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, roughness: 0.9 });
      const hairGroup = new THREE.Group();
      hairGroup.name = "procedural_hair";
      
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(8, 16, 16), hairMat);
      s1.position.set(0, 5, 2);
      hairGroup.add(s1);

      const s2 = new THREE.Mesh(new THREE.SphereGeometry(7, 16, 16), hairMat);
      s2.position.set(0, 10, -3);
      hairGroup.add(s2);

      const s3 = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16), hairMat);
      s3.position.set(-6, 5, -1);
      hairGroup.add(s3);

      const s4 = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 16), hairMat);
      s4.position.set(6, 5, -1);
      hairGroup.add(s4);

      headBone.add(hairGroup);
    }

  }, [scene]);
"""

# Insert the code block
if "// --- SHADER-BASED SKINNED MESH CLOTHING ---" not in content:
    content = content.replace("  // GSAP Cinematic Sequence", clothing_code + "\n  // GSAP Cinematic Sequence")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected shader-based clothing successfully!")
