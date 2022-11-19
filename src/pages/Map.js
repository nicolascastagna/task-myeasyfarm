import React, { useState } from "react";
import soilmapData from "../data/soilmap.json";
import partfieldsData from "../data/partfield.json";
import {
  MapContainer,
  TileLayer,
  Popup,
  GeoJSON,
  Polygon,
} from "react-leaflet";

const Map = () => {
  const [isPreview, setIsPreview] = useState(false);
  const MapCenter = [
    partfieldsData.items[0].center[1],
    partfieldsData.items[0].center[0],
  ];

  const handlePreview = () => {
    console.log(isPreview);
    setIsPreview(true);
  };

  // console.log(partfieldsData.items[0].center[1]);
  console.log(soilmapData.data.features);
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
              pathOptions={{ colorFields }}
              positions={coordinates}
            >
              <Popup>
                <p className="title-preview">Available maps:</p>
                {partfieldsData.id === soilmapData.data.partfield_id ||
                  (soilmapData.data.id &&
                    soilmapData.data.features.map((i) => {
                      return i.features.map((feature, index) => {
                        return (
                          <>
                            <span className="contain-preview">
                              {!isPreview ? (
                                <span
                                  key={index}
                                  className="btn-preview"
                                  onClick={() => handlePreview()}
                                >
                                  {feature.type} n° {index + 1} - Preview
                                </span>
                              ) : (
                                <div className="display-preview">
                                  <h4
                                    className="title-cancel"
                                    // onClick={setIsPreview(false)}
                                  >
                                    Cancel Preview
                                  </h4>
                                  <MapContainer
                                    center={MapCenter}
                                    zoom={14}
                                    scrollWheelZoom={true}
                                  >
                                    <TileLayer
                                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Polygon
                                      paths={isPreview}
                                      pathOptions={{
                                        color: feature.color,
                                      }}
                                      positions={feature.geometry.coordinates}
                                    />
                                  </MapContainer>
                                </div>
                              )}
                            </span>
                          </>
                        );
                      });
                    }))}
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
