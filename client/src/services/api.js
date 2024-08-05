import axios from "../utils/axios"

export const GetAlumni = ()=>{
    return axios.get("/api/admin/alumni")
}
export const UpdateAlumniProfile = (param)=>{
    return axios.put("/api/alumni/profile", param)
}