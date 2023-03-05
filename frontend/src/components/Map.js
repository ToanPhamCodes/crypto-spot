import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";

const Map = () => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -52.0, 0],
        center: [-5, -3],
        scale: 1600
      }}
      style = {{width: "100%", height: "100%"}}
    >
      <Geographies
        geography="/features.json"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={0.5}
        
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo}
            style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[0.1276, 51.5072]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#000000",
          strokeWidth: 2,
          strokeLinecap: "round"
        }}
      >
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F000000">
          {"We are based in London"}
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default Map;
