import React, { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Work from "./Work.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Home from "./Home.jsx";
import { useScene } from "./SceneContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  //state for selected link - start with home
  const [selectedLink, setSelectedLink] = useState((home) => {
    // Retrieve the selected link from localStorage on component mount
    return localStorage.getItem("selectedLink") || "home";
  });

  console.log(selectedLink);

  const linkClick = (link) => {
    if (selectedLink === link) {
      // Handle reload when link is already selected
      window.location.reload();
    } else {
      //updating selectedlink variable
      setSelectedLink(link);
      //selected link stays when user refreshes page
      localStorage.setItem("selectedLink", link);
    }
  };

  //Context hook to keep track of navbar positioning
  const { resetPositionsRef } = useScene();

  //Navigation router hook
  const navigate = useNavigate();

  //Navbar positions on different pages
  const navbarPosition = {
    home: [-30, 13.5, -5.55],
    about: [13, 14.3, -10.55],
    work: [-31, 8.8, -10.55],
    contact: [-11, -3.35, -1.4],
  };

  //Navbar rotation on different pages
  const navbarRotation = {
    home: [0, Math.PI * 0.5, 0],
    about: [0, 0, 0],
    work: [0, 0, 0],
    contact: [-Math.PI / 2, 0, 0],
  };

  //CSS style for navbar links
  const navbarStyle = {
    home: "navbar-link",
    about: "navbar-link",
    work: "navbar-link",
    contact: "navbar-link",
  };

  //I wrote this function after looking at the following page:
  //https://stackoverflow.com/questions/59588994/iterate-json-to-create-navigation

  //Adds css "active" class to selected link
  if (selectedLink !== "home" && selectedLink !== null) {
    Object.keys(navbarStyle).forEach((link) => {
      //iterates over navbar
      navbarStyle[link] += " active";
      return;
    });
  }

  //get current navbar rotation and position
  const currentNavbarRotation =
    navbarRotation[selectedLink] || navbarRotation.home;

  const currentNavbarPosition =
    navbarPosition[selectedLink] || navbarPosition.home;

  //pictureframes geometry positions and sizes
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

  //Reset positions when link changes
  useEffect(() => {
    if (resetPositionsRef.current) {
      resetPositionsRef.current();
    }
  }, [selectedLink, resetPositionsRef]); //runs when one of these change

  return (
    <>
      {/* Navigating to different pages and updating selectedlink*/}
      <Html
        rotation={currentNavbarRotation}
        position={currentNavbarPosition}
        transform
      >
        <div className="navbar">
          <a
            onClick={() => {
              navigate("/home");
              linkClick("home");
            }}
            className={navbarStyle.home}
          >
            Home
          </a>
          <a
            onClick={() => {
              navigate("/about");
              linkClick("about");
            }}
            className={navbarStyle.about}
          >
            About
          </a>
          <a
            onClick={() => {
              navigate("/work");
              linkClick("work");
            }}
            className={navbarStyle.work}
          >
            Work
          </a>
          <a
            onClick={() => {
              navigate("/contact");
              linkClick("contact");
            }}
            className={navbarStyle.contact}
          >
            Contact
          </a>
        </div>
      </Html>

      {/*Render component depending on link*/}
      {selectedLink === "home" && <Home />}
      {selectedLink === "about" && <About />}
      {selectedLink === "work" && <Work />}
      {selectedLink === "contact" && <Contact />}

      {/*Render pictureframe geometry*/}
      {selectedLink === "home" && (
        <>
          {positions.map(({ position, args }, index) => (
            <mesh key={index} position={position}>
              <boxGeometry args={args} />
              <meshStandardMaterial color={0xebe4d4} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </>
      )}
    </>
  );
}
