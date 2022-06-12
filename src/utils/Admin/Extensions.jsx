import Axios from 'axios';
import swal2 from 'sweetalert2';
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getLocalToken() {
  const token = window.localStorage.getItem("token");

  return token;
}

export function getLocalRefreshToken() {
  const token = window.localStorage.getItem("refreshToken");
  return token;
}

export const instance = Axios.create({
    baseURL:
      "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1",
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
});

export function getToken() {
    return instance.post(
      "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/auth/login",
      {
        email: "admin@gmail.com",
        password: "admin123",
      }
    );
}

export function refreshToken() {
  return instance.get(
    "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/user/auth/refresh",
    {
      headers: {
        Authorization: "Bearer " + getLocalRefreshToken(),
      },
    }
  );
}

export function ApproveRoom(id) {
  return instance.post(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/rooms/approveRoom/${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  )
}

export function getDataWithAuto(id) {
  return instance.get(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/users?page=${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  );
}

export function getDataWithAuto2(id,owner) {
  return instance.get(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/${owner}/rooms?page=${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  );
}

export function getRoomsNotApproved(id) {
  return instance.get(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/rooms/notApproved?page=${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  );
}


export function InstanceLogin(data) {
  return instance.post(
    "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/auth/login",
    {
      email: data.email,
      password: data.password,
    }
  );
}

export function uploadImage(id) {
  return instance.get(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/medias/presign?fileExtension=jpg&userId=${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  )
}

export function PutImage(file,link) {
  return instance.put(
    `${link}`,
    file
  );
}

export function CreateMedia(roomId,url) {
  return instance.post(
    "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/medias",
    {
      roomId: parseInt(roomId),
      url:url,
      type: "Image"
    },
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }

  )
}


export function DeleteLocation(id) {
  return instance.delete(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/rooms/${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  )
}


export function CreateLocation(data) {
  return instance.post(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/locations`,
    {
      displayName:data.displayName,
      longitude:parseFloat(data.longitude),
      latitude:parseFloat(data.latitude),
      name:data.name
    },
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  )
}


export function CreateRoom(data) {
  return instance.post(
    "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/host/rooms",
    {
      homeType: data.homeType,
      name: data.name,
      roomType: data.roomType,
      totalOccupancy: parseInt(data.totalOccupancy),
      totalBedrooms:   parseInt(data.totalBedrooms),
      totalBathrooms: parseInt(data.totalBathrooms),
      summary: data.summary,
      address: data.address,
      hasTv:data.hasTv,
      hasKitchen:data.hasKitchen,
      hasAirCon:data.hasAirCon,
      hasHeating:data.hasHeating,
      hasInternet:data.hasInternet,
      price: parseInt(data.price),
      rating:parseInt(data.rating),
      longtitude:parseFloat(data.longtitude),
      latitude:parseFloat(data.latitude),
      location:parseInt(data.location)
    },
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  )
}



