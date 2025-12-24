import { useState } from "react";
import "./App.css";
import Header from "./components/header.tsx";
import SearchPage from "./pages/searchPage.tsx";

function App() {
  const [sortOption, setSortOption] = useState("relevance");

  return (
    <>
      <Header sortOption={sortOption} onSortChange={setSortOption} />

      <SearchPage sortOption={sortOption} />
    </>
  );
}

export default App;
