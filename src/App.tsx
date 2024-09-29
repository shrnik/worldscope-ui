import "./App.css";
import Main from "./Main";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
