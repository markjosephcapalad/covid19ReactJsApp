import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { FormatNumber } from "../Util";

import "./css/common.css";

function TotalStat(props) {
  const [stat, setStat] = useState({});

  const getStat = () => {
    return fetch("https://coronavirus-19-api.herokuapp.com/all")
      .then(response => response.json())
      .then(d => setStat(d))
      .catch(err => setStat({}));
  };

  useEffect(() => {
    if (Object.keys(stat).length === 0) {
      getStat();
    }
  }, [stat]);

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
      )}
    </>
  );
}

export default TotalStat;
