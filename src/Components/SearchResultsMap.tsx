import React, { useMemo } from "react";
import Plot from "react-plotly.js";
import { Box } from "@chakra-ui/react";
import { Result } from "./types";


interface SearchResultsMapProps {
  results: Result[];
  height?: string | number;
}

// Interpolate between green (similar) and red (dissimilar) based on cosine distance
const getColorFromDistance = (distance: number, minDist: number, maxDist: number): string => {
  // Normalize distance to 0-1 range
  const range = maxDist - minDist;
  const normalized = range > 0 ? (distance - minDist) / range : 0;

  // Green (low distance/high similarity) to Red (high distance/low similarity)
  const r = Math.round(255 * normalized);
  const g = Math.round(255 * (1 - normalized));
  const b = 0;

  return `rgb(${r}, ${g}, ${b})`;
};

const SearchResultsMap: React.FC<SearchResultsMapProps> = ({ results, height = "500px" }) => {
  const { lats, lons, colors, hoverTexts, sizes } = useMemo(() => {
    if (results.length === 0) {
      return { lats: [], lons: [], colors: [], hoverTexts: [], sizes: [] };
    }

    const distances = results.map((r) => r.cosineDistance);
    const minDist = Math.min(...distances);
    const maxDist = Math.max(...distances);

    const lats: number[] = [];
    const lons: number[] = [];
    const colors: string[] = [];
    const hoverTexts: string[] = [];
    const sizes: number[] = [];

    results.forEach((result) => {
      if(!result?.metadata) {
        return;
      }
      lats.push(Number(result.metadata.lat));
      lons.push(Number(result.metadata.long ? result.metadata.long : (result.metadata as any).lon));
      colors.push(getColorFromDistance(result.cosineDistance, minDist, maxDist));
      hoverTexts.push(
        `${result.metadata.cameraName} <br>` +
        `Cosine Distance: ${result.cosineDistance.toFixed(4)}<br>`
      );
      sizes.push(7); // Range from 7 to 15
    });
    return { lats, lons, colors, hoverTexts, sizes };
  }, [results]);

  return (
    <Box width="100%" height={height}>
      <Plot
        data={[
          {
            type: "scattermap",
            mode: "markers",
            lat: lats,
            lon: lons,
            marker: {
              size: sizes,
              color: colors,
              line: {
                color: "black",
                width: 1,
              },
            },
            text: hoverTexts,
            hoverinfo: "text",
          },
        ]}
        layout={{
          dragmode: "zoom",
          map: { style: "open-street-map", center: { lat: 38, lon: -90 }, zoom: 3 },
          margin: { r: 0, t: 0, b: 0, l: 0 },
          autosize: true,
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{
          scrollZoom: true,
          displayModeBar: true,
        }}
      />
    </Box>
  );
};

export default SearchResultsMap;
