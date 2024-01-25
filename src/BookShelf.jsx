import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useScene } from "./SceneContext";

//Render bookshelf and fill it with books
export default function BookShelf() {
  //Access projectbookref from context
  const { projectBookRef } = useScene();

  //Reference to the bookshelf
  const bookShelfRef = useRef();
  //Access three.js scene
  const { scene } = useThree();

  const bookShelf = useLoader(GLTFLoader, "./models/bookshelf.gltf");

  // Assigns a reference to the bookshelf group, access and manipulate bookshelf and its contents
  bookShelfRef.current = bookShelf.scene;

  // Access child objects of bookshelf (used for shelf positioning)
  const shelf1 = bookShelfRef.current.getObjectByName("shelf1");
  const shelf2 = bookShelfRef.current.getObjectByName("shelf2");
  const shelf3 = bookShelfRef.current.getObjectByName("shelf3");
  const shelf4 = bookShelfRef.current.getObjectByName("shelf4");

  useEffect(() => {
    // Clear existing books
    clearBooks(scene);

    // Fill the shelves with books only when the component mounts (not on reload)
    bookOnShelves(scene, bookShelfRef.current, shelf1, 30, projectBookRef);
    bookOnShelves(scene, bookShelfRef.current, shelf2, 15, projectBookRef);
    bookOnShelves(scene, bookShelfRef.current, shelf3, 30, projectBookRef);
    bookOnShelves(scene, bookShelfRef.current, shelf4, 20, projectBookRef);
  }, []); // Empty dependency array ensures the effect runs only once on mount

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

//Variables to generate amount and positioning of projectbooks
let projectCount = -1;
let totalNumBooks = 95;
let projectBooks = 3;
let bookDistance = Math.round(totalNumBooks / projectBooks);

// Fill the shelves with books
function bookOnShelves(scene, bookshelf, shelf, numberOfBooks, projectBookRef) {
  //Random colors
  const bookColors = [
    0xd51b11, 0xb63400, 0xc79274, 0x5f021f, 0xedc9af, 0xd54b00, 0x6e260e,
    0xa52a2a, 0xeee0ca, 0xc4a484, 0x880808,
  ];

  let currentXPosition = -8; //Bookshelf width

  //For loop to generate books
  for (let i = 0; i < numberOfBooks && currentXPosition <= 8; i++) {
    const randomColor =
      bookColors[Math.floor(Math.random() * bookColors.length)];
    const randomWidth = Math.random() * (1 - 0.5) + 0.5;
    const randomHeight = Math.random() * (3.4 - 2) + 2;

    projectCount++;
    //determine which book is a projectbook and should get different material
    const isProjectBook = projectCount % bookDistance === 0;

    //Create normal- and projectbook geometry
    const bookGeometry = new THREE.BoxGeometry(randomWidth, randomHeight, 2);
    const projectBookGeometry = new THREE.BoxGeometry(randomWidth, 3, 2);

    //Define materials depending on what book it is; Create white sides for book effect
    const bookCoverMaterials = [
      new THREE.MeshBasicMaterial({
        color: isProjectBook ? 0xe89c31 : randomColor,
      }), // Top side
      new THREE.MeshBasicMaterial({
        color: isProjectBook ? 0xe89c31 : randomColor,
      }), // Bottom side

      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Left side
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Right side

      new THREE.MeshBasicMaterial({
        color: isProjectBook ? 0xe89c31 : randomColor,
      }), // Front side
      new THREE.MeshBasicMaterial({
        color: isProjectBook ? 0xffffff : randomColor,
      }), // Back side
    ];

    const book = isProjectBook
      ? new THREE.Mesh(projectBookGeometry, bookCoverMaterials)
      : new THREE.Mesh(bookGeometry, bookCoverMaterials);

    //Set userdata to identify object as a book and wther its a projectbook
    book.userData.isBook = true;
    book.userData.isProjectBook = isProjectBook;

    //If its a project book -> adds to projectbook ref
    if (isProjectBook) {
      book.userData.isProjectBook = true;
      projectBookRef.current.push(book);
    } else {
      book.userData.isProjectBook = false;
    }

    //Calculates book position on shelf (Bookshelf is scaled [2, 1.8, 1.8])
    const scaledPosition = new THREE.Vector3()
      .copy(shelf.position) //copy shelf position
      .multiply(bookshelf.scale) //scale with bookshelf model scale
      .add(new THREE.Vector3(currentXPosition, 1.5, 1.5)); //add current x position and fixed, y and z positions

    book.position.copy(scaledPosition).add(bookshelf.position); //set book position relative to bookshelf
    currentXPosition += randomWidth;
    book.position.y -= (3 - randomHeight) / 2; //Adjusts y to center books on shelves

    scene.add(book);
  }
}

// Clear existing books (dont add new books to the scene via iteration)

{
  /*OpenAI GPT-3.5. (2023). AI-Generated Code Snippet (Accessed: December 2, 2023)*/
}
function clearBooks(scene) {
  scene.children.forEach((child) => {
    if (child.type === "Mesh" && child.userData.isBook) {
      scene.remove(child);
    }
  });
}
