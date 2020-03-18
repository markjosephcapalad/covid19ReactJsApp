import React from "react";

function Footer(props) {
  const _style = {
    height: "100px",
    marginTop: "20px",
    color: "lightcoral",
    backgroundColor: "darkslategrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return <div style={_style}>Copyright &copy; 2020. All rights reserved.</div>;
}

export default Footer;
