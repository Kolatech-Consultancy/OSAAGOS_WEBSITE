import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateAlumni } from "../../../services/api";
import SpinnerMini from "../../SpinnerMini";

function AddUserModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: "", 
        email: "", 
        password: "", 
        graduationYear: "", 
        fieldOfStudy: "", 
        profession: ""
    })
    const [loading, setLoading] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const HandleCreateAlumni = async (ev)=>{
        ev.preventDefault()
        try {
            setLoading(true)
            const data = {
                name: userData.name, 
                email: userData.email, 
                password: userData.password, 
                graduationYear: userData.graduationYear, 
                fieldOfStudy: userData.fieldOfStudy, 
                profession: userData.profession
            }
            const response = await CreateAlumni(data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
            setUserData({
                name: "", 
                email: "", 
                password: "", 
                graduationYear: "", 
                fieldOfStudy: "", 
                professionalDetails: ""
            })
            toggleModal()
        }
    }

    return (
        <>
            <button onClick={toggleModal} className=" ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-36 text-slate-50 p-4 flex items-center justify-center gap-3 rounded-lg focus:outline-none">
                <FaPlus />
                <span>Add User</span>
            </button>
            <div className=" bg-gray-100">

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-lg">
                            <h2 className="text-2xl font-bold mb-4">Add User</h2>
                            <button
                                onClick={toggleModal}
                                className="absolute top-0 text-3xl right-0 mt-2 mr-4 text-gray-500 hover:text-gray-800"
                            >
                                &times;
                            </button>                            <hr />
                            <form action="" onSubmit={(ev)=> HandleCreateAlumni(ev)} className="w-full overflow-y-scroll mb-6" style={{ height: "75vh" }}>
                                <div className="w-full px-3 mt-8">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" value={userData.name} onChange={(ev)=>setUserData({...userData, name:ev.target.value})} type="text" required />
                                </div>
                                <div className="w-full px-3 mt-5">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="text" value={userData.email} onChange={(ev)=>setUserData({...userData, email:ev.target.value})} required />
                                </div>
                                <div className="w-full px-3 mt-5">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="password" type="password" value={userData.password} onChange={(ev)=>setUserData({...userData, password:ev.target.value})} required />
                                </div>
                                <div className="w-full px-3 mt-5">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="graduationYear">
                                        Graduation Year
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="graduationYear" type="text" value={userData.graduationYear} onChange={(ev)=>setUserData({...userData, graduationYear:ev.target.value})} required />
                                </div>
                                <div className="w-full px-3 mt-5">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="fieldOfStudy">
                                        Field of Study
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="fieldOfStudy" type="text" value={userData.fieldOfStudy} onChange={(ev)=>setUserData({...userData, fieldOfStudy:ev.target.value})} required />
                                </div>
                                <div className="w-full px-3 mt-5">
                                    <label className="block uppercase  text-gray-700 text-sm font-medium mb-2" htmlFor="profession">
                                        Profession
                                    </label>
                                    <input className="appearance-none block w-full bg-white text-gray-700 border border-slate-200  rounded-lg px-4 py-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="profession" type="text" value={userData.profession} onChange={(ev)=>setUserData({...userData, profession:ev.target.value})} required />
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <button
                                        onClick={toggleModal}
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-3 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                    type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-3 focus:outline-none"
                                    >
                                    {loading ? <SpinnerMini/> : "Add User"}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddUserModal;