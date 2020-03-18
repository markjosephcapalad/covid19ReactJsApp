import React from "react";
import TotalStat from "./TotalStat";
import Countries from "./Countries";

function Home(props) {
  const _app = {
    marginBottom: "40px"
  };
  return (
    <div className="App" style={_app}>
      <TotalStat />
      <Countries />
    </div>
  );
}

export default Home;
