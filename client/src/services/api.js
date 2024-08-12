import axios from "../utils/axios"

export const AdminDashboard = () => {
    return axios.get("/api/users/admin/dashboard")
}
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

export const getAnalytics = async () => {
    return axios.get(`/api/admin/analytics`)
};



export const getCampaigns = async () => {
    return axios.get("/api/campaigns")
};

export const addCampaign = async (campaign) => {
    return axios.post("/api/campaigns", campaign)
};

export const editCampaign = async (id, updatedcampaign) => {
    return axios.put(`/api/campaigns/${id}`, updatedcampaign)
};

// export const deleteEvent = async (id) => {
//     return axios.delete(`/api/campaigns/events/${id}`)
// };

export const getSingleCampaign = async (campaignId) => {
    return axios.get(`/api/campaigns/${campaignId}`)
};
export const getCampaignDonations = async (campaignId) => {
    return axios.get(`/api/donations/campaign/${campaignId}`)
};
export const getNews = async () => {
    return axios.get(`/api/admin/news`)
};
export const getNewsById = async (id) => {
    return axios.get(`/api/news/${id}`)
};
export const editNews = async (id) => {
    return axios.put(`/api/admin/news/${id}`)
};
export const addNews = async (news) => {
    return axios.post("/api/admin/news", news)
};
// export const editNews = async (id, updatednews) => {
//     return axios.put(`/api/news/${id}`, updatednews)
// };
export const deleteNews = async (id) => {
    return axios.delete(`/api/admin/news/${id}`)
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
