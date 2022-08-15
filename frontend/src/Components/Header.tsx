import React from "react";
import { Link } from "react-router-dom";

import "../Styles/header-styles.css";

const Header = (props: { clickBack: () => void; clickNext: () => void; showInfoModal: () => void }) => {
  return (
    <header>
      <p id="header-date" className="header-date">
        loading...
      </p>
      <div>
        {/* bouton back */}
        <button
          onClick={() => {
            props.clickBack();
          }}>
          back
        </button>

        {/* bouton next */}
        <button
          onClick={() => {
            props.clickNext();
          }}>
          next
        </button>

        {/* bouton info */}
        <button
          className="info-icon"
          onClick={() => {
            props.showInfoModal();
          }}>
          Info
        </button>

        {/* lien login */}
        <Link className="link" to="/login">
          login
        </Link>
      </div>
    </header>
  );
};

export default Header;
