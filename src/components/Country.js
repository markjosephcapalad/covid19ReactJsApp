import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormatNumber } from "../Util";
import "./css/common.css";
import Loader from "./Loader";
import ReactGA from "react-ga";

import { HashLink } from "react-router-hashlink";

const trackingId = "UA-171265112-2"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

function Country(props) {
  const [stat, setStat] = useState({});
  const [countryInfo, setCountryInfo] = useState({});

  let country;
  let showBackLink = true;

  if (props.geolocation) {
    country = props.geolocation;
    showBackLink = false;
  } else {
    country = props.match.params.country;
  }

  useEffect(() => {
    async function getStat() {
      const data = await fetch(
        `https://corona.lmao.ninja/v2/countries/${country}`
      )
        .then((response) => response.json())
        .catch((err) => setStat({}));

      setStat(data);
      setCountryInfo(data.countryInfo);
    }
    getStat();
  }, []);

  return (
    <>
      {Object.keys(stat).length === 0 ? (
        <Loader />
      ) : (
        <div className="flex-space-evenly">
          <div className="box">
            <div className="box-inside">
              <div>
                <h2>
                  {stat.country} - <span>({stat.continent})</span>
                </h2>
                <img className="flag" src={countryInfo.flag} alt="flag" />
                <hr />
              </div>
              <div>Total cases: {FormatNumber(stat.cases)}</div>
              <div>Active cases: {FormatNumber(stat.active)}</div>
              <div>Deaths: {FormatNumber(stat.deaths)}</div>
              <div>Recovered: {FormatNumber(stat.recovered)}</div>

              <br />
              <div>Today's new Case(s): {FormatNumber(stat.todayCases)}</div>
              <div>Today's new Death(s): {FormatNumber(stat.todayDeaths)}</div>
              <div>Critical: {FormatNumber(stat.critical)}</div>
              <br />
              <div>Total person tested: {FormatNumber(stat.tests)}</div>
              <br />
              {showBackLink ? (
                <HashLink to={`/#${stat.country.toLowerCase()}`}>
                  <span>Back to home</span>
                </HashLink>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Country;
