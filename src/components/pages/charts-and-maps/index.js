import React from "react";
import Header from "../../shared/header";
import "../../sass/Contact.scss";
import Chart from "./chart";
import Map from "./map";

const ChartsAndMaps = () => {
  return (
    <div className="contact">
      <Header title="Charts & Maps" />
      <div className="contact__chartSec">
        <Chart />
        <Map />
      </div>
    </div>
  );
};

export default ChartsAndMaps;
