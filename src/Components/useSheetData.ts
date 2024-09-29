import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSheetData() {
  const { data, ...rest } = useSwr<{ values: string[][] }>(`sheetData`, () =>
    fetcher(
      "https://sheets.googleapis.com/v4/spreadsheets/1_qydsWQ2SJlmpdB_NZLdipwT8GwznKd6YXHxd6CEgtA/values/Main?alt=json&key=AIzaSyA6pmS1gW0a3dWzxdYOfo-sE5hmmvGrW8M"
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
