import Axios from 'axios';

class UploadImage {
    UploadImg() {
        return Axios({
            method:"GET",
            url:"https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/medias/presign?fileExtension=jpg&userId=23",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    } 
        
    
}
export default UploadImage;