import React from "react";

import "../Styles/modal-styles.css";

/**
 * Modal de supression d'évènement
 */
const DeleteEventModal = (props: { children: React.ReactNode; display: "block" | "none" }) => {
  return (
    <div
      className="modal-container"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: props.display,
      }}>
      {props.children}
    </div>
  );
};

export default DeleteEventModal;
