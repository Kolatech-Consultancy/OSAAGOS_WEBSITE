import axios from "../utils/axios"

export const GetAlumni = ()=>{
    return axios.get("/api/admin/alumni")
}
export const updateAlumniProfile = (param, data)=>{
    return axios.put(`/api/admin/alumni/${param}`, data)
}
export const deleteAlumniProfile = (param)=>{
    return axios.delete(`/api/admin/alumni/${param}`)
}
export const CreateAlumni = (data)=>{
    return axios.post("/api/admin/alumni", data)
}