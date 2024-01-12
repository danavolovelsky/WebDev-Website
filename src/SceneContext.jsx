import React, { createContext, useContext, useState, useRef } from 'react';
import * as THREE from 'three';
const SceneContext = createContext(); //Context makes it possible to share values (state) between different components without having to do it manually

export const SceneProvider = ({ children }) => { //Function that takes a chldren prop (the components nested inside it)

  const [selectedObject, setSelectedObject] = useState(null);//setselectedobject(...) can change the selected object; null means no object is currently selected
  const [cameraAnimation, setCameraAnimation] = useState("home");
  const projectBookRef = useRef([]);
  const resetPositionsRef = useRef(null);
  

const cameraPositions = {
    home: {
        position: [0, 13.5, 22],
        lookAt: new THREE.Vector3(0, 13.5, -2),
        duration: 1000,
    },
    about: {
        position: [-5, 5, 0],
        lookAt: new THREE.Vector3(-1, 15, 0),
        duration: 1000,
    },
    work: {
        position: [-20, 9.5, 0],
        lookAt: new THREE.Vector3(-20, 9.5, -2),
        duration: 1000,
    },
    contact: {
        position: [-20, 9.5, 0],
        lookAt: new THREE.Vector3(-20, 9.5, -2),
        duration: 1000,
    },
};

  const value = {
    selectedObject,
    setSelectedObject,
    cameraAnimation,
    setCameraAnimation,
    cameraPositions,
    projectBookRef,
    resetPositionsRef,
  };

  return (
    <SceneContext.Provider value={value}>
      {children} {/*represents the components that are wrapped by the SceneProvider */}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const context = useContext(SceneContext); {/*usecontext: access values provided by a context -> gets current state from scenecontext*/}
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context; {/*context object is the value object i provided to the provider*/}
};