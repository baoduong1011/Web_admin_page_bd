import React, { useEffect } from 'react'
import swal2 from "sweetalert2";
const NotFoundPage = () => {
    useEffect(() => {
        swal2
        .fire({
          title: `404 Error`,
          text: "Page Not Found :( Try Again!",
          imageUrl:
            "https://img.freepik.com/free-vector/error-404-with-cute-onigiri-mascot-cute-style-design-t-shirt-sticker-logo-element_152558-33632.jpg",
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: "Custom image",
        })
        .then(() => {
          window.location.replace('/admin');
        });
    },[])

  return (
    <div></div>
  )
}

export default NotFoundPage