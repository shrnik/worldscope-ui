// write a component that will display the search results
// results are a list of images

import React, { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";

import {
  Box,
  Image,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  chakra,
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
      <Box display="flex" justifyContent="center" mb={4} my={5}>
        <InputGroup size="md" width="50%">
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
              mr={2}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={4}
      >
        {data.map((image: any) => (
          <Box>
            <chakra.span>
              Updated <ReactTimeAgo date={image.updated_at} locale="en-US" />
            </chakra.span>
            <Image
              src={image.url}
              loading="lazy"
              onClick={() => window.open(image.url, "_blank")}
              title={image.cosineDistance}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SearchResults;
