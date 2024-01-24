import * as THREE from 'three'; // Import Three.js
import { useTexture } from '@react-three/drei';

export default function CreateWalls()
{
  const textures = {
    ...useTexture({
      map: "./Textures/Metal007_1K-JPG_Color.jpg",
      roughnessMap: "./Textures/Metal007_1K-JPG_Roughness.jpg",
      metalnessMap: "./Textures/Metal007_1K-JPG_Metalness.jpg",
      normalMap: "./Textures/Metal007_1K-JPG_NormalGL.jpg",
    }),
    metalness: 0.2
  };
    return <>
      <mesh receiveShadow rotation-x={ Math.PI * 0.5 }>
        <planeGeometry args={[60, 60]}/>
        <meshStandardMaterial color={"#B18663"} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 15, -20]}>
      <planeGeometry args={[60, 30]}/>
      <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-y={ Math.PI * 0.5} position={[-30, 15, 0]}>
      <planeGeometry args={[60, 30]}/>
      <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-y={ Math.PI * 0.5} position={[30, 15, 0]}>
      <planeGeometry args={[60, 30]}/>
      <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={ Math.PI * 0.5 } position-y={30}>
        <planeGeometry args={[60, 60]}/>
        <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
    </>
}