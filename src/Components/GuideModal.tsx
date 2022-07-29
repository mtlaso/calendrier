import React from "react";

import "../Styles/modal-styles.css";

/**
 * Modal qui affiche un guide
 */
const GuideModal = (props: { children: React.ReactNode; display: "flex" | "none" }) => {
  return (
    <div
      className="modal-container"
      style={{
        height: "100vh",
        display: props.display,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {props.children}
    </div>
  );
};

export default GuideModal;
