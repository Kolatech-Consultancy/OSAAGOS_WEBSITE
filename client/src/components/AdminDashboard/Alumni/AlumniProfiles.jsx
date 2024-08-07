import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown, FaEdit, FaEllipsisH, FaEllipsisV, FaList, FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../../../index.scss"
import { deleteAlumniProfile, GetAlumni } from "../../../services/api";
import SpinnerMini from "../../SpinnerMini";
import Breadcum from "../breadcum";
import AddUserModal from "./AddUserModal";
import DeleteProfile from "./DeleteProfile";

function AlumniProfiles() {
    const [Alumni, setAlumni] = useState([])
    let isMounted = true
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [alumniToDelete, setAlumniToDelete] = useState(null);
    const [IsDeleting, setIsDeleting] = useState(false)

    const toggleDropdown = (index, event) => {
        event.stopPropagation();
        setIsOpen((prev) => (prev === index ? null : index));
    };


    const openDeleteModal = (alumni) => {
        setAlumniToDelete(alumni);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setAlumniToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        
        try {
           setIsDeleting(true)
            const response = await deleteAlumniProfile(alumniToDelete._id)
            toast.success("User deleted successfully")
            closeDeleteModal();
            window.location.reload()
        } catch (error) {
            console.log(error);
            toast.error("Network Error!")
        }finally{
            setIsDeleting(false)
        }
    };




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setIsOpen(null);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoader(true)
                const response = await GetAlumni()
                setAlumni(response.data)
            } catch (error) {
                setError(true)
                console.log(error);
            } finally {
                setLoader(false)
            }
        }
        if (isMounted) fetchAlumni()
        return () => {
            isMounted = false
        }
    }, [])





    return (
        <>
            <Breadcum />
            <main className="bg-white  flex flex-col gap-10 rounded-t-lg py-5 ">

                <div className="flex justify-between gap-3 items-center">
                    <h3 className="font-medium px-5">Users List</h3>
                    <AddUserModal />
                </div>
                <section className="flex flex-wrap md:flex-nowrap px-5 py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200 " style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56 " style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" name="" placeholder="Search for name" className="w-full border-0 focus-visible:outline-none" id="" />
                    </div>
                    <div className="relative w-full md:w-56 bg-white ring-gray-100 px-1 py-2 rounded-lg" style={{ borderWidth: "1px" }}>
                        <select className="block appearance-none w-full px-2 border-0 py-0.5 leading-tight focus:outline-none ">
                            <option>Select Role</option>
                            <option>Alumni</option>
                            <option>Guest</option>
                        </select>
                        <FaChevronDown className="pointer-events-none absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                </section>


            </main>
            <main className="tableContainer overflow-x-scroll pb-3">
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Alumni.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>{Alumni.length > 0 ?
                        <table className="w-full profileTable overflow-x-scroll">
                            <thead className="text-gray-700">
                                <tr>
                                    <th>
                                        <input type="checkbox" name="" className="w-4 h-4 mt-2" id="" />
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    {/* <th>Location</th>
                            <th>Phone Number</th> */}
                                    <th>Graduation Year</th>
                                    <th>Field of Study</th>
                                    <th>Profession</th>
                                    {/* <th>Company</th> */}
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-700">
                                {
                                    Alumni.map((alumni, index) =>
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" name="" className="w-4 h-4 mt-2" id="" />
                                            </td>
                                            <td>{alumni?.name || "Nil"}</td>
                                            <td>{alumni?.email || "Nil"}</td>
                                            {/* <td>{alumni?.location || "Nil"}</td>
                                    <td>{alumni?.phone || "Nil"}</td> */}
                                            <td>{alumni?.graduationYear || "Nil"}</td>
                                            <td>{alumni?.fieldOfStudy || "Nil"}</td>
                                            <td>{alumni.profession || "Nil"}</td>
                                            {/* <td>{alumni.company || "Nil"}</td> */}
                                            <td>{alumni?.role || "Nil"}</td>
                                            <td role="button" className="flex justify-start items-center relative">
                                                <button
                                                    onClick={(event) => toggleDropdown(index, event)}
                                                    className="font-thin focus:outline-none text-sm dropdown-button bg-slate-200 p-1.5 text-gray-500 rounded"
                                                >
                                                    <FaEllipsisH />
                                                </button>
                                                {isOpen === index && (
                                                    <div className="absolute right-0 top-8 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 dropdown-menu">
                                                        <Link to={alumni._id} className="px-4 py-2  hover:bg-gray-200 flex items-center justify-start gap-2 text-sm text-gray-700">
                                                            <FaEdit />
                                                            <span>Edit</span>
                                                        </Link>
                                                        <button type="button" onClick={() => openDeleteModal(alumni)} className="flex items-center justify-start gap-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-200 focus:outline-none w-full">
                                                            <FaTrash />
                                                            <span>Delete</span>
                                                        </button>

                                                    </div>
                                                )}
                                            </td>

                                        </tr>
                                    )

                                }
                            </tbody>
                        </table>
                        :
                        <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                            {error ? "Network Error. Try again later" : "No User Registered"}
                        </div>
                    }
                    </>
                }
            </main>

            <DeleteProfile
                isOpen={isDeleteModalOpen}
                loader = {IsDeleting}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
            />
        </>
    );
}

export default AlumniProfiles;