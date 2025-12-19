import { useState } from "react";
import "./App.css";
import Header from "./components/header.tsx";
import SearchPage from "./pages/searchPage.tsx";

function App() {
  return (
    <>
      <Header />
      <SearchPage />
    </>
  );
}

export default App;
