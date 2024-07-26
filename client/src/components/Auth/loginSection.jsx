import { Link } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";

function LoginSection() {
    return (
        <>
            <form action="" className="sm:p-20 p-4 w-2/3 mx-auto">
                <p className="text-4xl text-center font-semibold">LOGIN FORM</p>
               <div className="grid grid-cols-1 mt-8 formControl">
                    <div className="sm:col-span-1 mt-2">
                        <input id="student-id" name="student-id" type="text" placeholder="Enter your ID" className="block w-full h-14 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 focus-visible:outline focus-visible:outline-0 sm:text-sm bg-orange-50 sm:leading-6" />
                    </div>
                    <div className="sm:col-span-1 mt-2">
                        <input type="password" name="password" id="password" placeholder="Password" className="block w-full h-14 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 focus-visible:outline focus-visible:outline-0 sm:text-sm bg-orange-50 sm:leading-6" />
                    </div>
                    <div className="sm:col-span-1 mt-2">
                            <button type="button" className="block w-full text-slate-100 text-base px-10 py-4 font-semibold shadow-sm bg-orange-400 hover:bg-orange-400  ">Login</button>
                    </div>
               </div>
               <div className="flex justify-between h-20 p-4">
                   <hr className=" w-40" style={{alignSelf:"center"}}/>
                   <span className="text-sm text-gray-400" style={{alignSelf:"center"}}>Don’t have account? 
                    <Link to="/sign-up" className="text-orange-400"> sign Up</Link>
                   </span>
                   <hr className=" w-40" style={{alignSelf:"center"}}/>
               </div>
            </form>
        </>
    );
}

export default LoginSection;