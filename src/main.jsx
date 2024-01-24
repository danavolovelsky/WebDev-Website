import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sky, OrbitControls, Stage, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './main.css';
import CreateWalls from './createWalls.jsx';
import BookShelf from './BookShelf.jsx';
import Navbar from './navbar.jsx';
import Lights from './lights.jsx'
import Work from './Work.jsx'
import About from './About';
import Home from './Home';
import Contact from './Contact';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { SceneProvider } from './SceneContext';
import Furniture from './furniture.jsx';
import Resize from './resize.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Router>
  <SceneProvider>

    <Canvas  
    shadows
    gl={ {
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outputColorSpace: THREE.LinearSRGBColorSpace
  } }>
<Routes>
  <Route path="/Home" element={<Home />} />
  <Route path="/About" element={<About />} />
  <Route path="/Work" element={<Work />} />
  <Route path="/Contact" element={<Contact />} />
</Routes>

    <Lights/>
    <Navbar/>
    <Resize/>
    <BookShelf/>
    <CreateWalls />
   <Furniture/>
    <Sky/>
    </Canvas>
    </SceneProvider>

    </Router>
  )

