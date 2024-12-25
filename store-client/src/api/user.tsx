import { user } from "../type";
import { request } from "../utils";
function registerApi(data: user) {
  return request({
    url: "/user/",
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
export { registerApi, loginApi, getbyuseridApi };