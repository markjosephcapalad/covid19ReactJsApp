import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

import { Tooltip } from "@material-ui/core";

import { FormatNumber } from "../Util";
import Loader from "./Loader";

import "./css/select.css";
import "./css/common.css";

const trackingId = "UA-171265112-2"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

function Countries(props) {
  const [stat, setStat] = useState([]);
  const [country, setCountry] = useState([]);
  const [filteredStat, setFilteredStat] = useState([]);

  useEffect(() => {
    async function getStat() {
      const data = await fetch(
        "https://coronavirus-19-api.herokuapp.com/countries/"
      )
        .then((response) => response.json())
        .catch((err) => setStat([]));
      setStat(data.filter((a) => a.country.toLowerCase() !== "world"));
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
        (c) => c.country.toLowerCase() === country.toLowerCase()
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
          {country.map((opt) => {
            return (
              <option key={opt.country} value={opt.country}>
                {opt.country}
              </option>
            );
          })}
        </select>
      </div>
      {stat.length === 0 ? (
        <Loader />
      ) : (
        <div className="main">
          {stat.map((c) => {
            return (
              <div
                key={c.country.toLowerCase()}
                id={c.country.toLowerCase()}
                className="box"
              >
                <div key={c.country.toLowerCase()} className="box-inside">
                  <Tooltip
                    title="Click country for more details."
                    className="tooltip-country"
                    placement="bottom-end"
                    enterTouchDelay={30}
                    leaveTouchDelay={500}
                    arrow={true}
                  >
                    <div>
                      <Link
                        className="color-white"
                        to={`/country/${c.country}`}
                      >
                        <h2>{c.country}</h2>
                      </Link>
                      <hr />
                    </div>
                  </Tooltip>
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
