import React from "react";

import "./modal.css";
import logout from "./logout.png"

export const Modal = ({ onSubmit, onCancel, closeModal, children }) => {
  const myStyle = {
    maxWidth:"10%",
    position:"absolute",
    top:"195px",
    left:"45%"
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div
          className="modal-header"
          onClick={() => closeModal("Modal was closed")}
        >
          <p className="close">&times;</p>
        </div>
        <div className="modal-content"><br /><br /><img src={logout} alt="image" style={myStyle}/>{children}</div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-submit"
            onClick={() => onSubmit()}
          >
            Logout
          </button>
          <button
            type="submit"
            className="btn btn-cancel"
            onClick={() => onCancel()}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};