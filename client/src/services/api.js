import axios from "../utils/axios"


//admin routes
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

export const deleteNews = async (id) => {
    return axios.delete(`/api/admin/news/${id}`)
};
// ggroup

export const getGroup = async () => {
    return axios.get(`/api/admin/group`)
};
export const editGroup = async (id) => {
    return axios.put(`/api/admin/groups/${id}`)
};
export const addGroup = async (group) => {
    return axios.post("/api/admin/group", group)
};
export const deleteGroup = async (id) => {
    return axios.delete(`/api/admin/group/${id}`)
};

//forum
export const getForum = async () => {
    return axios.get(`/api/admin/forum/`)
};
export const getForumById = async (forumId) => {
    return axios.get(`/api/admin/forum/${forumId}`)
};
export const editForum = async (id) => {
    return axios.put(`/api/admin/forum/${id}`)
};
export const approveForum= async (id) => {
    return axios.post(`/api/admin/forum/${id}/approve`)
};
export const denyForum= async (id) => {
    return axios.post(`/api/admin/forum/${id}/deny`)
};
export const addForum = async (Forum) => {
    return axios.post("/api/admin/forum", Forum)
};
export const deleteForum = async (id) => {
    return axios.delete(`/api/admin/forum/${id}`)
};
export const getPost = async (forumId) => {
    return axios.get(`/api/admin/forums/${forumId}/posts`)
};
export const getPostById = async (postId) => {
    return axios.get(`/api/admin/forums/posts/${postId}`)
};
export const editPost = async (id, data) => {
    return axios.put(`/api/admin/forums/posts/${id}`, data)
};
export const addPost = async (forumId, post) => {
    return axios.post(`/api/admin/forums/${forumId}/posts`, post)
};
export const deletePost = async (postId) => {
    return axios.delete(`/api/admin/forums/posts/${postId}`)
};

//job
export const getJob = async () => {
    return axios.get(`/api/admin/jobs`)
};
export const getJobById = async (jobId) => {
    return axios.get(`/api/admin/jobs/${jobId}`)
};
export const editJob = async (id, job) => {
    return axios.put(`/api/admin/jobs/${id}`, job)
};
export const addJob = async (job) => {
    return axios.post(`/api/admin/jobs/`, job)
};
export const deleteJob = async (id) => {
    return axios.delete(`/api/admin/jobs/${id}`)
};

//admin routes
export const GetOneUser = () => {
    return axios.get("/api/users/profile");
};
export const UpdateOneUser = (param) => {
    return axios.put("/api/users/profile", param);
};
export const UpdateUsersProfile = (param) => {
    return axios.put("/api/users/profile", param, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
       
};

export const getAllEvents = () => {
    return axios.get("/api/events");
};
export const getAllGroups = () => {
    return axios.get("/api/groups");
};

export const getAllForums = () => {
    return axios.get("/api/forums");
}
