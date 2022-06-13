import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import {
  getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  instance,
  refreshToken,
} from "../../utils/Admin/Extensions";
import swal2 from "sweetalert2";
import { useEffect, useState } from "react";
import Datatable2 from "../../components/datatable/Datatable2";
import Datatable3 from "../../components/datatable/Datatable3";

const List2 = (props) => {
  instance.setToken = (token) => {
    instance.defaults.headers["Authorization"] = "Bearer " + token;

    window.localStorage.setItem("token", token);
  };

  instance.interceptors.response.use(
    (response) => {
      const { code, auto } = response.data;
      return response;
    },
    (error) => {
      console.warn("Error status", error.response.status);
      const { status, auto } = error.response;
      if (status === 400) {
        refreshToken().then((rs) => {
          let newToken = rs.data.data.token;
          instance.setToken(newToken);
          const config = error.response.config;
          config.headers["Authorization"] = "Bearer " + newToken;
          config.baseURL =
            "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1";

          return instance(config);
        });
      }
      swal2
        .fire({
          title: `Please login again, you have expired!`,
          text: "Click OK to try again!",
          imageUrl:
            "https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg",
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: "Custom image",
        })
        .then(() => {
          window.location.replace("/admin/dashboard");
        });
    }
  );

  // ----------------------------------------------------------------------------------------------

  const [data, setData] = useState({
    userArray: [],
    url: true,
  });

  useEffect(() => {
    if (props.url === "/products/") {
      setData({ ...data, url: true });
    } else if (props.url === "/users/") {
      setData({ ...data, url: false });
    }
  }, [props.url]);

  const getUsers = async function (pageNo = 1) {
    var apiResult = await getDataWithAuto(pageNo).then((res) => {
      return res.data;
    });

    return apiResult;
  };

  const getRooms = async function (pageNo = 1) {
    var apiResult = await getDataWithAuto2(pageNo).then((res) => {
      return res.data;
    });

    return apiResult;
  };

  const getEntireUserList = async function (pageNo = 1) {
    const results = await getUsers(pageNo);
    console.log("Retreiving data from API for page : " + pageNo);

    if (results.data.length > 0) {
      return results.data.concat(await getEntireUserList(pageNo + 1));
    } else {
      return results;
    }
  };

  const getEntireRoomList = async function (pageNo = 1) {
    const results = await getRooms(pageNo);
    console.log("Retreiving data from API for page : " + pageNo);

    if (results.data.length > 0) {
      return results.data.concat(await getEntireRoomList(pageNo + 1));
    } else {
      return results;
    }
  };
    return (
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <Datatable3 />
        </div>
      </div>
    );
};

export default List2;
