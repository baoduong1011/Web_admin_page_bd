import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addNewUserService,
  getLocationService,
  getNewTokenService,
  putImageService,
  uploadImageService,
} from "../../services/serviceStore";
import Axios from "axios";
import swal2 from "sweetalert2";
import {
  PutImage,
  uploadImage,
  getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  instance,
  refreshToken,
  CreateRoom,
  CreateMedia,
} from "../../utils/Admin/Extensions";
// import { userInfo } from "os";

const New2 = ({ inputs, title }) => {
  const [file, setFile] = useState({
    img: "",
    flag: false,
    linkImage: "",
  });

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
      if (status === 400 || status === 500) {
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
          window.location.reload();
        });
    }
  );

  const getLocations = async function (pageNo = 1) {
    var apiResult = await getLocationService.GetLocation(pageNo).then((res) => {
      return res.data;
    });

    return apiResult;
  };

  const getEntireLocationList = async function (pageNo = 1) {
    const results = await getLocations(pageNo);
    console.log("Retreiving data from API for page : " + pageNo);
  
    if (results.data.length > 0) {
      return results.data.concat(await getEntireLocationList(pageNo + 1));
    } else {
      return results;
    }
  };

  useEffect(() => {
    (async () => {
      const entireList = await getEntireLocationList();
      let array = entireList.slice(0,-1);
      setLocations({...locations,location:array});
    })();
  }, []);

  let renderSelect = () => {
    return locations.location.map((location,index) => {
      return <option value={location.id} key={location.id}>
          {location.displayName}
      </option>
    })
  }

  const [infoUser, setInfoUser] = useState({
    values: {
      homeType: "",
      name: "",
      roomType: "",
      totalOccupancy: "",
      totalBedrooms: "",
      totalBathrooms: "",
      summary: "",
      address: "",
      hasTv:"",
      hasKitchen:"",
      hasAirCon:"",
      hasHeating:"",
      hasInternet:"",
      price: "",
      rating:"",
      longtitude:"",
      latitude:"",
      location:1
    },
    errors: {
        homeType: "",
        name: "",
        roomType: "",
        totalOccupancy: "",
        totalBedrooms: "",
        totalBathrooms: "",
        summary: "",
        address: "",
        hasTv:true,
        hasKitchen:true,
        hasAirCon:true,
        hasHeating:true,
        hasInternet:true,
        price: "",
        rating:"",
        longtitude:"",
        latitude:"",
        location:1
    },
    valid: false,
    btnImg: false,
  });

  const [locations,setLocations] = useState({
    location:[],
    value:1
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    let errorMessage = "";
    if (value.trim() === "") {
      if (name === "email") {
        errorMessage = "Email is not empty!";
      }
      if (name === "password") {
        errorMessage = "Password is not empty!";
      }
      if (name === "name") {
        errorMessage = "Name is not empty!";
      }
      if (name === "phoneNumber") {
        errorMessage = "PhoneNumber is not empty!";
      }
    }

    

    if(value === "on") {
        value = true;
    }

    else if(value === "") {
        value = false;
    }

    

    
    let newErrors = { ...infoUser.errors, [name]: errorMessage };
    let newValues = { ...infoUser.values, [name]: value };

    setInfoUser({
      ...infoUser,
      errors: newErrors,
      values: newValues,
    });
  };

//   console.log(infoUser.values);

  if (localStorage.getItem("email") !== "128@gmail.com") {
    swal2
      .fire({
        title: "Something is wrong!",
        text: "We try to fix it! Sorry about that :(",
        imageUrl:
          "https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg",
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: "Custom image",
      })
      .then(() => {
        window.location.replace("/dashboard");
      });
    return <div></div>;
  } else
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
                {inputs.map((input) => {
                  let check = input.name;
                  return (
                    <div className="formInput" key={input.id}>
                      <label className={`${input.lable}`}>{input.label}</label>
                      <input
                        onChange={handleChange}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                      />
                    </div>
                  );
                })}

               <div  style={{'width':"300px"}} className="selectCustom" >
                  <lable>Location: </lable>
                  <select name="location" onChange={handleChange} >
                    {renderSelect()}
                  </select>
               </div>
              </form>
              <button
                onClick={() => {
                  CreateRoom(infoUser.values)
                    .then((res) => {
                        swal2
                        .fire({
                          icon: "success",
                          title: "Create Room Successfully",
                          text: "Good Job!",
                        })
                    
                    })
                    .catch((err) => {
                        swal2
                        .fire({
                          title: "Something is wrong!",
                          text: "We try to fix it! Sorry about that :(",
                          imageUrl:
                            "https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg",
                          imageWidth: 400,
                          imageHeight: 400,
                          imageAlt: "Custom image",
                        })
                        .then(() => {
                          window.location.reload();
                        });
                    });
                  console.log(infoUser.values);
                
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default New2;
