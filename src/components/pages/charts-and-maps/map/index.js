import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../sass/Chart.scss";
import { fetchCountryDataList } from "../store";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import icon from "../../../../assets/images/placeholder.png";

const Map = () => {
  const { countryDataList } = useSelector((state) => state?.chartsMaster);
  const dispatch = useDispatch();

  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 25],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  useEffect(() => {
    dispatch(fetchCountryDataList());
  }, []);

  const position = [20.5937, 78.9629];
  return (
    <div className="chart chart__noPadding">
      <MapContainer center={position} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countryDataList?.map((country) => {
          let pos = [country?.countryInfo?.lat, country?.countryInfo?.long];
          return (
            <Marker
              className="icon-marker"
              position={pos}
              key={country}
              icon={myIcon}
            >
              <Popup>
                {country ? (
                  <>
                    <h2>{country.country}</h2>
                    <ul>
                      <li>
                        <strong>Confirmed:</strong> {country.cases}
                      </li>
                      <li>
                        <strong>Deaths:</strong> {country.deaths}
                      </li>
                      <li>
                        <strong>Recovered:</strong> {country.recovered}
                      </li>
                      <li>
                        <strong>Active:</strong> {country.active}
                      </li>
                      <li>
                        <strong>Population:</strong> {country.population}
                      </li>
                    </ul>
                  </>
                ) : (
                  <p>No data available.</p>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
