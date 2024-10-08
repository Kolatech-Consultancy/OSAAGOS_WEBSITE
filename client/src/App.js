import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/Homepage";
import DashboardOverview from "./components/AdminDashboard/AdminDashboard";
import AboutUs from "./components/AboutUs/AboutUs";
import SingleProfile from "./components/SingleProfile";
import ContactUs from "./components/ContactUs/ContactUs";
import NewsAndAnnouncements from "./components/NewsAndAnnouncements/NewsAnnouncements";
import AlumniProfile from "./components/AlumniProfile";
import Chat from "./components/Chat";
import JobBoard from "./components/JobBoard/JobBoard";
import Donations from "./components/Donations/Donations";
import MediaGallery from "./components/MediaGallery/MediaGallery";
import RegisterForm from "./components/ProfileForm";
import Login from "./components/Auth/login";
import SignUp from "./components/Auth/signup";
import ProfilePage from "./components/ProfileDisplay";
import AddEventForm from "./components/Events/EventForm";
import EventsPage from "./components/Events/EventsPage";
import AddNewsForm from "./components/NewsAndAnnouncements/NewsForm";
import Layout from "./Layout";
import AlumniList from "./components/AdminDashboard/Alumni/AlumniList";
import GroupsList from "./components/AdminDashboard/Groups/GroupsList";
import MembersList from "./components/AdminDashboard/Groups/Members/MembersList";
import ForumsList from "./components/AdminDashboard/Forum/ForumsList";
import PageNotFound from "./components/PageNotFound";
import GlobalStyles from "./GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";
import EventList from "./components/AdminDashboard/Events/EventsList";
import FundraisingCampaignList from "./components/AdminDashboard/FundraisingCampaign/FundraisingCampaignList";
import ProtectedRoute from "./components/ProtectedRoutes";
import UserProfilePage from "./ui/UserProfilePage";
import UserDashboardLayout from "./ui/UserDashboardLayout";
import UserChat from "./ui/UserChat";
import UpdateUserProfile from "./ui/UpdateUserProfile";
import UserGroups from "./ui/UserGroups";
import ResetPass from "./ui/ResetPass";
// import Reset from "./ui/Reset";
import CampaignOverview from "./components/AdminDashboard/FundraisingCampaign/CampaignOverview";
import NewsPage from "./components/AdminDashboard/News&Announcements/NewsPage";
import NewsOverview from "./components/AdminDashboard/News&Announcements/NewsOverview";
import AnalyticsPage from "./components/AdminDashboard/AnalyticsPage";
import PostsList from "./components/AdminDashboard/Posts/PostsList";
import AdminProfile from "./components/AdminDashboard/settings/Account";
import JobsList from "./components/AdminDashboard/JobBoard/JobsList";
import JobOverview from "./components/AdminDashboard/JobBoard/JobOverview";
import AdminGallery from "./components/AdminDashboard/Gallery/AdminGallery";
import MessagingApp from "./ui/UserMessage";
import { LoginUserProvider } from "./components/context/LoginUserContext";
import PostOverview from "./components/AdminDashboard/Posts/PostOverview";
import UserGroupMessagingApp from "./ui/UserGroupMessage";
import ForumGroupMessagingApp from "./ui/UserForumMessage";
import { GroupProvider } from "./components/context/MessagesContext";
import UserForum from "./ui/UserForum";

function App() {
  return (
    <>
      <GlobalStyles />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/search" element={<SingleProfile />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/news" element={<NewsAndAnnouncements />} />
              <Route path="/profile" element={<AlumniProfile />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/chat" element={<Chat sender="CurrentUser" />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/myprofile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/eventform" element={<AddEventForm />} />
              <Route path="/newsform" element={<AddNewsForm />} />
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <GroupProvider>
                      <LoginUserProvider>
                        <UserDashboardLayout />
                      </LoginUserProvider>
                    </GroupProvider>
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="chat" element={<UserChat />} />
                <Route path="chat/:id" element={<MessagingApp />} />
                <Route path="groups" element={<UserGroups />} />
                <Route path="forum" element={<UserForum />} />
                <Route path="groups/:id" element={<UserGroupMessagingApp />} />
                <Route path="forum/:id" element={<ForumGroupMessagingApp />} />
                <Route path="update-profile" element={<UpdateUserProfile />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="jobs" element={<JobBoard />} />
                <Route path="media" element={<MediaGallery />} />
              </Route>
            </Route>

            <Route path="/dashboard" element={<DashboardOverview />}>
              <Route index element={<AnalyticsPage />} />
              <Route path="alumni" element={<AlumniList />} />
              <Route path="events" element={<EventList />} />
              <Route
                path="fundraising-campaign"
                element={<FundraisingCampaignList />}
              />
              <Route
                path="campaign/:campaignId"
                element={<CampaignOverview />}
              />
              <Route path="news" element={<NewsPage />} />
              <Route path="news/:id" element={<NewsOverview />} />

              <Route path="groups" element={<GroupsList/>} />
              <Route path="groups/:groupId/members" element={<MembersList/>} />
              <Route path="forums" element={<ForumsList/>} />
              <Route path="forums/:forumId" element={<PostsList/>} />
              <Route path="forum/posts/:postId" element={<PostOverview/>}/>
              <Route path="admin/profile" element={<AdminProfile/>} />
              <Route path="jobs" element={<JobsList/>} />
              <Route path="jobs/:jobId" element={<JobOverview/>} />
              <Route path="gallery" element={<AdminGallery />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 2500,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;

//  {
//    /* <Route path="/" element={<HomePage />} />
//         <Route path="/dashboard" element={<DashboardOverview />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/search" element={<SingleProfile />} />
//         <Route path="/contactus" element={<ContactUs />} />
//         <Route path="/news" element={<NewsAndAnnouncements />} />
//         <Route path="/profile" element={<AlumniProfile />} />
//         <Route path="/jobs" element={<JobBoard />} />
//         <Route path="/donations" element={<Donations />} />
//         <Route path="/media" element={<MediaGallery />} />
//         <Route path="/chat" element={<Chat sender="CurrentUser" />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/myprofile" element={<ProfilePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/sign-up" element={<SignUp />} />
//         <Route path="/eventform" element={<AddEventForm />} />
//         <Route path="/events" element={<EventsPage />} />
//         <Route path="/newsform" element={<AddNewsForm />} /> */
//  }
