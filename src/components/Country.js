import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Country(props) {
  const [stat, setStat] = useState([]);
  const country = props.match.params.country;
  useEffect(() => {
    async function getStat() {
      const data = await fetch(`https://corona.lmao.ninja/countries/${country}`)
        .then(response => response.json())
        .catch(err => setStat({}));

      setStat(data);
    }
    getStat();
  }, []);

  const boxStyle = {
    backgroundColor: "chocolate",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "25px",
    width: "300px"
  };

  const boxInside = {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column"
  };

  const _div = {
    display: "flex",
    justifyContent: "space-evenly"
  };
  return (
    <div style={_div}>
      <div style={boxStyle}>
        <div style={boxInside}>
          <div>
            <h2>{stat.country}</h2>
            <hr />
          </div>
          <div>Cases: {stat.cases}</div>
          <div>Deaths: {stat.deaths}</div>
          <div>Recovered: {stat.recovered}</div>
          <br />
          <div>Today's new Case(s): {stat.todayCases}</div>
          <div>Today's new Death(s): {stat.todayDeaths}</div>
          <div>Critical: {stat.critical}</div>
          <br />
          <Link to={`/`}>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Country;
