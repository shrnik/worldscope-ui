"use client";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import KeyMapping from "../keys";
import { Badge } from "../components/ui/badge";

interface ImageGridProps {
  data: Record<string, string>[];
  urlKey?: string;
}

export default function ImageGrid({
  data,
  urlKey = KeyMapping.imageUrl,
}: ImageGridProps) {
  const imageUrls = useMemo(() => data.map((d) => d[urlKey]), [data, urlKey]);
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
    if (index >= imageUrls.length) return null;
    const imageData = data[index];
    return (
      <div style={style} className="p-1">
        <div className="text-center text-white">
          {imageData[KeyMapping.name]}
          {imageData[KeyMapping.tags] &&
            imageData[KeyMapping.tags].split(",").map((tag) => (
              <Badge
                className="ml-1 text-color-white"
                key={tag}
                variant={"outline"}
              >
                {tag}
              </Badge>
            ))}
        </div>
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
