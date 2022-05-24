import Axios from 'axios';

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

export function getDataWithAuto2(id) {
  return instance.get(
    `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/user/rooms?page=${id}`,
    {
      headers: {
        Authorization: "Bearer " + getLocalToken(), // headers token
      },
    }
  );
}


export function InstanceLogin() {
  return instance.post(
    "https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1/admin/auth/login",
    {
      email: "admin@gmail.com",
      password: "admin123",
    }
  );
}


