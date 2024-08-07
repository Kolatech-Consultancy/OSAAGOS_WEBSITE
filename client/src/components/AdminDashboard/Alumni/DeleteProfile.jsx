import SpinnerMini from "../../SpinnerMini";

function DeleteProfile({ isOpen, onClose, onDelete, loader }) {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-5 rounded-lg shadow-lg m-2 w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-4">Delete Profile</h2>
                    <p className="mb-4">Are you sure you want to delete this profile? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                            onClick={onDelete}
                        >
                            {loader ? 
                            <SpinnerMini/> : "Delete"
                        }
                            
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteProfile;