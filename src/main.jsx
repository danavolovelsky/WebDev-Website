//Depending on the internet connection the first time loading can take around 1 min
import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import "./main.css";
import CreateWalls from "./createWalls.jsx";
import BookShelf from "./BookShelf.jsx";
import Navbar from "./navbar.jsx";
import Lights from "./lights.jsx";
import Work from "./Work.jsx";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { SceneProvider } from "./SceneContext";
import Furniture from "./furniture.jsx";
import Resize from "./resize.jsx";

//Root element for rendering
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Router>
    <SceneProvider>
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.LinearSRGBColorSpace,
        }}
      >
        <Routes>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/work" component={Work} />
          <Route path="/contact" component={Contact} />
        </Routes>
        <Lights />
        <Navbar />
        <Resize />
        <BookShelf />
        <CreateWalls />
        <Furniture />
        <Sky />
      </Canvas>
    </SceneProvider>
  </Router>
);
