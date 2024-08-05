import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaChevronDown, FaPlus } from "react-icons/fa6";
// import "../../index.scss"
import {UpdateAlumniProfile } from "../../../services/api";

function EditAlumniProfile() {
    const [user, setUser] = useState(
        {
            address: "",
            phone: "",
            degree: "",
            graduationYear: "",
            jobTitle: "",
            company: "",
            photo: "",
        }
    )
    let isMounted = true
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             setLoader(true)
    //             const response = await GetUserProfile()
    //             setUser(()=> response.data)
    //             console.log(user);
    //         } catch (error) {
    //             setError(true)
    //             console.log(error);
    //         } finally {
    //             setLoader(false)
    //             setError(false)
    //         }
    //     }
    //     if (isMounted) fetchUser()
    //     return ()=> {
    //         isMounted = false
    //     }
    // }, [])

    const HandleUpdate = async (ev)=>{
        ev.preventDefault()
        try {
            const data = {
                "personalDetails": {
                    "address": user.address,
                    "phone": user.phone
                },
                "educationalDetails": {
                    "degree": user.degree,
                    "graduationYear": user.graduationYear
                },
                "professionalDetails": {
                    "jobTitle": user.jobTitle,
                    "company": user.company
                }
            }
            const profilePicture = user.photo
            console.log(user);
            const response = await UpdateAlumniProfile({data, profilePicture})
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>
            <main className="bg-white px-8 flex flex-col gap-10 rounded-lg py-5">
                <header className="">
                    <div className="flex gap-3 items-center">
                        <FaArrowLeft />
                        <span>Go Back</span>
                    </div>
                </header>
                
                <form action="" className="w-full sm:w-3/4 mx-auto mt-20 " onSubmit={(ev)=> HandleUpdate(ev)}>
                <h1 className="text-4xl font-bold mb-14">Alumni Profile</h1>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="Address">
                            Address
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Address" value={user.address} onChange={(ev)=> setUser({...user, address:ev.target.value})} type="text" required placeholder="e.g no 2, Niger state, Nigeria" />

                    </div>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="phone">
                            Phone Number
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phone" value={user.phone} onChange={(ev)=> setUser({...user, phone:ev.target.value})} type="text" required placeholder="e.g 700 00000 673" />

                    </div>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="degree">
                            Degree
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="degree" value={user.degree} onChange={(ev)=> setUser({...user, degree:ev.target.value})} type="text" required placeholder="e.g B.sc Engineering" />

                    </div>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="graduationYear">
                            Graduation Year
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="graduationYear" value={user.graduationYear} onChange={(ev)=> setUser({...user, graduationYear:ev.target.value})} type="text" required placeholder="e.g 2017" />

                    </div>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="jobTitle">
                            Job Title
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="jobTitle" value={user.jobTitle} onChange={(ev)=> setUser({...user, jobTitle:ev.target.value})} type="text" required placeholder="e.g Software developer" />

                    </div>
                    <div className="w-full px-3 mb-14">
                        <label className="block uppercase  text-gray-700 text-xl font-medium mb-4" htmlFor="company">
                           Company
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-xl py-6 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="company" value={user.company} onChange={(ev)=> setUser({...user, company:ev.target.value})} type="text" required placeholder="e.g O'Bounce ltd" />

                    </div>
                   
                    <div className=" text-end px-3 mb-14">
                        <div className="mb-6">
                            <input type="file" name="" hidden id="file"  onChange={(ev)=> setUser({...user, photo:ev.target.files[0]})} />
                            <button type="button" className=" w-full ring ring-blue-200 p-3 text-3xl text-blue-500 rounded-lg" onClick={()=> document.getElementById("file").click()}>Upload Picture</button>
                        </div>
                        <button className=" w-full bg-blue-600  p-3 text-white rounded-lg " type="submit" >Edit profile</button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default EditAlumniProfile;