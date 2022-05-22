import Axios from 'axios';

class AddRoom {
    AddRoom(data) {
        return Axios({
            method:"POST",
            url:"https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/rooms",
            data,
            headers: {
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}


export default AddRoom;