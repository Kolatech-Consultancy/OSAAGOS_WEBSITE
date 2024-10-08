import React from "react";

const OverviewModal = ({ isOpen, onClose, mediaItem }) => {
  if (!isOpen || !mediaItem) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{mediaItem.title}</h2>
        {mediaItem.fileType === "image" ? (
          <img
            src={mediaItem.fileUrl}
            alt={mediaItem.title}
            className="w-full h-64 object-cover mb-4"
          />
        ) : null}

        {mediaItem.fileType === "video" ? (
          mediaItem.source === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${
                mediaItem.fileUrl.split("v=")[1]
              }`}
              title={mediaItem.title}
              className="w-full h-48"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls src={mediaItem.fileUrl} className="w-full h-48">
              Your browser does not support the video tag.
            </video>
          )
        ) : null}
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
