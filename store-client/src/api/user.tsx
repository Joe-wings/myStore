import { user } from "../type";
import { request } from "../utils";
function registerApi(data: user) {
  return request({
    url: "/users/",
    method: "POST",
    data
  })
}

function loginApi(data: { email: string, password: string }) {
  return request({
    url: "/auth",
    method: "POST",
    data
  })
}
function getbyuseridApi(id: number) {
  return request({
    url: `/users/getbyid/${id}`,
    method: "GET"
  })
}

function getallusersApi() {
  return request({
    url: "/users/",
    method: "GET"
  })
}

export { registerApi, loginApi, getbyuseridApi,getallusersApi };