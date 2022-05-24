
// import https from "https";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import httpsBrowserify from "https-browserify";
import {
  getRandomInt,
  getLocalToken,
  getLocalRefreshToken,
  instance,
  getToken,
  refreshToken,
  getDataWithAuto,
} from "./utils/Admin/Extensions";





function App() {
  const [flagAdmin, setFlagADmin] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  const urlAddRoom = "/products/";
  const urlAddUser = "/users/";
  const urlAddLocation = "";

  



  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/users">
              <Route index element={<List url={urlAddUser} />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="/products">
              <Route index element={<List url={urlAddRoom} />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>

            <Route path="/locations">
            <Route index element={<List url={urlAddRoom} />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
