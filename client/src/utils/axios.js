import Axios from "axios";
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
    //   console.log(err)
        if(err.response.status === 401){
            
          window.location.href = "/login"
        console.log("error occured");
        }

  
    return Promise.reject(err);
})
export default axios;
