import React from "react";

const OverviewModal = ({ isOpen, onClose, mediaItem }) => {
  if (!isOpen || !mediaItem) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{mediaItem.title}</h2>
        {mediaItem.fileUrl && (
          <img
            src={mediaItem.fileUrl}
            alt={mediaItem.title}
            className="w-full h-64 object-cover mb-4"
          />
        )}
        <p>{mediaItem.description || "No description available"}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OverviewModal;
