import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { roomColumns, userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ApproveRoom,
  CreateMedia,
  getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  getRoomsNotApproved,
  instance,
  refreshToken,
  uploadImage,
} from "../../utils/Admin/Extensions";
import swal2 from 'sweetalert2';
import { putImageService } from "../../services/serviceStore";

const Datatable2 = (props) => {
  const [file, setFile] = useState({
    img: "",
    flag: false,
    linkImage: "",
  });

    let checkOwner = "";
       
if(window.localStorage.getItem('email') === "128@gmail.com") {
    checkOwner = "host"
}
else if (window.localStorage.getItem('email') === "admin@gmail.com") {
    checkOwner = "admin"
}

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

  // ------------------------------------------------------------------------------------
  // const [data, setData] = useState(userRows);

  const [data,setData] = useState({
    roomArray:[]
  })


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/products/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {checkOwner === "host" ? <input onChange={(e) => {
              setFile({...file,img:e.target.files[0],flag: !file.flag})
              uploadImage(6).then((res) => {
                putImageService.PutImage(e.target.files[0],res.data.data.url).then((res) => {
                  
                  swal2.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Upload image successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  })
                })
                CreateMedia(params.id,res.data.data.getUrl).then(res => {
                  swal2.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Create Media successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  })

              }).catch(err => {
                  
              })
              })
            }} type='file' id="file" /> : <div></div>}

            {checkOwner === "admin" ? <div
            className="permitBtn"
            onClick={() => {
              ApproveRoom(params.id).then(res => {
                swal2.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Approve Room successfully",
                  showConfirmButton: false,
                  timer: 1500,
                })

              }).catch(err => [

              ])
            }}
          >
            Approve
          </div> : <div></div>}
          </div>
        );
      },
    },
  ];
  

  const getRooms = async function (pageNo = 1) {
      var apiResult;
    if(checkOwner === "host") {
        apiResult = await getDataWithAuto2(pageNo,checkOwner).then((res) => {
          
            return res.data;
        });
    }
    else if (checkOwner === "admin") {
        apiResult = await getRoomsNotApproved(pageNo).then((res) => {
          
            return res.data;
        });
    }
    
    return apiResult;
  };

  const getEntireRoomList = async function (pageNo = 1) {
    const results = await getRooms(pageNo);
    
  
    if (results.data.length > 0) {
      return results.data.concat(await getEntireRoomList(pageNo + 1));
    } else {
      return results;
    }
  };

  useEffect(() => {
    (async () => {
      const entireList = await getEntireRoomList();
      let array = entireList.slice(0,-1);
      let array2 = ["active","passive"];
      setData({...data,roomArray:array})
    })();
  }, []);

  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Rooms
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data.roomArray}
        columns={roomColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable2;
