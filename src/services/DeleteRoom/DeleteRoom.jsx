import Axios from 'axios';

class DeleteRoom {
    Delete(id) {
        return Axios({
            method:"DELETE",
            url:`https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/rooms/${id}`,
            headers: {
                "Content-Type":"application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}

export default DeleteRoom;