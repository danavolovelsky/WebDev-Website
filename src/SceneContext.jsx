import React, { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";
const SceneContext = createContext(); //Context makes it possible to share values (state) between different components without having to do it manually

//Function that takes a chldren prop (the components nested inside it)

export const SceneProvider = ({ children }) => {
  const [cameraAnimation, setCameraAnimation] = useState("home");
  const projectBookRef = useRef([]);
  const resetPositionsRef = useRef(null);

  //camera movement for the different webpages
  const cameraPositions = {
    home: {
      position: [0, 13.5, 22],
      lookAt: new THREE.Vector3(0, 13.5, -2),
      duration: 1000,
    },
    about: {
      position: [24, 15, 0],
      lookAt: new THREE.Vector3(24, 15, -20),
      duration: 1000,
    },
    work: {
      position: [-20, 9.5, 0],
      lookAt: new THREE.Vector3(-20, 9.5, -2),
      duration: 1000,
    },
    contact: {
      position: [0, 7.2, -2],
      lookAt: new THREE.Vector3(0, 5, -2),
      duration: 1000,
    },
  };

  const value = {
    cameraAnimation,
    setCameraAnimation,
    cameraPositions,
    projectBookRef,
    resetPositionsRef,
  };

  {
    /*Provide context values to children components*/
  }
  return (
    <SceneContext.Provider value={value}>
      {children}{" "}
      {/*represents the components that are wrapped by the SceneProvider */}
    </SceneContext.Provider>
  );
};

//hook to acces values from scenecontext
export const useScene = () => {
  const context = useContext(SceneContext);
  {
    //Access context values
    /*usecontext: access values provided by a context -> gets current state from scenecontext*/
  }

  //Return context values
  return context;
  {
    /*context object is the value object i provided to the provider*/
  }
};
