import React from "react";

function Header(props) {
  return (
    <div className="header">
      <h1>COVID-19 Daily Update (Unofficial)</h1>
      <span className="headerLink">
        Source:
        <a
          href="https://www.worldometers.info/coronavirus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Worldometer.Info/conornavirus
        </a>
      </span>
    </div>
  );
}

export default Header;
