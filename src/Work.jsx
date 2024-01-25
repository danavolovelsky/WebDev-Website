import React, { useState, useEffect, useRef } from 'react';
import { Html, Circle } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import { useScene } from './SceneContext';
import Popup from './TurnBook';

export default function Work() {
  const { projectBookRef } = useScene();
  const { setCameraAnimation, cameraAnimation, cameraPositions } = useScene();
  const { clock } = useThree();
  const [active, setActive] = useState(true);
  const activeRef = useRef(projectBookRef.current.map(() => true));
  const { resetPositionsRef } = useScene();
  const [showTurnBook, setShowTurnBook] = useState(false);
  const [page, setPage] = useState(1);  // Initialize page to 1

  useEffect(() => {
    // Animate to the work state
    setCameraAnimation('work');
  }, [setCameraAnimation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 3000); // Starts the animation after 5 seconds
    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  useFrame(({ camera }) => {
    // Update camera position using interpolation
    const { position, lookAt } = cameraPositions[cameraAnimation];
    camera.position.lerp(new THREE.Vector3(...position), 0.07);
    camera.lookAt(lookAt);

    // Animate the project books along the z-axis
    if (projectBookRef.current) {
      projectBookRef.current.forEach((book, index) => {
        if (book.position.z > -13) {
          book.rotation.x += 0.01; // Adjust rotation speed as needed
          book.rotation.y += 0.01; // Adjust rotation speed as needed
          book.rotation.z += 0.01; // Adjust rotation speed as needed
        }

        if (book && book.userData.isProjectBook && activeRef.current[index]) {
          const delta = clock.getDelta(); // Time elapsed since last frame
          const speed = 250; // Adjust the animation speed
          const distance = active ? speed * delta : 0;
          book.position.z += distance;

          if (book.position.z > -13) {
            activeRef.current[index] = false;
          }
        }
      });
    }
  });

  useEffect(() => {
    const newPositions = projectBookRef.current.map((book, index) => {
      if (book) {
        const { x, y, z } = book.position;
        console.log(`Project Book ${index + 1}:`, x, y, z);
        return { x, y, z, width: book.width, height: book.height };
      }
    });

  }, [projectBookRef, active]);

  const originalPositions = useRef(
    projectBookRef.current.map((book) => book.position.clone())
  );

  // Reset function
  const resetPositions = () => {
    projectBookRef.current.forEach((book, index) => {
      // Reset the position to the original position
      book.position.copy(originalPositions.current[index]);
      // Reset any other properties you want here
      book.rotation.set(0, 0, 0);
    });
  };
  resetPositionsRef.current = resetPositions;


  const handleProjectBookClick = (index) => {
    setShowTurnBook(true);
    setPage(index * 2 + 2);  // Set the page number based on the index
  };

  const handlePopupClose = () => {
    setShowTurnBook(false);
  };
  return (
    <>
      {projectBookRef.current.map((book, index) => (
        <Circle
          key={index}
          position={[book.position.x, book.position.y, book.position.z]}
          args={[3.2, book.height]}
          onClick={() => handleProjectBookClick(index)}
          material={new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.7 })}
        />
      ))}
      {showTurnBook && <Popup page={page} onClose={handlePopupClose}/>}
    </>
  );
  
}
