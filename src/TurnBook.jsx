import { Html } from '@react-three/drei';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRef } from 'react';

const Popup = ({page, onClose}) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  Modal.setAppElement('#root');

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const handleClose = () => {
    onClose();
  }; 
  // Log a message when the component is rendered
  useEffect(() => {
    console.log('Popup component rendered');
  }, []); 
   return (
    <Html position={[-30.3, 18.6, -17.5]}>
      <Modal
  isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          content: {
            position: 'absolute',
            top: '8%', // Adjust the vertical position
            left: '25%',
            width: 'auto', // Set width to auto
            height: '580px', // Set height to auto
          },}}
      >
          <div className="externalBook">
      <iframe
        id="iframe"
        src={`./turntest.html?page=${page}`}
                width="100%"
        height="550px"
      />
    </div>

    <button id="bookButton" onClick={() => {closeModal(); handleClose();}}>
  Close
</button>
              </Modal>
    </Html>
  );
};

export default Popup;
