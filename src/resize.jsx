import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Resize = () => {
  const { set } = useThree();
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));

  useEffect(() => {
    // Initial setup of the camera
    set((state) => ({
      ...state,
      camera: cameraRef.current,
    }));

    const onWindowResize = () => {
      console.log('Window resized!');
      const { innerWidth: width, innerHeight: height } = window;

      // Calculate aspect ratio
      const aspectRatio = width / height;

      // Calculate FOV using some function of aspect ratio
      const fov = calculateFov(width);

      // Update the camera's FOV and aspect ratio
      cameraRef.current.fov = fov;
      cameraRef.current.aspect = aspectRatio;
      cameraRef.current.updateProjectionMatrix();

      set((state) => ({
        ...state,
        camera: cameraRef.current,
      }));
    };

    // Add event listener for window resize
    window.addEventListener('resize', onWindowResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
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
