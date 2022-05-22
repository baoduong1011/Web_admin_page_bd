import Axios from 'axios';
class GetNewToken {
    GetToken() {
        return Axios({
            method:"GET",
            url:"https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/user/auth/refresh",
            headers: {
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
            }
        })
    }
}
export default GetNewToken;