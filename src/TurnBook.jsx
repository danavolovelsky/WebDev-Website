import { Html } from "@react-three/drei";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Popup = ({ page, onClose }) => {
  //Manage modal open/close
  const [modalIsOpen, setModalIsOpen] = useState(true);
  Modal.setAppElement("#root"); //For accessibility needs (Screen readers)

  //function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Function to handle closing the modal (lets parent know about closing event)
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    console.log("Popup component rendered");
  }, []);

  return (
    <Html position={[-30.3, 18.6, -17.5]}>
      <Modal
        className="modal"
        isOpen={modalIsOpen} //Control if modal is open
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          content: {
            position: "absolute",
            top: "8%",
            left: "25%",
            width: "auto",
            height: "580px",
          },
        }}
      >
        {/*Content inside modal */}
        <div className="externalBook">
          <iframe id="iframe" src={`/turntest.html?page=${page}`} />{" "}
          {/*Show specific bookpage */}
        </div>

        <button
          id="bookButton"
          onClick={() => {
            closeModal();
            handleClose();
          }}
        >
          Close
        </button>
      </Modal>
    </Html>
  );
};

export default Popup;
