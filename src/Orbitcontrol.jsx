import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber'

export default function Orbitcontrol()
{
    const { camera } = useThree();
    const controls = useRef();
  
    useFrame(() => {
      // Manually control the camera rotation within a specific range
      camera.rotation.y = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, camera.rotation.y));
    });

    return <>
 
    <OrbitControls ref={controls} />
    </>
}