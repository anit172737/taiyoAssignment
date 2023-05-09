import React, { useEffect } from "react";
import Header from "../../shared/header";
import "../../sass/Contact.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountryDataList,
  fetchGraphDataList,
  fetchWorldDataList,
} from "./store";
import Chart from "./chart";
import Map from "./map";

const ChartsAndMaps = () => {
  const { worldDataList, countryDataList, graphDataList, loader } = useSelector(
    (state) => state?.chartsMaster
  );
  const dispatch = useDispatch();
  console.log("worldDataList", worldDataList);

  console.log("countryDataList", countryDataList);

  useEffect(() => {
    dispatch(fetchWorldDataList());
    dispatch(fetchCountryDataList());
    dispatch(fetchGraphDataList());
  }, []);
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
