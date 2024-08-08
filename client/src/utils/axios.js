import Axios from "axios";
import toast from "react-hot-toast";
import Is_authorized from "./authorization";
// import router from "@/routes";

const axios = Axios.create({
    baseURL: "https://osaagos-api-alumni-website.onrender.com",
    headers: {
        "Content-Type": "application/json",

    }
})

const axiosConfiguration = (config) => {
    const token = Is_authorized()
    if (token) {
        config.headers = {
            ...config.headers,
            "authorization":`Bearer ${token}`
        }
        
    }
    return config;
}
axios.interceptors.request.use(axiosConfiguration);

axios.interceptors.response.use(res => res,err =>{
        if(err.response.status === 401 || err.response.status === 403 ){
            toast.error("Access denied!")
          window.location.href = "/login"
        }

  
    return Promise.reject(err);
})
export default axios;
