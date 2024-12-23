import { user } from "../type";
import { request } from "../utils";
function registerApi(data:user) {
  return request({
    url: "/user/",
    method: "POST",
    data
  })
}

function loginApi(data:{email:string, password:string}) {
    return request({
        url: "/auth",
        method: "POST",
        data
    })
}

export { registerApi, loginApi };