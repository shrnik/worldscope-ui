import { useLocation } from "react-router";
import useSwr from "swr";
import KeyMapping from "../keys";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSheetData() {
  const { data, ...rest } = useSwr<{ values: string[][] }>(`sheetData`, () =>
    fetcher(
      "https://sheets.googleapis.com/v4/spreadsheets/1_tbi4WTx9qGErN-2cvYvEd3qeJxgzd_9N9HJWWPD7SA/values/Main?alt=json&key=AIzaSyA6pmS1gW0a3dWzxdYOfo-sE5hmmvGrW8M"
    )
  );

  const { values } = data || {};
  const [header, ...rows] = values || [];
  const jsonData = rows.map((row) =>
    row.reduce((acc, value, index) => {
      acc[header[index] || index] = value;
      return acc;
    }, {} as Record<string, string>)
  );
  return {
    data: jsonData,
    ...rest,
  };
}

export function useFilteredSheetData() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { data, ...rest } = useSheetData();
  const nameFilter = params.get("name");
  const tagsFilter = params.get("tags");
  if (!tagsFilter && !nameFilter) {
    return {
      data,
      ...rest,
    };
  }
  const tags = params.get("tags")?.split(",") || [];
  const filteredData = data
    ?.filter((row) => {
      return (
        !tagsFilter || tags.some((tag) => row[KeyMapping.tags]?.includes(tag))
      );
    })
    .filter((row) => {
      return (
        !nameFilter ||
        row[KeyMapping.name]?.toLowerCase().includes(nameFilter.toLowerCase())
      );
    });
  return {
    data: filteredData,
    ...rest,
  };
}
