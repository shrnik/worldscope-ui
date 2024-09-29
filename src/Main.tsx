import { cn } from "./lib/utils";
import ImageGrid from "./components/ImageGrid";
import useSheetData, { useFilteredSheetData } from "./components/useSheetData";

const Main = () => {
  const { data, error, isLoading } = useFilteredSheetData();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={cn("bg-zinc-950 dark:bg-white")}>
      <div className="sticky top-0 z-10 bg-zinc-950 dark:bg-white">
        <div className="text-left text-4xl font-extrabold text-white px-2 py-4">
          Worldscope
        </div>
      </div>
      <ImageGrid data={data} />
    </div>
  );
};

export default Main;
