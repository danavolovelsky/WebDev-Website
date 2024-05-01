# Read Me – Dana’s Portfolio Website Description:

Welcome to my portfolio room! This repository contains the code for my portfolio website, where each page corresponds to a different room object. As users navigate the website using the navbar, the camera zooms in on specific objects, providing interactive experiences or just information. This immersive approach allows visitors to explore my work in a unique and engaging way.
Usage:
It is very important to note, that upon opening the website for the first time, depending on internet connection it can take up to 1-2 minutes.
Click on the navbar links to access different pages:
• About Me: This page provides plain informative content about me, enabling to view my CV when clicking on the image
• Work: Access this page to view my projects. Swipe left and right on the virtual book to navigate through the projects. You can also click or drag the pages for navigation.
• Contact: Fill out the form with your name, email, and message to get in touch with me. Additionally, you can access my LinkedIn and GitHub profiles through the provided links.

# Dependencies:
Node.js, Vite, React, React Router DOM, react-three-fiber, drei, Three.js, turn.js

# References:
References I have used are the official documentations of the mentioned libraries, stackoverflow and AI generated snippets, which are referenced in the comments.

# Encountered Issues:
Many of the issues were not encountered on the local environment. As can be seen in the video on github. I tried to deploy the website on an external web server and netlify, both not working as smoothly as on the localhost.
1. Performance issues: Sometimes a page is not loaded, resulting in an error “Page not found” or “Context lost”. Also the turn.js book in the work component loses its background color.
Probable reasons are - memory constraints, a large number of dependencies needed or because of command issuing when the content is not fully loaded yet.
2. Compatibility issues between react and turn.js made me utilize iframes to link an external Html, causing responsive design issues, which require further attention.
3. Accessibility issues, because WebGl operates differently than Html, proving it to be more difficult than just utilizing normally accessibility-friendly usage of semantic HTML. As the images were loaded with a Textureloader and not as an image property, adding alt text is also not straightforward.
Future improvements:
When building on the website in the future, more interactive features will be added, as well as a landing page. Also utilising leaner code in order to improve performance.
