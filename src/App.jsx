import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@material-tailwind/react";
import NewItem from "./pages/NewItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { ROUTES } from "./helpers/flow";
import Stats from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.NEW_ITEM.path} element={<NewItem />} />
          <Route path={ROUTES.STATS.path} element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
