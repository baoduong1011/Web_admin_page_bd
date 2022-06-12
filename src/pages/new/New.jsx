import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addNewUserService, getNewTokenService, putImageService, uploadImageService } from "../../services/serviceStore";
import Axios from 'axios';
import swal2 from 'sweetalert2';
import { PutImage, uploadImage ,getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  instance,
  refreshToken,  } from "../../utils/Admin/Extensions";



const New = ({ inputs, title }) => {
  const [file, setFile] = useState({
    img:"",
    flag:false,
    linkImage:""
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
          window.location.reload();
        });
    }
  );

  useEffect(() => {
   
  },[file])

  const [infoUser,setInfoUser] = useState({
    values:{
        email:"",
        name:"",
        password:"",
        phoneNumber:"",
        profileImage:"",
        
    },
    errors: {
      email:"",
      name:"",
      password:"",
      phoneNumber:"",
      profileImage:""
    },
    valid:false
  })

  let handleChange = (e) => {
    let {name , value} = e.target;
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
    let newErrors = { ...infoUser.errors, [name]: errorMessage };
    let newValues = { ...infoUser.values, [name]: value};

    


    setInfoUser({
      ...infoUser,
      errors: newErrors,
      values: newValues
    });
  };

  if(localStorage.getItem('email') !== "128@gmail.com") {
    swal2.fire({
      title: 'Something is wrong!',
      text: 'We try to fix it! Sorry about that :(',
      imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
    }).then(() => {
      window.location.replace("/dashboard")
    })
    return <div>
    
    </div>
  }
  else return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file.img
                  ? URL.createObjectURL(file.img)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFile({...file,img:e.target.files[0],flag: !file.flag})
                    uploadImage(24).then(res => {
                      var prevState = {...infoUser}
                      prevState.values.profileImage = res.data.data.getUrl;
                      console.log(res.data.data.url);
                      console.log(res.data.data.getUrl);
                      setInfoUser({prevState});
                      
                      // -------------------------------------

                      putImageService.PutImage(e.target.files[0],res.data.data.url).then(res =>{
                        console.log(res.data);  
                        swal2.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'Upload image successfully',
                          showConfirmButton: false,
                          timer: 1500
                          
                        })
                      }).catch(err => {
                        console.log(err);
                      })
                    })
                    
                  }}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map(input => {
                let check = input.name;
                return <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input onChange={handleChange} name={input.name} type={input.type} placeholder={input.placeholder} />
              </div>
              })}
            </form>
            <button onClick={() => {
              addNewUserService.AddUser(infoUser.values).then(res => {
                swal2.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Add user successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }).catch(err => {
                swal2.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href="">Why do I have this issue?</a>'
                })
              })

              
            }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
