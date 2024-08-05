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
import Overview from "./components/AdminDashboard/Overview";
import UsersProfile from "./components/AdminDashboard/Alumni/usersProfile";
import AlumniProfiles from "./components/AdminDashboard/Alumni/AlumniProfiles";
import PageNotFound from "./components/PageNotFound"
import GlobalStyles from "./GlobalStyles";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

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
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/media" element={<MediaGallery />} />
              <Route path="/chat" element={<Chat sender="CurrentUser" />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/myprofile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/eventform" element={<AddEventForm />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/newsform" element={<AddNewsForm />} />
            </Route>
            <Route path="/dashboard" element={<DashboardOverview />} >
            <Route index element={<Overview/>}/>
            <Route path="alumni" element={<AlumniProfiles/>}/>
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
