import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import swal2 from "sweetalert2";
import { useEffect, useState } from "react";
import { getRandomInt,getLocalToken ,getLocalRefreshToken,instance,getToken,refreshToken,getDataWithAuto, getDataWithAuto2 } from "../../utils/Admin/Extensions";
import { roomColumns, userColumns } from "../../datatablesource";
const List = (props) => {
  let url = props.url;
  let check = true;

  

  if(url === "/products/new") {
    check = false
  }
  else if(url === "/users/new") {
    check = true
  }

  const [data, setData] = useState({
    usersArray: [],
    roomsArray:[],
    isLoading: true,
  });

  const handleDelete = (id) => {
    setData(data.usersArray.filter((item) => item.id !== id));
  };

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
      swal2.fire({
        title: `Please login again, you have expired!`,
        text: 'Click OK to try again!',
        imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      }).then(() => {
        window.location.replace('/dashboard'); 
      })
    }
  );

  let getDataUsers = () => {
    getDataWithAuto().then(res => {
     
      let array2 = ["active","passive"];
      let array = res.data.data;
      array.forEach((item,index) => {
            let random = getRandomInt(0,2);
            item.id=index+1;
            item.status = array2[random];
            item.age = getRandomInt(20,50);
          })
          setData({...data,usersArray:array})
    }).catch(err => {
      
    })
  }

  let getDataRooms = () => {
    getDataWithAuto2().then(res => {
      console.log(res.data);
      let array = res.data.data;
      array.forEach((item,index) => {
            item.id=index+1;
      })
      setData({...data,roomsArray: array})
    }).catch(err => {
      
    })
  }


  useEffect(() => {
    if(check === true) {
      getDataUsers();
     
    }
    else if(check === false) {
      getDataRooms();
     
    }
  }, [url]);

  


  if(localStorage.getItem('email') !== "admin@gmail.com") {
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
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable dataColumn={check ? userColumns : roomColumns} dataArray={ check ? data.usersArray : data.roomsArray} url={url} />
      </div>
    </div>
  )
}

export default List