// write a component that will display the search results
// results are a list of images

import React, { useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = React.useState("");

  const [data, setData] = React.useState<any[]>([]);

  useEffect(() => {
    if (searchString) {
      fetch(`${process.env.REACT_APP_BASE_URL}/images?query=${searchString}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [searchString]);

  return (
    <>
      <InputGroup size="md" mb={4}>
        <Input
          pr="4.5rem"
          placeholder="Search images"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchString(inputRef.current?.value || "");
            }
          }}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              setSearchString(inputRef.current?.value || "");
            }}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4}
      >
        {data.map((image: any) => (
          <Image
            src={image.url}
            loading="lazy"
            onClick={() => window.open(image.url, "_blank")}
          />
        ))}
      </Box>
    </>
  );
};

export default SearchResults;
