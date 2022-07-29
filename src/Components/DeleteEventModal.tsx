import React from "react";

import "../Styles/modal-styles.css";

import Draggable from "react-draggable";

/**
 * Modal de supression d'évènement
 */
const DeleteEventModal = (props: { children: React.ReactNode; display: "block" | "none" }) => {
  return (
    <Draggable>
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
    </Draggable>
  );
};

export default DeleteEventModal;
