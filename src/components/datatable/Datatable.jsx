import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDataWithAuto,
  getDataWithAuto2,
  getRandomInt,
  instance,
  refreshToken,
} from "../../utils/Admin/Extensions";
import swal2 from 'sweetalert2';

const Datatable = (props) => {
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

  // ------------------------------------------------------------------------------------
  // const [data, setData] = useState(userRows);

  const [data,setData] = useState({
    userArray:[]
  })

  const handleDelete = (id) => {
    console.log(id);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  

  const getUsers = async function (pageNo = 1) {
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
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data.userArray}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
