import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEllipsisH, FaUser, FaSearch } from 'react-icons/fa';
import AddEditFundraisingModal from './AddEditFundraisingModal';
// import DeleteModal from './DeleteModal';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import { addCampaign, editCampaign, getCampaigns } from '../../../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../services/formatDate';
import { useToggleDropdown } from '../useCloseDropdown';
const FundraisingCampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = true
    const [error, setError] = useState(false);
    const {isOpen, toggleDropdown} = useToggleDropdown()


    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                setLoader(true);
                const response = await getCampaigns();
                setCampaigns(response.data);
                console.log(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };

        if (isMounted) fetchCampaigns();
        return () => {
            isMounted = false
        }
    }, []);

    const handleAddEditCampaign = async (campaign) => {
        try {
            setIsLoading(true);
            if (currentCampaign) {
                await editCampaign(currentCampaign._id, campaign);
                setCampaigns(campaigns.map((c) => (c._id === currentCampaign._id ? campaign : c)));
                toast.success("Campaign updated successfully.")
            } else {
                const newCampaign = await addCampaign(campaign);
                setCampaigns([...campaigns, newCampaign.data]);
                toast.success("Campaign added successfully.")
                window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving campaign.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    // const handleDeleteCampaign = async () => {
    //     try {
    //         setIsLoading(true);
    //         // Placeholder for actual API call to delete a campaign
    //         await deleteFundraisingCampaign(currentCampaign.id);
    //         setCampaigns(campaigns.filter((c) => c.id !== currentCampaign.id));
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //         closeDeleteModal();
    //     }
    // };

    const openAddEditModal = (campaign = null) => {
        setCurrentCampaign(campaign);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentCampaign(null);
        setIsAddEditModalOpen(false);
    };

    //   const openDeleteModal = (campaign) => {
    //     setCurrentCampaign(campaign);
    //     setIsDeleteModalOpen(true);
    //   };

    //   const closeDeleteModal = () => {
    //     setCurrentCampaign(null);
    //     setIsDeleteModalOpen(false);
    //   };

    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">Fundraising Campaigns</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit  text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Campaign</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Campaign" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>

                {loader ? (
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        <SpinnerMini />
                    </div>
                ) : campaigns.length > 0 ? (
                    <table className="min-w-full profileTable">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Title</th>
                                <th className="py-2 px-4">Target Amount</th>
                                <th className="py-2 px-4">Start Date</th>
                                <th className="py-2 px-4">End Date</th>
                                <th className="py-2 px-4">Author</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {campaigns.map((campaign, index) => (
                                <tr key={campaign._id} className="border-b border-gray-200">
                                    <td className="py-2 px-4 ">{campaign.title}</td>
                                    <td className="py-2 px-4 "> <span>{campaign.currency == "USD"? "$" : campaign.currency == "NGN" ? "N" : "$" }</span>{campaign.targetAmount}</td>
                                    <td className="py-2 px-4">{formatDate(campaign.startDate)}</td>
                                    <td className="py-2 px-4">{formatDate(campaign.endDate)}</td>
                                    <td className="py-2 px-4 ">{campaign.createdBy.name}</td>
                                    <td className="py-2 px-4 ">
                                        <div className="relative">
                                            <button
                                                className="text-slate-500 bg-slate-300 p-1 rounded focus:outline-none"
                                                onClick={(event) => toggleDropdown(index, event)}
                                            >
                                                <FaEllipsisH />
                                            </button>
                                            {isOpen === index && (
                                                <div className="dropdown-menu absolute mb-4 right-0 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    <Link
                                                        to={`/dashboard/campaign/${campaign._id}`}
                                                        className="block px-4 py-2 text-green-500 hover:bg-gray-200 w-full text-left"

                                                    >
                                                        <FaUser className="inline mr-2" />
                                                        Overview
                                                    </Link>
                                                    <button
                                                        className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                        onClick={() => openAddEditModal(campaign)}
                                                    >
                                                        <FaEdit className="inline mr-2" />
                                                        Edit
                                                    </button>
                                                    {/* <button
                                                        className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                        onClick={() => openDeleteModal(campaign)}
                                                    >
                                                        <FaTrash className="inline mr-2" />
                                                        Delete
                                                    </button> */}
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
                        {error ? "An error occurred. Try again later" : "No campaigns available."}
                    </div>

                )}

                <AddEditFundraisingModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditCampaign}
                    campaign={currentCampaign}
                    loader={isLoading}
                />

                {/* <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCampaign}
        loader={isLoading}
      /> */}
            </main>
        </>
    );

};

export default FundraisingCampaignList;
