import Axios  from "axios";

class GetListUser {
    GetList(id) {
        return Axios({
            method:"GET",
            url:`https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/users?page=${id}`
        })
    }
}
export default GetListUser;