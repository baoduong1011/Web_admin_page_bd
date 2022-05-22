import Axios from 'axios';

class PutImage {
    PutImage(file,link,type) {
        return Axios({
            method:'PUT',
            url:`${link}`,
            data:file,
        })
    }
}

export default PutImage;