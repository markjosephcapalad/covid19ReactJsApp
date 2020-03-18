import React from "react";

function Header(props) {
  const _style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    backgroundColor: "white",
    color: "coral",
    marginTop: "0px",
    padding: "5px"
  };
  return (
    <div style={_style}>
      <h1>COVID-19 Daily Update (Unofficial)</h1>
    </div>
  );
}

export default Header;
