import AddRoom from "./AddRoom/AddRoom";
import AddUser from "./AddUser/AddUser";
import DeleteRoom from "./DeleteRoom/DeleteRoom";
import GetListRooms from "./GetListRooms/GetListRooms";
import GetListUser from "./GetListUser/GetListUser";
import GetNewToken from "./GetNewToken/GetNewToken";
import PutImage from "./PutImage/PutImage";
import UploadImage from "./UploadImage/UploadImage";
import UserLogin from "./UserLogin/UserLogin";

export const userLoginService = new UserLogin();
export const getListUserService = new GetListUser();
export const getNewTokenService = new GetNewToken();
export const addNewRoomService = new AddRoom();
export const addNewUserService = new AddUser();
export const getListRoomService = new GetListRooms();
export const uploadImageService = new UploadImage();
export const putImageService = new PutImage();
export const deleteRoomService = new DeleteRoom();