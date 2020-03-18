import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./css/select.css";

function Countries(props) {
  const [stat, setStat] = useState([]);
  const [country, setCountry] = useState([]);
  const [filteredStat, setFilteredStat] = useState([]);

  useEffect(() => {
    async function getStat() {
      const data = await fetch(
        "https://coronavirus-19-api.herokuapp.com/countries/"
      )
        .then(response => response.json())
        .catch(err => setStat([]));
      setStat(data);
      let c = [...data];
      setCountry(c.sort((a, b) => (a.country > b.country ? 1 : -1)));
      setFilteredStat(data);
    }
    getStat();

    console.log(stat);
  }, []);

  function filterCountry(e) {
    const country = e.target.value;
    console.log(country);

    if (country !== "All") {
      const newStat = filteredStat.filter(
        c => c.country.toLowerCase() === country.toLowerCase()
      );
      console.log(newStat);
      setStat(newStat);
    } else {
      setStat(filteredStat);
    }
  }

  const _style = {
    display: "flex",
    marginTop: "20px",
    flexFlow: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "darkslategrey"
  };

  const boxStyle = {
    backgroundColor: "chocolate",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "25px",
    width: "300px"
  };

  const _link = {
    color: "white"
  };

  const boxInside = {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column"
  };

  if (!stat)
    return (
      <div>
        <h1>Error on fetching data for countries!</h1>
      </div>
    );

  return (
    <>
      <div className="select-div">
        <h2>Filter by affected country</h2>

        <select className="select-css" onChange={filterCountry}>
          <option value="All">All</option>
          {country.map(opt => {
            return <option value={opt.country}>{opt.country}</option>;
          })}
        </select>
      </div>
      <div style={_style}>
        {stat.map(c => {
          return (
            <div style={boxStyle}>
              <div style={boxInside}>
                <div>
                  <Link to={`/country/${c.country}`} style={_link}>
                    <h2>{c.country}</h2>
                  </Link>
                  <hr />
                </div>

                <div>Cases: {c.cases}</div>
                <div>Deaths: {c.deaths}</div>
                <div>Recovered: {c.recovered}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Countries;
