import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber'

export default function Lights()
{
    const standingLamp = useLoader(GLTFLoader, './models/lamp.gltf') // https://www.turbosquid.com/de/3d-models/eternidat-sp6-chrome-3d-1853372
    return <>
        <primitive
        object={standingLamp.scene}
        scale={12}
        position={[0, -6, -6]}
      />
      <ambientLight intensity={1.5}/>
      <directionalLight color="#ffffff" position={[0, 8, 22.5]} castShadow/>
    {/* Spotlight for the lamp */}
    {/* Add a spotlight for the lamp */}
    <spotLight intensity={1300} penumbra={0.05} angle={Math.PI / 4} position={[0,25.5, -6]} castShadow  />


{/* Additional point light for the lamp */}
<pointLight position={[0, 20, 5]} intensity={400} />
    </>
}