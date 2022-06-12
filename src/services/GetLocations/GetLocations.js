import Axios from "axios";

class GetLocations {
    GetLocation(id) {
        return Axios({
            method:"GET",
            url:`https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/locations?page=${id}`
        })
    }
}
export default GetLocations;