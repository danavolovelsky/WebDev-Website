import React, {useState, useEffect, useRef} from 'react';
import { Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useFrame, useThree } from "@react-three/fiber"
import { useScene } from './SceneContext';
import { TextureLoader} from 'three';


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

  const texture = useLoader(TextureLoader, "visuals/speechBubble1.png"); 
  texture.minFilter = THREE.LinearFilter;

    return <>
    <mesh position={[27.2, 16.1, -4]}>
      <planeGeometry args={[6.5, 4.5]} />
      <meshBasicMaterial transparent  map={texture} />
      <Html>
        <div id='aboutme'>
        <p>
      Hey, my name is Dana. I'm  a creative coder, <br/>
      currently studying <strong>Creative Computing BSc</strong> at the University of the Arts London. <br/>
      I enjoy intertwining <strong>technology </strong> with <strong>design</strong> and creative practices. <br/>
      Currently my passion lies in exploring <strong>WebGL</strong> and building my foundation of <strong>3D </strong>knowledge. <br/>
      Click on me to view my CV. <br/>
      If you have any questions or want to connect feel free to contact me.
    </p>
        </div>
      </Html>
    </mesh>

    </>
}