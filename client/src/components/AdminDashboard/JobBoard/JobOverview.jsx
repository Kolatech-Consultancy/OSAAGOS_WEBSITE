// import React, { useEffect, useState } from 'react';
// import {useParams } from 'react-router-dom';
// import { getCampaignDonations, getSingleCampaign } from '../../../services/api';
// import SpinnerMini from '../../SpinnerMini';


// function PostOverview() {
//     const [campaign, setCampaign] = useState(null);
//     const [loading, setLoading] = useState(true);
//     let isMounted = true
//     const { campaignId } = useParams()
//     const [error, setError] = useState(null)




//     useEffect(() => {
//         const fetchCampaignDetails = async () => {
//             try {
//                 const [campaignResponse, donationsResponse] = await Promise.all([
//                     getSingleCampaign(campaignId),
//                     getCampaignDonations(campaignId)
//                 ]);

//                 setCampaign(campaignResponse.data);
//                 setDonations(donationsResponse.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching campaign details:', error);
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         if (isMounted) fetchCampaignDetails();

//         return () => {
//             isMounted = false
//         }
//     }, [campaignId]);


//     if (loading) {
//         return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
//             <SpinnerMini />
//         </div>;
//     }
//     if (error) {
//         return <div className="text-center py-10 text-red-600">{error}</div>;
//     }

//     if (!campaign) {
//         return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">Campaign not found.</div>;
//     }


//     return (
//         <>
//             <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//                 <div className="flex items-center mb-6">
//                     <div className="mr-4">
//                         <span className="text-gray-600 font-semibold">{post.author}</span>
//                     </div>
//                     <span className="text-gray-500">{post.date}</span>
//                 </div>
//                 <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
//             </div>
//         </>
//     );
// }

// export default PostOverview;