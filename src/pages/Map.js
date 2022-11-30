import React, { useEffect, useState } from "react";
import soilmapData from "../data/soilmaps.json";
import partfieldsData from "../data/partfields.json";
import {
  MapContainer,
  TileLayer,
  Popup,
  GeoJSON,
  Polygon,
} from "react-leaflet";

const Map = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [coordinatesCenter, setCoordinatesCenter] = useState([]);

  const MapCenter = [
    partfieldsData.items[0].center[1],
    partfieldsData.items[0].center[0],
  ];

  const onEachCountry = (feature, layer) => {
    console.log(feature);
    return {
      color: feature.properties.color,
      opacity: 0.1,
      weight: 1,
      fillColor: feature.properties.color,
      geometry: feature.geometry.coordinates,
    };
  };

  useEffect(() => {
    setCoordinatesCenter(MapCenter);
  }, []);

  const handlePreview = (e) => {
    soilmapData.items.filter((el) => el.id === partfieldsData.items.id);
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  console.log(soilmapData);

  return (
    <div>
      <MapContainer center={MapCenter} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {partfieldsData.items.map((state, i) => {
          const coordinates = state.boundaries.coordinates[0][0].map((item) => [
            item[1],
            item[0],
          ]);

          const colorFields = `#${state.color_hex}`;
          return (
            <Polygon
              key={i}
              fillColor={colorFields}
              color={colorFields}
              weight={2}
              positions={coordinates}
              onClick={() => handlePreview(state.id, state.coords[0])}
            >
              <Popup>
                <p className="title-preview">Available maps:</p>
                <p className="subtitle">Type:</p>
                <>
                  <ul className="soil-name">
                    {state.soil ? (
                      <>
                        <li>{state.soil}</li>
                        <span
                          className="link-soil"
                          onClick={() => {
                            handlePreview();
                          }}
                        >
                          Preview
                        </span>
                      </>
                    ) : (
                      "No map available"
                    )}
                  </ul>
                </>
              </Popup>
              {isPreview &&
                partfieldsData.items.id === soilmapData.items.id &&
                soilmapData.items.map(function (item, index) {
                  //   const polygon =
                  //   item.features.geometry.coordinates[0][0].map(
                  //     (item) => [item[1], item[0]]
                  //   );
                  // console.log(polygon);
                  // const color = `#${item.properties.color}`;

                  console.log(item.mapdata.features);

                  return (
                    <GeoJSON
                      data={item.mapdata.features}
                      key={index}
                      style={onEachCountry}
                      onEachFeature={onEachCountry}
                    />
                  );
                  // return (
                  //   <Polygon
                  //     key={item.properties.id}
                  //     fillColor={item.properties.color}
                  //     color={item.properties.color}
                  //     weight={2}
                  //     positions={polygon}
                  //   />
                  // );
                })}
            </Polygon>
          );
        })}
      </MapContainer>
      {isPreview ? (
        <button className="cancel-preview" onClick={closePreview}>
          Cancel Preview
        </button>
      ) : null}
    </div>
  );
};

export default Map;
