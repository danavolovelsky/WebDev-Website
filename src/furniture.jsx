import React from "react";
import { useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshStandardMaterial } from "three";
import { TextureLoader } from "three";

export default function Furniture() {
  const tableMaterial = new MeshStandardMaterial({
    color: 0xa52a2a,
    roughness: 0.5,
    metalness: 0.7,
  });
  const doorMaterial = new MeshStandardMaterial({ color: 0xebe4d4 });

  const ovalTable = useFBX("./models/ovalTable.fbx"); //3d model: https://www.turbosquid.com/3d-models/3d-juice-oval-table-by-miniforms-model-1946610
  const door = useFBX("./models/door.fbx"); //3d model: https://www.turbosquid.com/3d-models/3d-juice-oval-table-by-miniforms-model-1946610

  const chairModel = useLoader(GLTFLoader, "./models/chair.gltf"); // 3d model: https://www.turbosquid.com/3d-models/3d-leather-chair-black-model-1551213

  //Apply material (color) and enable shadows to models

  //I wrote this function after looking at the following page:
  //https://stackoverflow.com/questions/38720420/apply-material-to-a-specific-child-of-a-three-obj-mesh

  ovalTable.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = tableMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  door.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = doorMaterial;
    }
  });

  const texture = useLoader(TextureLoader, "./visuals/portrait2.jpg");

  const chair1 = chairModel.scene.clone(true);
  const chair2 = chairModel.scene.clone(true);

  chair1.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true; // Enable shadow casting for the chair
      child.receiveShadow = true; // Enable shadow receiving for the chair
    }
  });

  chair2.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true; // Enable shadow casting for the chair
      child.receiveShadow = true; // Enable shadow receiving for the chair
    }
  });

  return (
    <>
      <primitive
        object={door}
        scale={0.06}
        position={[34.2, -1, -6]}
        rotation={[0, Math.PI / 2, 0]}
        dispose={null}
      />

      <primitive
        object={ovalTable}
        scale={0.07}
        position={[0, 0, -4]}
        rotation={[0, Math.PI / 2, 0]}
        dispose={null}
      />
      <primitive
        object={chair1}
        scale={8}
        position={[-10.8, 0, -4]}
        rotation={[0, Math.PI / 5.8, 0]}
      />
      <primitive
        object={chair2}
        scale={8}
        position={[11, 0, -6]}
        rotation={[0, Math.PI / 0.79, 0]}
      />

      {/*Portrait picture frame*/}
      <mesh position={[11.5, 15, -20]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color={0x000080} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[22.5, 15, -20]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color={0x000080} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[17, 20, -20]}>
        <boxGeometry args={[12, 1, 1]} />
        <meshStandardMaterial color={0x000080} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[17, 10, -20]}>
        <boxGeometry args={[12, 1, 1]} />
        <meshStandardMaterial color={0x000080} side={THREE.DoubleSide} />
      </mesh>

      <mesh
        //Click on picture to load CV
        position={[17, 15, -19.9]}
        onClick={(event) =>
          (window.location.href = "./visuals/Dana_Volovelsky_CV.pdf")
        }
      >
        {/*Apply picture texture to plane*/}
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 5.26, -2]} rotation-x={Math.PI * 0.5}>
        <planeGeometry args={[2, 2.82]} />
        <meshStandardMaterial color={"#ffffff"} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
1;
