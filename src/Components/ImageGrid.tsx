"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface ImageGridProps {
  imageUrls: string[];
}

export default function ImageGrid({ imageUrls = [] }: ImageGridProps) {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowCount = Math.ceil(imageUrls.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    console.log(index);
    if (index >= imageUrls.length) return null;

    return (
      <div style={style} className="p-1">
        <img
          // open in new tab
          onClick={() => window.open(imageUrls[index])}
          src={imageUrls[index]}
          alt={`Image ${index + 1}`}
          width={700}
          height={500}
          loading="lazy"
          className="rounded-lg cursor-pointer"
        />
      </div>
    );
  };

  return (
    <div className="w-full h-screen">
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={columnCount}
            columnWidth={width / columnCount}
            height={height}
            rowCount={rowCount}
            rowHeight={width / columnCount}
            width={width}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  );
}
