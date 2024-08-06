import { useEffect } from "react";
import { useState } from "react";
import { FaChevronDown, FaEllipsisV, FaList, FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import "../../../index.scss"
import { GetAlumni } from "../../../services/api";
import Breadcum from "../breadcum";
import AddUserModal from "./AddUserModal";

function AlumniProfiles() {
    const [Alumni, setAlumni] = useState([])
    let isMounted = true
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoader(true)
                const response = await GetAlumni()
                setAlumni(() => response.data)
                console.log(response.data);
            } catch (error) {
                setError(true)
                console.log(error);
            } finally {
                setLoader(false)
                setError(false)
            }
        }
        if (isMounted) fetchAlumni()
        return () => {
            isMounted = false
        }
    }, [])

    const demo = [
        {
            "name": "Ope",
            "email": "ope_@gmail.com",
            "role": "Alumni",
            "graduationYear": "2019",
            "fieldOfStudy": "P and C",
        },
        {
            "name": "Ope",
            "email": "ope_@gmail.com",
            "role": "Alumni",
            "graduationYear": "2019",
            "fieldOfStudy": "P and C",
        },
        {
            "name": "Ope",
            "email": "ope_@gmail.com",
            "role": "Alumni",
            "graduationYear": "2019",
            "fieldOfStudy": "P and C",
        },
        {
            "name": "Ope",
            "email": "ope_@gmail.com",
            "role": "Alumni",
            "graduationYear": "2019",
            "fieldOfStudy": "P and C",
        },
        {
            "name": "Ope",
            "email": "ope_@gmail.com",
            "role": "Alumni",
            "graduationYear": "2019",
            "fieldOfStudy": "P and C",
        }
    ]





    return (
        <>
            <Breadcum />
            <main className="bg-white  flex flex-col gap-10 rounded-t-lg py-5 ">

                <div className="flex justify-between gap-3 items-center">
                    <h3 className="font-medium px-5">Users List</h3>
                    <AddUserModal />
                </div>
                <section className="flex px-5 py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200 " style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-56 " style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" name="" placeholder="Search for name" className="w-full border-0 focus-visible:outline-none" id="" />
                    </div>
                    <div className="relative w-56 bg-white ring-gray-100 px-1 py-2 rounded-lg" style={{ borderWidth: "1px" }}>
                        <select className="block appearance-none w-full px-2 border-0 py-0.5 leading-tight focus:outline-none ">
                            <option>Select Role</option>
                            <option>Alumni</option>
                            <option>Guest</option>
                        </select>
                        <FaChevronDown className="pointer-events-none absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                </section>


            </main>
            <main className="tableContainer overflow-x-scroll">
                <table className="w-full profileTable overflow-x-scroll">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="" className="w-4 h-4 mt-2" id="" />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Graduation Year</th>
                            <th>Field of Study</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            demo.map((alumni, index) =>
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" name="" className="w-4 h-4 mt-2" id="" />
                                    </td>
                                    <td>{alumni.name}</td>
                                    <td>{alumni.email}</td>
                                    <td>{alumni.graduationYear}</td>
                                    <td>{alumni.fieldOfStudy}</td>
                                    <td>{alumni.role}</td>
                                    <td role={"button"} className="flex justify-center items-center font-thin">
                                        <FaEllipsisV />
                                    </td>

                                </tr>
                            )

                        }
                    </tbody>
                </table>

            </main>
        </>
    );
}

export default AlumniProfiles;