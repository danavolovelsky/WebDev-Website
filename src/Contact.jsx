/*There is still an issue when saving the code, 
the books kin od get stacked on top of each other,
but when saving main.jsx nothing happens  */

import React, {useRef} from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useThree } from "@react-three/fiber"
import { useTexture, Torus } from '@react-three/drei';

export default function Contact()
{
    
      return (
    <>
      <mesh color position={[10, 10, -5]}>
        <boxGeometry args={[10, 10, 10]}/>
        <meshStandardMaterial color={"red"}/>

      </mesh>
    </>
  );
}1
