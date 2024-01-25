import { useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScene } from "./SceneContext";

//Camera animation logic for the homepage
export default function Home() {
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
}
