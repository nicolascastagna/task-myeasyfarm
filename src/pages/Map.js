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

  useEffect(() => {
    setCoordinatesCenter(MapCenter);
  }, []);

  const handlePreview = (e) => {
    soilmapData.items.filter((el) => el.partfield_id === soilmapData.items.id);
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
        {/* <GeoJSON data={mapData.data.features[0].features} /> */}
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
                partfieldsData.items.id === soilmapData.items.partfield_id &&
                soilmapData.items.map(function (item, index) {
                  //   const polygon =
                  //   item.features.geometry.coordinates[0][0].map(
                  //     (item) => [item[1], item[0]]
                  //   );
                  // console.log(polygon);
                  // const color = `#${map.color_hex}`;

                  return (
                    <GeoJSON data={item.mapdata.features} key={index.id} />
                  );
                  // return (
                  //   <Polygon
                  //     key={"soil-" + index + "-" + item.id}
                  //     fillColor={colorFields}
                  //     color={colorFields}
                  //     weight={2}
                  //     positions={item.mapdata.features[0].geometry.coordinates}
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
