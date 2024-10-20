import "./App.css";
import Main from "./Main";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
