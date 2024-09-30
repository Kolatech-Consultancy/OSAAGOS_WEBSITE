import React from 'react';
import SpinnerMini from '../../SpinnerMini';

const ApproveDenyForumModal = ({ isOpen, onClose, onSave, action, loader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{action} forum</h2>
        <p>Are you sure you want to {action} this forum? this action can't be undone!</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
            onClick={onSave}
          >
           {loader ? <SpinnerMini/> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDenyForumModal;
