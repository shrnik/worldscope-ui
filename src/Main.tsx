import { Box, Text, Spinner } from "@chakra-ui/react";
import ImageGrid from "./components/ImageGrid";
import { useFilteredSheetData } from "./components/useSheetData";

const Main = () => {
  return (
    <Box fontFamily="GiestRegular">
      <Box position="sticky" top="0" zIndex="10" bg="white">
        <Text
          textAlign="left"
          fontSize="4xl"
          fontWeight="extrabold"
          px="2"
          py="4"
        >
          Worldscope
        </Text>
      </Box>
      <Content />
    </Box>
  );
};

const Content = () => {
  const { data, isLoading } = useFilteredSheetData();
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="full"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  if (data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="full"
      >
        <Text fontSize="2xl">No data found</Text>
      </Box>
    );
  }
  return <ImageGrid data={data} />;
};

export default Main;
