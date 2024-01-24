/*There is still an issue when saving the code, 
the books kin od get stacked on top of each other,
but when saving main.jsx nothing happens  */

import React, {useRef, useEffect} from 'react';
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useThree } from "@react-three/fiber"
import { Html, useTexture, Torus } from '@react-three/drei';
import { useScene } from './SceneContext';
import { TextureLoader} from 'three';

export default function Contact()
{
  const { setCameraAnimation, cameraAnimation, cameraPositions } = useScene();

  useEffect(() => {
    // Animate to the work state
    setCameraAnimation("contact");
  }, [setCameraAnimation]);

  useFrame(({ camera }) => {
    // Update camera position using interpolation
    const { position, lookAt } = cameraPositions[cameraAnimation];
    camera.position.lerp(new THREE.Vector3(...position), 0.08);

    //First camera.lookAt(lookAt) ->camera.lookAt(new THREE.Vector3(...lookAt));->   and then AI
// Calculate the current direction the camera is facing
const currentDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
// Calculate the target direction the camera should face
const targetDirection = new THREE.Vector3().subVectors(lookAt, camera.position).normalize();
// Interpolate between the current and target directions
const newDirection = currentDirection.lerp(targetDirection, 0.05);
// Calculate the new quaternion based on the interpolated direction
const newQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, -1), newDirection);
// Slerp to the new quaternion
camera.quaternion.slerp(newQuaternion, 0.5);
  
  });
  const github = useLoader(TextureLoader, "/visuals/github.png"); 
  github.minFilter = THREE.LinearFilter;
  const linkedin = useLoader(TextureLoader, "/visuals/linkedin.png"); 
  linkedin.minFilter = THREE.LinearFilter;
      return (
    <>
    <Html position={[-1, 5.26, -3.41]} rotation-x={ Math.PI * 0.5 }>
      <form id='contact'>
 <p>
      Hey, if you are interested to get in touch,<br/> please fill out this form.<br/>
      I am excited to here from you!
    </p>

      <label htmlFor="name">Name:
        <input type="text" id="name" name="name" placeholder="(Your name ...)" required/>
        </label>

        <label htmlFor="email">Email:
        <input type="email" id="email" name="email" placeholder="(Your email address ...)"required/>
        </label>
        <label htmlFor="message">Message:
        <textarea id="message" name="message" rows="5" placeholder="(Any message (questions, inqueries, ...))"required></textarea>
        </label>
        <button type="button" >Submit</button>
      </form>
    </Html>
    <mesh onClick={(event) => window.location.href='https://github.com/danavolovelsky'} position={[1.94, 5.26, -2.45]} rotation-x={ Math.PI * 1.5 }>
    <planeGeometry args={[0.4, 0.4]}/>
        <meshStandardMaterial map={github} side={THREE.DoubleSide} />
      </mesh>
      <mesh onClick={(event) => window.location.href='https://www.linkedin.com/in/dana-volovelsky'}position={[1.94, 5.26, -1.45]} rotation-x={ Math.PI * 1.5 }>
    <planeGeometry args={[0.4, 0.4]}/>
        <meshStandardMaterial map={linkedin} side={THREE.DoubleSide} />
      </mesh>

    </>
  );
}


