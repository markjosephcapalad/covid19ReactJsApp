import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormatNumber } from "../Util";
import Loader from "./Loader";
import "./css/select.css";
import "./css/common.css";

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
  }, []);

  function filterCountry(e) {
    const country = e.target.value;

    if (country !== "All") {
      const newStat = filteredStat.filter(
        c => c.country.toLowerCase() === country.toLowerCase()
      );

      setStat(newStat);
    } else {
      setStat(filteredStat);
    }
  }

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
      {stat.length === 0 ? (
        <Loader />
      ) : (
        <div className="main">
          {stat.map(c => {
            return (
              <div className="box">
                <div className="box-inside">
                  <div>
                    <Link className="color-white" to={`/country/${c.country}`}>
                      <h2>{c.country}</h2>
                    </Link>
                    <hr />
                  </div>

                  <div>Cases: {FormatNumber(c.cases)}</div>
                  <div>Deaths: {FormatNumber(c.deaths)}</div>
                  <div>Recovered: {FormatNumber(c.recovered)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Countries;
