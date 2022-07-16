import React from "react";
import loadingPng from "../../assets/91.svg";

const Loading = ({ show }) =>
  show === true ? (
    <div className="text-center">
      <img src={loadingPng} alt="loading" width="40pt" />
    </div>
  ) : null;

export default Loading;
