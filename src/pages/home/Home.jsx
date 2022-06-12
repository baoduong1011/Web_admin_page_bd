import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import swal2 from "sweetalert2";
import { useEffect } from "react";
import { getNewTokenService } from "../../services/serviceStore";

const Home = () => {

  useEffect(() => {
    // setTimeout(() => {
    //   localStorage.removeItem('email');
    //   window.location.reload();
    // },300000)

   

    let serRows = [
      {
        id: 1,
        username: "Snow",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        status: "active",
        email: "1snow@gmail.com",
        age: 35,
      },
      {
        id: 2,
        username: "Jamie Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "2snow@gmail.com",
        status: "passive",
        age: 42,
      }
    ]
    const newArray = serRows.map(row => ({...row,mess:"Hello"}));

    
    
  },[])
 
  if(localStorage.getItem('email') !== "admin@gmail.com" && localStorage.getItem('email') !== "128@gmail.com" ) {
      swal2.fire({
        title: 'Something is wrong!',
        text: 'We try to fix it! Sorry about that :(',
        imageUrl: 'https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      }).then(() => {
        window.location.replace("/admin")
      })
      return <div>
      
      </div>
  }
  else return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;


