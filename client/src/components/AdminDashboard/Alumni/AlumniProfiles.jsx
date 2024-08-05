import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaChevronDown, FaPlus } from "react-icons/fa6";
// import "../../index.scss"
import { GetAlumni } from "../../../services/api";
import AddUser from "./AddUser";

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






    return (
        <>
            <header className="py-5">
                <div className="flex gap-3 items-center">
                    <FaArrowLeft />
                    <span>Go Back</span>
                </div>
            </header>
            <main className="bg-white px-8 flex flex-col gap-10 rounded-lg py-5">

                <div className="flex justify-between gap-3 items-center">
                    <h3>Users List</h3>
                    <AddUser />
                </div>


            </main>
        </>
    );
}

export default AlumniProfiles;