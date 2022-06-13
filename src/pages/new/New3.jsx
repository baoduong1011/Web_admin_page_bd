import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {  PutImage,
    uploadImage,
    getDataWithAuto,
    getDataWithAuto2,
    getRandomInt,
    instance,
    refreshToken,
    CreateRoom,
    CreateMedia,
    CreateLocation, } from "../../utils/Admin/Extensions";
import swal2 from "sweetalert2";

const New3 = ({ inputs, title }) => {
  const [file, setFile] = useState("");

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
      console.log(error);
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
        }).then(() => {
            window.location.reload();
        })
        
    }
  );


//   ---------------------------------------------------------------


  const [infoLocation, setInfoLocation] = useState({
    values: {
      longitude: 0,
      latitude: 0,
      name: "",
    },
    errors: {
      longitude: 0,
      latitude: 0,
      name: "",
    },
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);

   
    let newValues = { ...infoLocation.values, [name]: value };

    setInfoLocation({
      ...infoLocation,
      values: newValues,
    });
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} name={input.name} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={(e) => {
                  e.preventDefault();
                  CreateLocation(infoLocation.values).then(res => {
                    swal2
                    .fire({
                      icon: "success",
                      title: "Create Location Successfully",
                      text: "Good Job!",
                    }).then(() => {
                      window.location.reload();
                    })
                  }).catch(err => {
                      console.log(err)
                  })

                  console.log(infoLocation.values)
              }} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New3;
