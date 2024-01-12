import React, {useState, useEffect, useRef} from 'react';
import { Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useFrame, useThree } from "@react-three/fiber"
import { useScene } from './SceneContext';


export default function About()
{
  const { setCameraAnimation, cameraAnimation, cameraPositions } = useScene();

  useEffect(() => {
    // Animate to the work state
    setCameraAnimation("about");
  }, [setCameraAnimation]);

  useFrame(({ camera }) => {
    // Update camera position using interpolation
    const { position, lookAt } = cameraPositions[cameraAnimation];
    camera.position.lerp(new THREE.Vector3(...position), 0.03);
    camera.lookAt(lookAt);    
  });
    return <>

<mesh color position={[10, 10, -5]}>
        <boxGeometry args={[10, 10, 10]}/>
        <meshStandardMaterial color={"blue"}/>

      </mesh>

    </>
}