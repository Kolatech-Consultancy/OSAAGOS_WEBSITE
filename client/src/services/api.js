import axios from "../utils/axios";

export const GetAlumni = () => {
  return axios.get("/api/admin/alumni");
};
export const UpdateAlumniProfile = (param) => {
  return axios.put("/api/alumni/profile", param);
};
export const CreateAlumni = (data) => {
  return axios.post("/api/admin/alumni", data);
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