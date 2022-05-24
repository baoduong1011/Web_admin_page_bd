import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import {
  getDataWithAuto,
  getRandomInt,
  instance,
  refreshToken,
} from "../../utils/Admin/Extensions";
import swal2 from "sweetalert2";
import { useEffect, useState } from "react";

const List = () => {
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
          window.location.replace("/dashboard");
        });
    }
  );

  // ----------------------------------------------------------------------------------------------

  const [data,setData] = useState({
    userArray:[]
  })
  

  const getUsers = async function (pageNo = 1) {
    var apiResult = await getDataWithAuto(pageNo).then((res) => {
      return res.data;
    });

    return apiResult;
  };

  const getRooms = async function (pageNo = 1) {
    var apiResult = await getDataWithAuto(pageNo).then((res) => {
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

  

  


  useEffect(() => {
    (async () => {
      const entireList = await getEntireUserList();
      let array = entireList.slice(0,-1);
      let array2 = ["active","passive"];
      array.forEach((item,index) => {
            let random = getRandomInt(0,2);
            item.id=index+1;
            item.status = array2[random];
            item.age = getRandomInt(20,50);
      })

      setData({...data,userArray:array})
    })();

    (async () => {
      const entireList = await getEntireRoomList();
      let array = entireList.slice(0,-1);
      let array2 = ["active","passive"];
      array.forEach((item,index) => {
            let random = getRandomInt(0,2);
            item.id=index+1;
            item.status = array2[random];
            item.age = getRandomInt(20,50);
      })

      setData({...data,userArray:array})
    })();
  }, []);

  console.log(data.userArray);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable data={data.userArray} />
      </div>
    </div>
  );
};

export default List;
