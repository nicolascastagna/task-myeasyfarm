// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { GeoJSON } from "react-leaflet";

// const DataMap = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const response = await axios.get("../src/data/log.json");
//       setData(response.data);
//     };
//     getData();
//   }, []);

//   console.log(data);
//   if (data) {
//     return <GeoJSON data={data} />;
//   } else {
//     return null;
//   }
// };

// export default DataMap;
