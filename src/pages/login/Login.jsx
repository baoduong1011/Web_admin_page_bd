import "./login.scss";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styled from "styled-components";
import Icon from "../../components/LoginUI/Icon";
import Input from "../../components/LoginUI/Input";
import Button from "../../components/LoginUI/Button";
import { useEffect, useState } from "react";
import {
  getListUserService,
  getNewTokenService,
  userLoginService,
} from "../../services/serviceStore";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import { Home } from "@mui/icons-material";
import Axios from "axios";
import { InstanceLogin, PutImage,
  uploadImage,
  getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  instance,
  refreshToken,
  CreateRoom,
  CreateMedia, } from "../../utils/Admin/Extensions";


const Login = () => {
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
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  const [userLogin, setUserLogin] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    valid: false,
  });

  // var httpsAgent = require(httpsAgent);
  // const Instance = Axios.create({
  //   httpsAgent: https.Agent({
  //     rejectUnauthorized: false
  //   })
  // })

  useEffect(() => {
    //  nbvm
                                          }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    let errorMessage = "";
    if (value.trim() === "") {
      if (name === "email") {
        errorMessage = "Tài khoản bạn chưa nhập";
      }
      if (name === "password") {
        errorMessage = "Mật khẩu bạn chưa nhập";
      }
    }

    let newValues = { ...userLogin.values, [name]: value };
    let newErrors = { ...userLogin.errors, [name]: errorMessage };
    setUserLogin({
      ...userLogin,
      values: newValues,
      errors: newErrors,
    });
  };

  let checkValid = () => {
    let valid = true;
    for (let key in userLogin.errors) {
      if (userLogin.errors[key] !== "" || userLogin.values[key] === "") {
        valid = false;
      }
    }
    setUserLogin({ ...userLogin, valid: valid });
  };

  useEffect(() => {
    checkValid();
  }, [userLogin.errors]);

  let SubmitInfo = () => {
    InstanceLogin(userLogin.values)
      .then((res) => {
        // dispatch({
        //   type:"PUSH_USERNAME",
        //   email: userLogin.values.email,
        // })
        localStorage.setItem("email", userLogin.values.email);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        localStorage.setItem("token", res.data.data.token);
        document.cookie = res.data.data.token;
        console.log(document.cookie);
        swal2
          .fire({
            icon: "success",
            title: "Login Successfully",
            text: "Welcome to dashboard!",
          })
          .then(() => {
            window.location.replace("/dashboard");
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        swal2.fire({
          title: "Something is wrong!",
          text: "We try to fix it! Sorry about that :(",
          imageUrl:
            "https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg",
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: "Custom image",
        });
      });
  };

  const dispatch = useDispatch();

  return (
    <div className="main-login-page">
      <MainContainer>
        <WelcomeText>Welcome</WelcomeText>
        <InputContainer>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            required="required"
            autocomplete="off"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            required="required"
            autocomplete="off"
          />
        </InputContainer>
        <ButtonContainer>
          {userLogin.valid ? (
            <button onClick={SubmitInfo}>SIGN IN</button>
          ) : (
            <button disabled style={{ cursor: "not-allowed" }}>
              SIGN IN
            </button>
          )}
        </ButtonContainer>
        <LoginWith>JOIN WITH US</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FaFacebookF />
          </Icon>
          <Icon color={InstagramBackground}>
            <FaInstagram />
          </Icon>
          <Icon color={TwitterBackground}>
            <FaTwitter />
          </Icon>
        </IconsContainer>
      </MainContainer>
    </div>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;

export default Login;
