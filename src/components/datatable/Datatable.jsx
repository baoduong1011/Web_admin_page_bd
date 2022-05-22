import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getListRoomService,
  getListUserService,
  getNewTokenService,
} from "../../services/serviceStore";
import Axios from "axios";
import ReactLoading from 'react-loading';
import { getRandomInt,getLocalToken ,getLocalRefreshToken,instance,getToken,refreshToken  } from "../../utils/Admin/Extensions";
import swal2 from "sweetalert2";

const Datatable = (props) => {
  const [data, setData] = useState({
    usersArray:[],
    isLoading:true,
    lengthArray:0,
    totalPage:0,
    prev:[]
  });

  let check = true;


  if(props.url === "/products/new") {
    check = false
  }
  else if(props.url === "/users/new") {
    check = true
  }



  const handleDelete = (id) => {
    setData(props.dataArray.filter((item) => item.id !== id));
  };

  function getDataWithAuto(id) {
    return instance.get(
      `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/users?page=${id}`,
      {
        headers: {
          Authorization: "Bearer " + getLocalToken(), // headers token
        },
      }
    );
  }
  
  useEffect(() => {
    let id = 1;
    getDataWithAuto(id).then(res => {
      console.log("DATA-1:",res.data);
      let array2 = ["active","passive"];
      let array = res.data.data;
      array.forEach((item,index) => {
            let random = getRandomInt(0,2);
            item.id=index+1;
            item.status = array2[random];
            item.age = getRandomInt(20,50);
          })
          setData({...data,usersArray:array,lengthArray:array.length+1,totalPage:res.data.pagination.totalPage});
    }).catch(err => {
      
      swal2.fire({
        title: `404 Not Found!`,
        text: 'Click OK to try again!',
        imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      }).then(() => {
        window.location.reload();
      })  
    })

    
  },[]);

  


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
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  const actionColumn2 = [
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
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if(props.url === "/products/new") {
      check = false
    }
    else if(props.url === "/users/new") {
      check = true
    }
  }, [props.url]);
  


  const [page, setPage] = useState(0);
  
  let getNewPage = (page) => {
    let checkPage = 1;
    if(page === 0 ) {
      checkPage = 1;
    }
    else if(page <= data.totalPage) {
      checkPage += page;
    }
    else if(page > data.totalPage) {
      checkPage = data.totalPage;
    }
    getDataWithAuto(checkPage).then(res => {
      console.log(res.data);
      let array2 = ["active","passive"];
      let array = res.data.data;
      array.forEach((item,index) => {
            let random = getRandomInt(0,2);
            item.id=index+1;
            item.status = array2[random];
            item.age = getRandomInt(20,50);
      })

          console.log('array:',array);
          
          
          console.log('userArray:',data.usersArray);
          setData({...data,usersArray: array});
          
    }).catch(err => {
      console.log(err);
      swal2.fire({
        title: `404 Not Found!`,
        text: 'Click OK to try again!',
        imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      }).then(() => {
        window.location.reload();
      })  
    })
  }



  
  useEffect(() => {
    console.log("CHANGE");
  },[data])
  

  return (
    <div className="datatable">
      <div className="datatableTitle">
        LIST USER
        {localStorage.getItem("email") === "128@gmail.com" ? <Link to={props.url} className="link">
        Add New
      </Link> : ""}
      </div>
      {data.usersArray.length === 0 ? <div style={{'display':'flex','justifyContent':'center',"alignItems":'center'}} ><img src="./img/loading.gif" /></div> : <DataGrid
      className="datagrid"
      rows={data.usersArray}
      columns={props.dataColumn.concat(check ? actionColumn : actionColumn2)}
      pageSize={10}
      // page={data.totalPage}
      rowCount={data.totalPage*10}
      onPageChange={(newPage) => getNewPage(newPage)}
      checkboxSelection
    />}
    </div>
  );
};

export default Datatable;
