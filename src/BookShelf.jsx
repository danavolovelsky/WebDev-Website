
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import React, { useRef, useEffect } from 'react';
import { useThree } from "@react-three/fiber"
import { Physics } from '@react-three/rapier'
import { useScene } from './SceneContext';
import {useSpring,  animated, a } from '@react-spring/three';

export default function BookShelf()
{
  const  {projectBookRef}  = useScene();

    const bookShelfRef = useRef();
    const { scene } = useThree();
    const bookShelf = useLoader(GLTFLoader, './bookshelf.gltf')

    // Assigns a reference to the bookshelf group
    bookShelfRef.current = bookShelf.scene;

    // Access child objects 
    const shelf1 = bookShelfRef.current.getObjectByName('shelf1');
    const shelf2 = bookShelfRef.current.getObjectByName('shelf2');
    const shelf3 = bookShelfRef.current.getObjectByName('shelf3');
    const shelf4 = bookShelfRef.current.getObjectByName('shelf4');
 
    useEffect(() => {
        // Clear existing books
        clearBooks(scene);
    
        // Fill the shelves with books only when the component mounts (not on reload)
        bookOnShelves(scene, bookShelfRef.current, shelf1, 30, projectBookRef);
        bookOnShelves(scene, bookShelfRef.current, shelf2, 15, projectBookRef);
        bookOnShelves(scene, bookShelfRef.current, shelf3, 30, projectBookRef);
        bookOnShelves(scene, bookShelfRef.current, shelf4, 20, projectBookRef);
      }, []); // Empty dependency array ensures the effect runs only once on mount

      console.log(projectBookRef);
      return (
    <>
      <primitive
        object={bookShelf.scene}
        scale={[2, 1.8, 1.8]}
        rotation={[0, Math.PI / 1, 0]}
        position={[-20, 0.5, -17.5]}
      />
    </>
  );
}

let projectCount = -1;
let totalNumBooks = 95;
let projectBooks = 4;
let bookDistance = Math.round(totalNumBooks / projectBooks);

// Fill the shelves with books
function bookOnShelves(scene, bookshelf, shelf, numberOfBooks, projectBookRef) {

    const bookColors = [0xd51b11, 0xB63400, 0xC79274, 0x5F021F, 0xEDC9AF, 0xD54B00, 0xFF8103, 0x6E260E, 0x8B0000, 0xeee0ca, 0xC4A484];
    let currentXPosition = -8;

    for (let i = 0; i < numberOfBooks && currentXPosition <= 8; i++) {
      const randomColor = bookColors[Math.floor(Math.random() * bookColors.length)];
      const randomWidth = Math.random() * (1 - 0.5) + 0.5;
      const randomHeight = Math.random() * (3.4 - 2) + 2;
      projectCount++;
      const isProjectBook = projectCount % bookDistance === 0;   

      const bookGeometry = new THREE.BoxGeometry(randomWidth, randomHeight, 2);
      const projectBookGeometry = new THREE.BoxGeometry(randomWidth, 3, 2);

      const bookCoverMaterials = [
        new THREE.MeshBasicMaterial({color: isProjectBook ? 0x4169e1 : randomColor}), // Top side
        new THREE.MeshBasicMaterial({color: isProjectBook ? 0x4169e1 : randomColor}), // Bottom side
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}), // Left side
        new THREE.MeshBasicMaterial({color: 0xFFFFFF}), // Right side
        new THREE.MeshBasicMaterial({color: isProjectBook ? 0x4169e1 : randomColor}), // Front side
        new THREE.MeshBasicMaterial({color: isProjectBook ? 0xFFFFFF : randomColor})  // Back side
    ];      
      const book = isProjectBook 
      ? new THREE.Mesh(projectBookGeometry, bookCoverMaterials) 
      : new THREE.Mesh(bookGeometry, bookCoverMaterials);
      
      book.userData.isBook = true;
      book.userData.isProjectBook = isProjectBook; 
      if(isProjectBook) {
      book.userData.isProjectBook = true; 

      projectBookRef.current.push(book); // add projectbook to the ref
      } else {
        book.userData.isProjectBook = false;
      }
      
      const scaledPosition = new THREE.Vector3().copy(shelf.position).multiply(bookshelf.scale)
        .add(new THREE.Vector3(currentXPosition, 1.5, 1.5));
      book.position.copy(scaledPosition).add(bookshelf.position);
      currentXPosition += randomWidth;
      book.position.y -= (3 - randomHeight) / 2;
      
      scene.add(book);


    }
    
  }


// Clear existing books
function clearBooks(scene) {
    scene.children.forEach(child => {
      if (child.type === 'Mesh' && child.userData.isBook) {
        scene.remove(child);
      }
    });
  }

