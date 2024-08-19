import { FaChevronLeft, FaBell, FaSun, FaMoon, FaSearch, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMoveBack } from '../../useMoveBack';

const DashNavbar = ({ isOpen, isSmallScreen }) => {
    const moveBack = useMoveBack()

    const handlePreviousRoute = () => {
        moveBack()
    }

    return (
        <nav className={`bg-white p-2 sm:p-4 fixed top-0 gap-3 flex items-center justify-between shadow-lg  z-50`} style={{ width: isOpen && !isSmallScreen ? 'calc(100% - 16rem)' : "100%" }}>
            <div className="flex items-center">
                <header role={"button"} onClick={handlePreviousRoute}>
                    <div className="flex items-center">
                        <FaChevronLeft />
                        <FaChevronLeft />
                    </div>
                </header>
                <div className="relative ml-4 hidden sm:block">
                    <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 p-2  rounded-md w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-700 text-slate-400 text-xl rounded-md relative">
                    <FaBell />
                    <span className="absolute top-0 right-0 text-white bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span> {/* Example for notification badge */}
                </button>
                <Link to={"admin/profile"}>
                    <button className="p-2 hover:bg-gray-700 text-slate-400 text-xl rounded-md relative">
                        <FaCog />
                    </button>
                </Link>
                <Link to={"admin/profile"}>
                    <div className="relative min-w-fit">
                        <img
                            src='/userDef.png'
                            alt="Profile"
                            className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-blue-500 cursor-pointer"
                        />
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default DashNavbar;
