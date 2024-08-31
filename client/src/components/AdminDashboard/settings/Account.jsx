import React, { useState, useEffect } from 'react';
import { GetOneUser, UpdateUsersProfile } from '../../../services/api';
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "", email: "", education: "", password: "",phone: "", profilePicture: "", profession: "", graduationYear: "", fieldOfStudy: "", company: "", address: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(false);
  let isMounted = true

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        let response = await GetOneUser();
        response.data.password = ''
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isMounted) fetchUserDetails();

    return () => {
      isMounted = false
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleFileChange = (ev) => {
    const profilePicture = ev.target.files[0];
    console.log(profilePicture);
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      profilePicture,
    }));
  };




  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const formData = new FormData();
      for (const key in userDetails) {
        if (userDetails[key]) {
          formData.append(key, userDetails[key]);
        }
      }
     const response = await UpdateUsersProfile(formData);
     setUserDetails(response.data)
      toast.success('Details updated successfully');
      
      // window.location.reload()
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error updating details');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" w-full h-full bg-white rounded-lg px-2 sm:px-10 py-6">
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <SpinnerMini />
        </div>
      ) : error ? (
        <p className="h-full w-full flex justify-center items-center text-xl text-red-500">Failed to load user details. Please try again.</p>
      ) : (
        <form onSubmit={handleUpdateDetails} className='text-gray-500'>
          <p className="mb-3 leading-7">
            <header className='leading-2 font-bold text-xl'>Account</header>
            <small className='leading-2 font-medium text-sm sm:text-base'>Real-time infomation and activities of your account</small>
          </p>
          <hr className='border-gray-400' />
          <div className='my-6 flex flex-wrap sm:flex-nowrap items-center gap-3 justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-[7rem] h-[7rem] rounded-full border'>
                <img src={userDetails.profilePicture} className='max-h-full max-w-full' alt="" />
              </div>
              <p className="leading-5">
                <header className='leading-2 font-medium text-lg'>Profile picture</header>
                <small className='leading-2'>PNG, JPEG under 1MB</small>
              </p>
            </div>
            <div>
              <input type="file" name='profilePicture' id='file' hidden onChange={handleFileChange} />
              <button type='button' className='w-fit p-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white font-medium' onClick={() => document.getElementById("file").click()}>Upload new picture</button>
            </div>
          </div>
          <div className="my-6">
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-lg"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <hr className='border-gray-400' />
          <div className="my-6 w-full">
            <p className="leading-5">
              <header className='leading-2 font-medium text-lg'>Contact email and phone number</header>
              <small className='leading-2'>Manage your account email address and phone number</small>
            </p>
            <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-6 w-full'>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder='07000000011'
                  value={userDetails?.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <hr className='border-gray-400' />
          <div className="my-6 w-full">
            <p className="leading-5">
              <header className='leading-2 font-medium text-lg'>Password and Address</header>
              <small className='leading-2'>Modify your current password and Address</small>
            </p>
            <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-6 w-full'>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={userDetails.password}
                  placeholder='********'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder='07000000011'
                  value={userDetails?.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <hr className='border-gray-400' />
          <div className="my-6 w-full">
            <p className="leading-5">
              <header className='leading-2 font-medium text-lg'>Educational and Professional Details</header>
              <small className='leading-2'>Modify your education and current professional details </small>
            </p>
            <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-6 w-full'>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Education Degree</label>
                <input
                  type="text"
                  name="education"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={userDetails.education}
                  placeholder='B.Sc, GED, ...'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder='Engineering'
                  value={userDetails?.fieldOfStudy}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-6 w-full'>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={userDetails.graduationYear}
                  placeholder='2001'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='w-full'>
                <label className="block mb-2 text-sm font-medium">Profession</label>
                <input
                  type="text"
                  name="profession"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder='Software engineer'
                  value={userDetails?.profession}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='w-full mt-6'>
              <label className="block mb-2 text-sm font-medium">Company</label>
              <input
                type="text"
                name="company"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="O'Bounce ltd."
                value={userDetails?.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isUpdating}
            >
              {isUpdating ? <SpinnerMini /> : 'Update Details'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfile;
