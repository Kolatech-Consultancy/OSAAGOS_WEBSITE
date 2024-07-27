import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/Homepage';
import DashboardOverview from './components/AdminDashboard/AdminDashboard';
import AboutUs from './components/AboutUs/AboutUs';
import SingleProfile from './components/SingleProfile';
import ContactUs from './components/ContactUs/ContactUs';
import NewsAndAnnouncements from './components/NewsAndAnnouncements/NewsAnnouncements';
import AlumniProfile from './components/AlumniProfile';
import Chat from './components/Chat';
import JobBoard from './components/JobBoard/JobBoard';
import Donations from './components/Donations/Donations';
import MediaGallery from './components/MediaGallery/MediaGallery';
import RegisterForm from './components/ProfileForm';
import Login from './components/Auth/login';
import SignUp from './components/Auth/signup';
import ProfilePage from './components/ProfileDisplay';
import AddEventForm from './components/Events/EventForm';
import EventsPage from './components/Events/EventsPage';
import AddNewsForm from './components/NewsAndAnnouncements/NewsForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardOverview />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/search' element={<SingleProfile />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/news' element={<NewsAndAnnouncements />} />
        <Route path='/profile' element={<AlumniProfile />} />
        <Route path='/jobs' element={<JobBoard />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/media' element={<MediaGallery />} />
        <Route path='/chat' element={<Chat sender="CurrentUser" />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/myprofile' element={<ProfilePage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/eventform' element={<AddEventForm/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/newsform' element={<AddNewsForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
