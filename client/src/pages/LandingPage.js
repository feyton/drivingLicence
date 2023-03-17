import React from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";

function LandingPage(props) {
  const { openModal } = props;
  return (
    <>
      <Hero {...props} setIsOpen={openModal} />
      <Modal handleClose={() => openModal(false)} isOpen={props.isOpen}>
        This is Modal Content!
      </Modal>
    </>
  );
}

export default LandingPage;
