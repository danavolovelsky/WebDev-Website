import React, {useState, useEffect, useRef} from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture, Torus } from '@react-three/drei';
import BookShelf from './BookShelf';
import { useScene } from './SceneContext';

export default function Home()
{
    const { setCameraAnimation, cameraAnimation, cameraPositions } = useScene();

    useEffect(() => {
      // Animate to the work state
      setCameraAnimation("home");
    }, [setCameraAnimation]);
  
    useFrame(({ camera }) => {
      // Update camera position using interpolation
      const { position, lookAt } = cameraPositions[cameraAnimation];
      camera.position.lerp(new THREE.Vector3(...position), 0.03);
      camera.lookAt(lookAt);    
    });

   

      return (
    <>
     
    </>
  );
}
