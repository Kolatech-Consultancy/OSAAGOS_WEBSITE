import axios from "../utils/axios"

export const GetAlumni = () => {
    return axios.get("/api/admin/alumni")
}
export const updateAlumniProfile = (param, data) => {
    return axios.put(`/api/admin/alumni/${param}`, data)
}
export const deleteAlumniProfile = (param) => {
    return axios.delete(`/api/admin/alumni/${param}`)
}
export const CreateAlumni = (data) => {
    return axios.post("/api/admin/alumni", data)
}

export const getEvents = async () => {
    return axios.get("/api/admin/events")
};

export const addEvent = async (event) => {
    return axios.post("/api/admin/events", event)
};

export const editEvent = async (id, updatedEvent) => {
    return axios.put(`/api/admin/events/${id}`, updatedEvent)
};

export const deleteEvent = async (id) => {
    return axios.delete(`/api/admin/events/${id}`)
};

export const GetOneUser = () => {
  return axios.get("/api/users/profile");
};
export const UpdateOneUser = (param) => {
  return axios.put("/api/users/profile", param);
};
export const UpdateUsersProfile = (param) => {
  return axios.put("/api/users/profile", param);
};

export const getAllEvents = () => {
  return axios.get("/api/events");
};
export const getAllGroups = () => {
  return axios.get("/api/groups");
};
