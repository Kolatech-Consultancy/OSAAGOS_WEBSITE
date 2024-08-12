import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCampaignDonations, getSingleCampaign } from '../../../services/api';
import SpinnerMini from '../../SpinnerMini';
const CampaignOverview = () => {
    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    let isMounted = true
    const { campaignId } = useParams()
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const [campaignResponse, donationsResponse] = await Promise.all([
                    getSingleCampaign(campaignId),
                    getCampaignDonations(campaignId)
                ]);

                setCampaign(campaignResponse.data);
                setDonations(donationsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (isMounted) fetchCampaignDetails();

        return () => {
            isMounted = false
        }
    }, [campaignId]);

    if (loading) {
        return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
            <SpinnerMini />
        </div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    if (!campaign) {
        return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">Campaign not found.</div>;
    }

    return (
        <>
            <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{campaign.title}</h1>
                <p className="text-gray-600 text-lg mb-6">{campaign.description}</p>

                <div className="mb-6">
                    <p className="text-xl font-semibold text-gray-800">Goal:
                        <span className="text-indigo-600"> ${(campaign.targetAmount).toLocaleString()}</span>
                    </p>
                    <p className="text-xl font-semibold text-gray-800">Raised:
                        <span className="text-green-600">{(campaign.targetAmount / 4).toLocaleString()}</span>
                    </p>
                    <p className="text-xl font-semibold text-gray-800">Remaining:
                        <span className="text-red-600"> ${(campaign.targetAmount - (campaign.targetAmount / 4)).toLocaleString()}</span>
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{ width: `${((campaign.targetAmount / 4) / campaign.targetAmount) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="mb-8 mt-6">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">Donations</h2>
                    {donations.length > 0 ? (
                        <ul>
                            {donations.map((donation) => (
                                <li key={donation._id} className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold text-gray-800">
                                            {donation.user}
                                        </p>
                                        <p className="text-lg text-green-600 font-semibold">
                                            ${donation.amount.toLocaleString()}
                                        </p>
                                        <p className="text-lg text-green-600 font-semibold">
                                            {new Date(donation.date).toLocaleDateString}
                                        </p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No donations found.</p>
                    )}
                </div>

            </div>
        </>
    );
};

export default CampaignOverview;
