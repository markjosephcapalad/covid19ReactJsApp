import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { FormatNumber } from "../Util";
import {} from "./Country";

import "./css/common.css";
import Country from "./Country";

function TotalStat(props) {
  const [stat, setStat] = useState({});
  const [countryXML, setCountryXML] = useState({});
  const [country, setCountry] = useState("");

  const getStat = () => {
    return fetch("https://coronavirus-19-api.herokuapp.com/all")
      .then(response => response.json())
      .then(d => setStat(d))
      .catch(err => setStat({}));
  };

  const getCountry = () => {
    let parser;
    parser = new DOMParser();
    fetch("https://api.hostip.info")
      .then(response => response.text())
      .then(data => setCountryXML(data));

    return parser.parseFromString(countryXML, "text/xml");
  };

  useEffect(() => {
    if (Object.keys(stat).length === 0) {
      getStat();
    }
  }, [stat]);

  useEffect(() => {
    const c = getCountry().getElementsByTagName("countryName")[0];
    if (c !== undefined) {
      setCountry(c.childNodes[0].nodeValue.toString().toLowerCase());
      console.log(country);
    }
  }, [countryXML, country]);

  if (!stat)
    return (
      <div className="main">
        <div className="box">
          <h1>
            Error on fetching data for the global summary data! I am working on
            it.
          </h1>
        </div>
      </div>
    );

  return (
    <>
      {Object.keys(stat).length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div className="main">
            <div className="box">
              <h2>Total confirmed: {FormatNumber(stat.cases)}</h2>
            </div>
            <div className="box">
              <h2>Total deaths: {FormatNumber(stat.deaths)}</h2>
            </div>
            <div className="box">
              <h2>Total recovered: {FormatNumber(stat.recovered)}</h2>
            </div>
          </div>
          {country ? (
            <div className="current-location">
              <h2 className="current-location-text">Your Country:</h2>
              <Country geolocation={country} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default TotalStat;
