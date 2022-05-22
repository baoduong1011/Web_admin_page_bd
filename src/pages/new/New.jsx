import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addNewUserService, getNewTokenService, putImageService, uploadImageService } from "../../services/serviceStore";
import Axios from 'axios';
import swal2 from 'sweetalert2';



const New = ({ inputs, title }) => {
  const [file, setFile] = useState({
    img:"",
    flag:false,
    linkImage:""
  });

  function getLocalToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }


  function getLocalRefreshToken() {
    const token = window.localStorage.getItem('refreshToken')
    return token
}

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
                    uploadImageService.UploadImg().then(res => {
                      
                      var prevState = {...infoUser}
                      prevState.values.profileImage = res.data.data.getUrl;
                      setInfoUser({prevState});
                      // localStorage.setItem('image',res.data.data.getUrl);
                      putImageService.PutImage(e.target.files[0],res.data.data.url,e.target.files[0].type).then(res => {
                        swal2.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'Upload image successfully',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }).catch(err => {
                        swal2.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'Add user successfully!',
                          showConfirmButton: false,
                          timer: 1500
                        }).then(() =>{
                          window.location.reload();
                        })
                      })
                    }).catch(err => {
                      
                      getNewTokenService.GetToken().then(res2 => {
                        
                        localStorage.setItem('token',res2.data.data.token);
                      }).catch(err2 => {
                        swal2.fire({
                          position: 'top-center',
                          icon: 'success',
                          title: 'Add user successfully!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      })
                      swal2.fire({
                        title: `You have exceeded the time we allow!`,
                        text: 'Click OK to try again!',
                        imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
                        imageWidth: 400,
                        imageHeight: 400,
                        imageAlt: 'Custom image',
                      }).then(() => {
                        window.location.reload();
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
