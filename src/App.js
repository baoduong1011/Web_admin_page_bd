
// import https from "https";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { locationInputs, productInputs, userInputs } from "./formSource";
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
import New2 from "./pages/new/New2";
import List2 from "./pages/list/List2";
import New3 from "./pages/new/New3";
import {createBrowserHistory} from 'history';
import NotFoundPage from "./pages/404/NotFoundPage";




function App() {
  const [flagAdmin, setFlagADmin] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  const urlAddRoom = "/products/";
  const urlAddUser = "/users/";
  const urlAddLocation = "/locations";

  const history = createBrowserHistory({ basename: '/admin' });
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter basename="/admin" >
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/users">
              <Route path=":userId" element={<Single />} />
              <Route index element={<List url={urlAddUser} />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="/products">
              <Route index element={<List url={urlAddRoom} />} />
              <Route
                path="new"
                element={
                  <New2 inputs={productInputs} title="Add New Room" />
                }
              />
            </Route>

            <Route path="/locations">
              <Route index element={<List2 url={urlAddLocation} />} />
              <Route
                path="new"
                element={<New3 inputs={locationInputs} title="Add New Location" />}
              />
            </Route>

            <Route path="/medias">
              <Route index element={<List url={urlAddRoom} />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
