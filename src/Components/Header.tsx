import React from "react";

import "../Styles/header-styles.css";

const Header = (props: { clickBack: () => void; clickNext: () => void; showInfoModal: () => void }) => {
  return (
    <header>
      <p id="header-date" className="header-date">
        loading...
      </p>
      <div>
        <button
          onClick={() => {
            props.clickBack();
          }}>
          back
        </button>
        <button
          onClick={() => {
            props.clickNext();
          }}>
          next
        </button>
        <button
          className="info-icon"
          onClick={() => {
            props.showInfoModal();
          }}>
          Info
        </button>
      </div>
    </header>
  );
};

export default Header;
