import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BackwardNavigator() {
    const navigate = useNavigate(null)

   const handlePreviousRoute = ()=>{
       navigate(-1)
   }

    return (
        <>
            <header role={"button"} onClick={handlePreviousRoute} className="py-5 w-fit">
                <div className="flex gap-3 items-center">
                    <FaArrowLeft />
                    <span>Go Back</span>
                </div>
            </header>
        </>
    );
}

export default BackwardNavigator;