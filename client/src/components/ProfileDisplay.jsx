import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

function ProfilePage() {

  const navigate = useNavigate()
    const dummyUser = {
        personalDetails: {
            fullName: 'Oyesola Ibrahim',
            email: 'oyesolaibrahim@example.com',
            phoneNumber: '+2348156789560',
            dateOfBirth: '1990-01-01',
            gender: 'Male',
            address: '123 Main St, Bodija, Ibadan',
            profilePicture: 'https://via.placeholder.com/150',
            socialMediaLinks: {
                linkedin: 'https://linkedin.com/in/johndoe',
                facebook: 'https://facebook.com/johndoe',
                twitter: 'https://twitter.com/johndoe',
                instagram: 'https://instagram.com/johndoe'
            }
        },
        educationalDetails: {
            institutionName: 'Example University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            graduationYear: '2012',
            additionalCertifications: 'Certified Java Developer',
            honorsAndAwards: 'Summa Cum Laude',
            clubsAndSocieties: 'Computer Science Club'
        },
        professionalDetails: {
            currentJobTitle: 'Software Engineer',
            currentEmployer: 'Tech Company',
            previousJobs: 'Junior Developer at Web Solutions',
            skills: 'JavaScript, React, Node.js',
            professionalCertifications: 'AWS Certified Solutions Architect',
            professionalAchievements: 'Developed a successful e-commerce platform',
            industry: 'Technology',
            professionalWebsite: 'https://johndoe.dev'
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchButtonClick = () => {
        navigate("/search")
    };

    return (
        <div className="p-10">
            <div className="mb-6 flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search alumni..."
                    className="w-full h-12 px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <button
                    onClick={handleSearchButtonClick}
                    className="h-12 px-4 py-2 text-white bg-orange-400 rounded-r-md shadow-sm hover:bg-orange-500 focus:outline-none"
                >
                    Search
                </button>
            </div>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url('https://via.placeholder.com/1200x400')` }}>
                    <div className="flex justify-center items-center h-full">
                        <img className="h-32 w-32 rounded-full border-4 border-white shadow-lg" src={dummyUser.personalDetails.profilePicture} alt="Profile" />
                    </div>
                </div>
                <div className="p-6">
                    <h1 className="text-3xl font-semibold mb-2">{dummyUser.personalDetails.fullName}</h1>
                    <p className="text-gray-700 mb-4">{dummyUser.personalDetails.email}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">Personal Details</h2>
                            <p><strong>Phone:</strong> {dummyUser.personalDetails.phoneNumber}</p>
                            <p><strong>Date of Birth:</strong> {dummyUser.personalDetails.dateOfBirth}</p>
                            <p><strong>Gender:</strong> {dummyUser.personalDetails.gender}</p>
                            <p><strong>Address:</strong> {dummyUser.personalDetails.address}</p>
                            <div className="flex space-x-4 mt-2">
                                <a href={dummyUser.personalDetails.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">LinkedIn</a>
                                <a href={dummyUser.personalDetails.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>
                                <a href={dummyUser.personalDetails.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600">Twitter</a>
                                <a href={dummyUser.personalDetails.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600">Instagram</a>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Educational Details</h2>
                            <p><strong>Institution:</strong> {dummyUser.educationalDetails.institutionName}</p>
                            <p><strong>Degree:</strong> {dummyUser.educationalDetails.degree}</p>
                            <p><strong>Field of Study:</strong> {dummyUser.educationalDetails.fieldOfStudy}</p>
                            <p><strong>Graduation Year:</strong> {dummyUser.educationalDetails.graduationYear}</p>
                            <p><strong>Certifications:</strong> {dummyUser.educationalDetails.additionalCertifications}</p>
                            <p><strong>Honors:</strong> {dummyUser.educationalDetails.honorsAndAwards}</p>
                            <p><strong>Clubs:</strong> {dummyUser.educationalDetails.clubsAndSocieties}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Professional Details</h2>
                        <p><strong>Current Job:</strong> {dummyUser.professionalDetails.currentJobTitle}</p>
                        <p><strong>Employer:</strong> {dummyUser.professionalDetails.currentEmployer}</p>
                        <p><strong>Previous Jobs:</strong> {dummyUser.professionalDetails.previousJobs}</p>
                        <p><strong>Skills:</strong> {dummyUser.professionalDetails.skills}</p>
                        <p><strong>Certifications:</strong> {dummyUser.professionalDetails.professionalCertifications}</p>
                        <p><strong>Achievements:</strong> {dummyUser.professionalDetails.professionalAchievements}</p>
                        <p><strong>Industry:</strong> {dummyUser.professionalDetails.industry}</p>
                        <p><strong>Website:</strong> <a href={dummyUser.professionalDetails.professionalWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600">Visit</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

// import React from 'react';

// const ProfilePage = ({ user }) => {
//     return (
//         <div className="min-h-screen p-4 sm:p-20 bg-gray-100">
//             <h1 className="text-4xl text-center font-semibold mb-8">Profile Page</h1>
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start">
//                     <img
//                         src={user.profilePicture}
//                         alt="Profile"
//                         className="w-40 h-40 rounded-full border-2 border-gray-300 mb-4 sm:mb-0 sm:mr-6"
//                     />
//                     <div className="text-center sm:text-left">
//                         <h2 className="text-3xl font-bold">{user.fullName}</h2>
//                         <p className="text-lg text-gray-600">{user.email}</p>
//                         <p className="text-lg text-gray-600">{user.phoneNumber}</p>
//                         <p className="text-lg text-gray-600">{user.address}</p>
//                         <div className="flex space-x-4 mt-4">
//                             {user.socialMediaLinks && user.socialMediaLinks.map((link, index) => (
//                                 <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">
//                                     {link.platform}
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-8">
//                     <h3 className="text-2xl font-semibold mb-4">Personal Details</h3>
//                     <p><strong>Date of Birth:</strong> {user.dob}</p>
//                     <p><strong>Gender:</strong> {user.gender}</p>
//                 </div>
//                 <div className="mt-8">
//                     <h3 className="text-2xl font-semibold mb-4">Educational Details</h3>
//                     <p><strong>Institution Name:</strong> {user.institutionName}</p>
//                     <p><strong>Degree:</strong> {user.degree}</p>
//                     <p><strong>Field of Study:</strong> {user.fieldOfStudy}</p>
//                     <p><strong>Graduation Year:</strong> {user.graduationYear}</p>
//                     {user.additionalCertifications && <p><strong>Additional Certifications:</strong> {user.additionalCertifications}</p>}
//                     {user.honorsAndAwards && <p><strong>Honors and Awards:</strong> {user.honorsAndAwards}</p>}
//                     {user.clubsAndSocieties && <p><strong>Clubs and Societies:</strong> {user.clubsAndSocieties}</p>}
//                 </div>
//                 <div className="mt-8">
//                     <h3 className="text-2xl font-semibold mb-4">Professional Details</h3>
//                     <p><strong>Current Job Title:</strong> {user.currentJobTitle}</p>
//                     <p><strong>Current Employer:</strong> {user.currentEmployer}</p>
//                     <p><strong>Previous Jobs:</strong> {user.previousJobs}</p>
//                     <p><strong>Skills:</strong> {user.skills}</p>
//                     {user.professionalCertifications && <p><strong>Professional Certifications:</strong> {user.professionalCertifications}</p>}
//                     {user.professionalAchievements && <p><strong>Professional Achievements:</strong> {user.professionalAchievements}</p>}
//                     {user.industry && <p><strong>Industry:</strong> {user.industry}</p>}
//                     {user.professionalWebsite && <p><strong>Professional Website:</strong> <a href={user.professionalWebsite} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-500">{user.professionalWebsite}</a></p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
