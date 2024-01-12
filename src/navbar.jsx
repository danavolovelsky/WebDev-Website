import React, {useState, useEffect, useRef} from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useThree } from "@react-three/fiber"
import { useTexture, Torus } from '@react-three/drei';
import Work from './Work.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import Home from './Home.jsx';
import { useScene } from './SceneContext.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Navbar()
{

  const [selectedLink, setSelectedLink] = useState(null);
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  const { resetPositionsRef} = useScene();

  const navigate = useNavigate()
  const navbarPosition = {
    home: [-30, 13.5, -5.55],
    about: [-31, 9, -10.55], // Adjust the position for the 'about' page
    work: [-31, 9, -10.55], // Adjust the position for the 'work' page
    contact: [-31, 9, -10.55], // Adjust the position for the 'contact' page
  };

  const navbarRotation = {
    home: [Math.PI * 0.5],
    about: [0],
    work: [0],
    contact:[0]
  }

  const navbarStyle = {
    home: "navbar-link",
    about: "navbar-link",
    work: "navbar-link",
    contact: "navbar-link",
  };

  if (selectedLink !== "home" && selectedLink !== null) {
    Object.keys(navbarStyle).forEach((link) => {
      navbarStyle[link] += " active";
    });
  }
  const currentNavbarRotation = navbarRotation[selectedLink] || navbarRotation.home;

  const currentNavbarPosition = navbarPosition[selectedLink] || navbarPosition.home;

    const positions = [
        { position: [-30, 26, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 21.5, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 23.75, -1], args: [1.5, 5.5, 1] },
        { position: [-30, 23.75, -9.5], args: [1.5, 5.5, 1] },
        { position: [-30, 20, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 15.5, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 17.75, -1], args: [1.5, 5.5, 1] },
        { position: [-30, 17.75, -9.5], args: [1.5, 5.5, 1] },
        { position: [-30, 14, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 9.5, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 11.75, -1], args: [1.5, 5.5, 1] },
        { position: [-30, 11.75, -9.5], args: [1.5, 5.5, 1] },
        { position: [-30, 8, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 3.5, -5.5], args: [1.5, 1, 8] },
        { position: [-30, 5.75, -1], args: [1.5, 5.5, 1] },
        { position: [-30, 5.75, -9.5], args: [1.5, 5.5, 1] },
      ];

    const textures = {
        ...useTexture({
          map: "./Textures/Metal007_1K-JPG_Color.jpg",
          roughnessMap: "./Textures/Metal007_1K-JPG_Roughness.jpg",
          metalnessMap: "./Textures/Metal007_1K-JPG_Metalness.jpg",
          normalMap: "./Textures/Metal007_1K-JPG_NormalGL.jpg",
        }),
        metalness: 0.2
      };

      useEffect(() => {
        if (selectedLink !== 'work' && resetPositionsRef.current) {
          resetPositionsRef.current();
          console.log("navbarrrrr");
        }
      }, [selectedLink, resetPositionsRef]);

    return <>

      <Html rotation-y={currentNavbarRotation} position={currentNavbarPosition} transform>        
      <div className="navbar">
        <a onClick={() => {navigate("/Home.jsx"); handleLinkClick('home');}} className={navbarStyle.home}>Home</a>
        <a onClick={() => {navigate("/About.jsx"); handleLinkClick('about');}} className={navbarStyle.about}>About</a>
        <a onClick={() => {navigate("/Work.jsx"); handleLinkClick('work');}} className={navbarStyle.work}>Work</a>        
        <a onClick={() => {navigate("/Contact.jsx"); handleLinkClick('contact');}} className={navbarStyle.contact}>Contact</a>
      </div>
      </Html>

      {selectedLink === 'home' && <Home />}
      {selectedLink === 'about' && <About />}
      {selectedLink === 'work' && <Work />}
      {selectedLink === 'contact' && <Contact />}




      {positions.map(({ position, args }, index) => (

  <group key={index}>
  <mesh key={index} position={position}>
    <boxGeometry args={args} />
    <meshStandardMaterial {...textures} side={THREE.DoubleSide} />
  </mesh>
  </group>
  ))}
    </>
  
}