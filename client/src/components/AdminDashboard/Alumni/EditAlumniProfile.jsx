// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
// import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaChevronDown, FaPlus } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GetAlumni, updateAlumniProfile } from "../../../services/api";
import SpinnerMini from "../../SpinnerMini";
import Breadcum from "../breadcum";
// import "../../index.scss"
// import {UpdateAlumniProfile } from "../../../services/api";

function EditAlumniProfile() {
    const [user, setUser] = useState(
        {
            name:"",
            password:"",
            // location: "",
            // phone: "",
            fieldOfStudy: "",
            graduationYear: "",
            profession: "",
            // company: "",
        }
    )
    const navigate = useNavigate(null)
    const [loader, setLoader] = useState(false)
    const {id} = useParams()



   
    const HandleUpdate = async (ev)=>{
        ev.preventDefault()
        try {
            setLoader(true)
            const data = {
                name:user?.name,
                password:user?.password,
                // location: user.location,
                // phone: user.phone,
                fieldOfStudy: user?.fieldOfStudy,
                graduationYear: user?.graduationYear,
                profession: user?.profession,
                // company: user.company,
            }
            console.log(user);
            const response = await updateAlumniProfile(id,data)
            console.log(response.data);
            toast.success("User details updated successfully");
            navigate(-1)
        } catch (error) {
            console.log(error);
            toast.error("Wrong details");
        }finally{
            setLoader(false)
        }
    }




    return (
        <>
            <main className="bg-white px-5 flex flex-col gap-10 rounded-lg py-5">
                <Breadcum/>

                <form action="" onSubmit={(ev)=>HandleUpdate(ev)} className="w-full md:w-3/4 mx-auto mt-5">
                    <h1 className="text-3xl font-bold mb-14">Alumni Profile</h1>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="_id">
                            User ID
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="_id" value={id} type="text" readOnly  />

                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" value={user.name} onChange={(ev) => setUser({ ...user, name: ev.target.value })} type="text" required placeholder="e.g Almer Hooks" />

                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" value={user.password} onChange={(ev) => setUser({ ...user, password: ev.target.value })} type="password" required placeholder="*********" />

                    </div>
                    {/* <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                            Location
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="location" value={user.location} onChange={(ev) => setUser({ ...user, location: ev.target.value })} type="text" required placeholder="Nigeria" />

                    </div> */}
                    {/* <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phone" value={user.phone} onChange={(ev) => setUser({ ...user, phone: ev.target.value })} type="text" required placeholder="e.g 700 00000 673" />

                    </div> */}
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="fieldOfStudy">
                            FieldOfStudy
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="fieldOfStudy" value={user.fieldOfStudy} onChange={(ev) => setUser({ ...user, fieldOfStudy: ev.target.value })} type="text" required placeholder="e.g B.sc Engineering" />

                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="graduationYear">
                            Graduation Year
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="graduationYear" value={user.graduationYear} onChange={(ev) => setUser({ ...user, graduationYear: ev.target.value })} type="text" required placeholder="e.g 2017" />

                    </div>
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="profession">
                            Profession
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profession" value={user.profession} onChange={(ev) => setUser({ ...user, profession: ev.target.value })} type="text" required placeholder="e.g Software developer" />

                    </div>
                    {/* <div className="w-full px-3 mb-6">
                        <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="company">
                            Company
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="company" value={user.company} onChange={(ev) => setUser({ ...user, company: ev.target.value })} type="text" required placeholder="e.g O'Bounce ltd" />

                    </div> */}

                    <div className="px-3 mb-6">
                        {/* <div className="mb-6">
                            <input type="file" name="" hidden id="file" onChange={(ev) => setUser({ ...user, photo: ev.target.files[0] })} />
                            <button type="button" className=" w-full ring ring-blue-200 px-3 py-2 text-base text-blue-500 rounded-lg focus:outline-none" onClick={() => document.getElementById("file").click()}>Upload Picture</button>
                        </div> */}
                        <button className=" w-full bg-blue-600  p-3 text-white rounded-lg flex items-center justify-center focus:outline-none " type="submit" >
                            {loader? <SpinnerMini/> : "Edit profile"}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default EditAlumniProfile;