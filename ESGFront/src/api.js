import axios from "axios";

// http://esg.kbtu.kz/
// http://127.0.0.1:8000/
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true,
})

const access = localStorage.getItem("access");
if (access) {
  api.defaults.headers.common["Authorization"] = `JWT ${access}`;
}

export default api