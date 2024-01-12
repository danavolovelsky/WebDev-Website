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
import pictureFrames from './pictureFrames';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { SceneProvider } from './SceneContext';
import OrbitControl from './Orbitcontrol';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Router>
  <SceneProvider>

    <Canvas  
    shadows
    camera= {{fov:75, near:0.1, far:1000, position:[0, 13.5, 22],rotation:[0,0,0]}}
    gl={ {
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outputColorSpace: THREE.LinearSRGBColorSpace
  } }>
        <Routes>
        <Route exact path="/Home.jsx" element={<Home/>} />
        <Route path="/About.jsx" element={<About/>} />
        <Route path="/Work.jsx" element={<Work/>} />
        <Route path="/Contact.jsx" element={<Contact/>} />
      </Routes>

    <Lights/>
    <Navbar/>
    <BookShelf/>
    <CreateWalls />
    <Sky/>
    </Canvas>
    </SceneProvider>

    </Router>
  )

