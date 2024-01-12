import React, {useState, useEffect, useRef} from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from '@react-three/drei';
import BookShelf from './BookShelf';
import { useScene } from './SceneContext';

export default function pictureFrames()
{

    const positions = [
      { position: [-30, 26, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 21.5, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 23.75, -1], args: [1.5, 5.5, 1] },
      { position: [-30, 23.75, -9.5], args: [1.5, 5.5, 1] },
      { position: [-30, 20, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 15.5, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 17.75, -1], args: [1.5, 5.5, 1] },
      { position: [-30, 17.75, -9.5], args: [1.5, 5.5, 1] },
      { position: [-30, 14, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 9.5, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 11.75, -1], args: [1.5, 5.5, 1] },
      { position: [-30, 11.75, -9.5], args: [1.5, 5.5, 1] },
      { position: [-30, 8, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 3.5, -5.5], args: [1.5, 1, 8] },
      { position: [-30, 5.75, -1], args: [1.5, 5.5, 1] },
      { position: [-30, 5.75, -9.5], args: [1.5, 5.5, 1] },
    ];

  const textures = {
      ...useTexture({
        map: "./Textures/Metal007_1K-JPG_Color.jpg",
        roughnessMap: "./Textures/Metal007_1K-JPG_Roughness.jpg",
        metalnessMap: "./Textures/Metal007_1K-JPG_Metalness.jpg",
        normalMap: "./Textures/Metal007_1K-JPG_NormalGL.jpg",
      }),
      metalness: 0.2
    };

      return (
    <>
       {positions.map(({ position, args }, index) => (

<group key={index}>
<mesh key={index} position={position}>
  <boxGeometry args={args} />
  <meshStandardMaterial {...textures} side={THREE.DoubleSide} />
</mesh>
</group>
))}
    </>
  );
}1
