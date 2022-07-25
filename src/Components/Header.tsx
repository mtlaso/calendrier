import React from "react";

const Header = (props: { clickBack: () => void; clickNext: () => void }) => {
  return (
    <header>
      <p id="header-date" className="header-date">
        loading...
      </p>
      <div>
        <button
          onClick={() => {
            props.clickBack();
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            props.clickNext();
          }}
        >
          next
        </button>
      </div>
    </header>
  );
};

export default Header;
