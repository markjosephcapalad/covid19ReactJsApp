import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormatNumber } from "../Util";
import "./css/common.css";
import Loader from "./Loader";

function Country(props) {
  const [stat, setStat] = useState({});
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

  return (
    <>
      {Object.keys(stat).length === 0 ? (
        <Loader />
      ) : (
        <div className="flex-space-evenly">
          <div className="box">
            <div className="box-inside">
              <div>
                <h2>{stat.country}</h2>
                <hr />
              </div>
              <div>Cases: {FormatNumber(stat.cases)}</div>
              <div>Deaths: {FormatNumber(stat.deaths)}</div>
              <div>Recovered: {FormatNumber(stat.recovered)}</div>
              <br />
              <div>Today's new Case(s): {FormatNumber(stat.todayCases)}</div>
              <div>Today's new Death(s): {FormatNumber(stat.todayDeaths)}</div>
              <div>Critical: {FormatNumber(stat.critical)}</div>
              <br />
              <Link to={`/`}>
                <span>Back to home</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Country;
