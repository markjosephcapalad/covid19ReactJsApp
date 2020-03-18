import React, { useState, useEffect } from "react";

function TotalStat(props) {
  const [stat, setStat] = useState({});

  useEffect(() => {
    async function getStat() {
      const data = await fetch("https://coronavirus-19-api.herokuapp.com/all")
        .then(response => response.json())
        .catch(err => setStat({}));

      setStat(data);
    }
    getStat();
  }, []);

  const _style = {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "20px",
    flexFlow: "wrap",
    backgroundColor: "darkslategrey"
  };

  const boxStyle = {
    backgroundColor: "chocolate",
    padding: "15px",
    borderRadius: "10px",
    width: "300px",
    marginTop: "20px"
  };

  if (!stat)
    return (
      <div>
        <h1>Error on fetching data for the global summary data!</h1>
      </div>
    );
  return (
    <div style={_style}>
      <div style={boxStyle}>
        <h2>Total confirmed: {stat.cases}</h2>
      </div>
      <div style={boxStyle}>
        <h2>Total deaths: {stat.deaths}</h2>
      </div>
      <div style={boxStyle}>
        <h2>Total recovered: {stat.recovered}</h2>
      </div>
    </div>
  );
}

export default TotalStat;
