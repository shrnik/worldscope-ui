import ImageGrid from "./Components/ImageGrid";
import useSheetData from "./Components/useSheetData";

const Main = () => {
  const { data, error, isLoading } = useSheetData();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <ImageGrid imageUrls={data.map(({ imageURL }) => imageURL)} />;
};

export default Main;
