import React, { useEffect } from "react";

function Modal({ children, isOpen, handleClose }) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex flex-col items-center justify-center transition-all ease-in-out overflow-hidden z-50 py-40 px-20">
      <button onClick={handleClose} className="close-btn">
        Close
      </button>
      <div className="w-[70%] h-[70%] bg-[#282c34] text-[#fff] flex items-center justify-center text-md">
        {children}
      </div>
    </div>
  );
}
export default Modal;
