import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Resize = () => {
  const { set } = useThree();
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));

  const updateCamera = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const aspectRatio = width / height;
    const fov = calculateFov(width);

    cameraRef.current.fov = fov;
    cameraRef.current.aspect = aspectRatio;
    cameraRef.current.updateProjectionMatrix();

    set((state) => ({
      ...state,
      camera: cameraRef.current,
    }));
  };

  useEffect(() => {
    // Initial setup of the camera
    updateCamera();

    // Add event listener for window resize
    window.addEventListener('resize', updateCamera);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCamera);
    };
  }, [set]);

  // This component doesn't render anything
  return null;
};

// Function to calculate FOV
const calculateFov = (width) => {
  console.log('Window width:', width);

  // Implement your FOV calculation here
  // This is just a placeholder
  if (width <= 768) {
    // Mobile devices
    return 110;
  } else if (width <= 1400) {
    // Tablets
    return 100;
  } else {
    // Laptops and larger
    return 75;
  }
};

export default Resize;
