import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, getSingleJob } from '../../../services/api';
import SpinnerMini from '../../SpinnerMini';


function JobOverview() {
    const [Job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    let isMounted = true
    const { jobId } = useParams()
    const [error, setError] = useState(null)




    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const JobResponse = await getJobById(jobId)
                setJob(JobResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Job details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (isMounted) fetchJobDetails();

        return () => {
            isMounted = false
        }
    }, [jobId]);


    if (loading) {
        return <div className="bg-white w-full h-52 flex items-center justify-center mt-2">
            <SpinnerMini />
        </div>;
    }
    if (error) {
        return <div className=" bg-white w-full h-52 flex items-center justify-center mt-2 text-red-600">{error}</div>;
    }

    if (!Job) {
        return <div className="bg-white w-full h-52 flex items-center justify-center mt-2">Job not found.</div>;
    }


    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{Job.title}</h1>
                <div className="mb-6">
                    <div className="text-gray-600 font-semibold mb-2">
                        Company: {Job.companyName}
                    </div>
                    <div className="text-gray-500 mb-2">
                        Location: {Job.location}
                    </div>
                    <div className="text-gray-500 mb-2">
                        Employment Type: {Job.employmentType}
                    </div>
                    <div className="text-gray-500 mb-2">
                        Salary Range: {Job.salaryRange}
                    </div>
                    <div className="text-gray-500 mb-2">
                        Posted Date: {new Date(Job.postedDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-500 mb-2">
                        Application Deadline: {new Date(Job.applicationDeadline).toLocaleDateString()}
                    </div>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {Job.description}
                </p>
            </div>
        </>
    );
}

export default JobOverview;