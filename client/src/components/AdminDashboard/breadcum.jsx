import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Breadcum() {
    const navigate = useNavigate(null)

   const handlePreviousRoute = ()=>{
       navigate(-1)
   }

    return (
        <>
            <header role={"button"} onClick={handlePreviousRoute} className="py-5">
                <div className="flex gap-3 items-center">
                    <FaArrowLeft />
                    <span>Go Back</span>
                </div>
            </header>
        </>
    );
}

export default Breadcum;