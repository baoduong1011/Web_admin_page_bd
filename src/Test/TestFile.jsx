import Axios from "axios";

let promise = Axios({
    "method":"GET",
    "url":"https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/auth/login",
    "data": {
        "email":"admin@gmail.com",
        "password":"admin123"
    }
})

promise.then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err);
})