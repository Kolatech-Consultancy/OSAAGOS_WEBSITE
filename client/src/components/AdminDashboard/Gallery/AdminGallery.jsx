import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import AddEditMediaModal from "./AddEditMediaModal";
import SpinnerMini from "../../SpinnerMini";

import toast from "react-hot-toast";
import { useToggleDropdown } from "../useCloseDropdown";
import { formatDate } from "../../../services/formatDate";
import axios from "../../../utils/axios";
import OverviewModal from "./OverviewModal";

const MediaPage = () => {
  const [media, setMedia] = useState([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);
  const { isOpen, toggleDropdown } = useToggleDropdown();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoader(true);
        const response = await axios.get("/api/media");
        console.log(response);
        setMedia(response.data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    fetchMedia();
  }, []);

  async function editMedia(id, data) {
    try {
      const response = await axios.put(`/api/admin/media/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating media:", error);
      throw new error("Error updating media");
    }
  }

  const handleAddEditMedia = async (mediaItem) => {
    try {
      setIsLoading(true);
      if (currentMedia) {
        const editedMedia = await editMedia(currentMedia._id, mediaItem);
        setMedia(
          media.map((m) => (m._id === currentMedia._id ? editedMedia : m))
        );
        toast.success("Media updated successfully.");
      } else {
        const newMedia = await axios.post("/api/admin/media", mediaItem);
        setMedia([...media, newMedia.data]);
        toast.success("Media added successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving media.");
    } finally {
      setIsLoading(false);
      closeAddEditModal();
    }
  };

  async function deleteMedia(id) {
    try {
      const response = await axios.delete(`/api/admin/media/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting media:", error);
      throw new Error("Error deleting media");
    }
  }

  const handleDeleteMedia = async (currentMedia) => {
    try {
      setIsLoading(true);
      await deleteMedia(currentMedia._id);
      setMedia(media.filter((m) => m._id !== currentMedia._id));
      toast.success("Media deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting media");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddEditModal = (mediaItem = null) => {
    setCurrentMedia(mediaItem);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setCurrentMedia(null);
    setIsAddEditModalOpen(false);
  };
  const openOverviewModal = (mediaItem) => {
    setCurrentMedia(mediaItem);
    setIsOverviewModalOpen(true);
  };

  const closeOverviewModal = () => {
    setCurrentMedia(null);
    setIsOverviewModalOpen(false);
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
        <div className="flex justify-between gap-3 items-center">
          <h1 className="font-medium text-xl px-5">Media</h1>
          <button
            onClick={() => openAddEditModal()}
            className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none"
          >
            <FaPlus />
            <span className="hidden sm:flex">Add Media</span>
          </button>
        </div>
      </main>

      <main className="tableContainer overflow-x-scroll mt-1 pb-3">
        {loader ? (
          <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
            <SpinnerMini />
          </div>
        ) : media.length > 0 ? (
          <table className="min-w-full profileTable">
            <thead>
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Created At</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {media.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-2 px-4">
                    {item.title.split(" ").length > 3
                      ? item.title.split(" ").slice(0, 3).join(" ") + "..."
                      : item.title}
                  </td>
                  <td className="py-2 px-4">{item.fileType}</td>
                  <td className="py-2 px-4">{formatDate(item.createdAt)}</td>

                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => openOverviewModal(item)}
                    >
                      Overview
                    </button>
                  </td>

                  <td className="py-2 px-4">
                    <div className="relative">
                      <button
                        className="text-slate-500 bg-slate-300 p-1 rounded focus:outline-none"
                        onClick={(event) => toggleDropdown(index, event)}
                      >
                        <FaEllipsisH />
                      </button>
                      {isOpen === index && (
                        <div className="dropdown-menu mb-4 absolute right-0 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                            onClick={() => openAddEditModal(item)}
                          >
                            <FaEdit className="inline mr-2" />
                            Edit
                          </button>
                          <button
                            className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                            onClick={() => handleDeleteMedia(item)}
                          >
                            <FaTrash className="inline mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
            {error
              ? "An error occurred. Try again later."
              : "No media available."}
          </div>
        )}
      </main>
      <AddEditMediaModal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        onSave={handleAddEditMedia}
        mediaItem={currentMedia}
        loader={isLoading}
      />
      <OverviewModal
        isOpen={isOverviewModalOpen}
        onClose={closeOverviewModal}
        mediaItem={currentMedia}
      />
    </>
  );
};

export default MediaPage;
