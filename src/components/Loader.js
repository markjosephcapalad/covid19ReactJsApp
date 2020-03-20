import React from "react";
import { Skeleton } from "@material-ui/lab";
import "./css/common.css";

function Loader(props) {
  return (
    <div className="main-skeleton">
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </div>
  );
}

export default Loader;
