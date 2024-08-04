import React from "react";
import { Link } from "react-router-dom";

const FourthSection = () => {
    const dummyNews = [
        {
            title: 'Alumni Reunion Success',
            content: 'The recent alumni reunion was a huge success, with many attendees praising the organization and the event.',
            author: 'Jane Smith',
            timestamp: '2024-07-01'
        },
        {
            title: 'New Scholarships Available',
            content: 'We are pleased to announce that new scholarships are now available for deserving students and alumni.',
            author: 'Michael Lee',
            timestamp: '2024-07-05'
        },
        {
            title: 'Career Development Workshop',
            content: 'Join our upcoming career development workshop to enhance your skills and advance your career.',
            author: 'Sarah Wilson',
            timestamp: '2024-07-10'
        }
    ];
        
    return (
      <>
        <section className="bg-gray-100 py-10 px-2 sm:px-10 lg:px-20">
          <div className="sm:p-10 px-2 py-10">
            <h1 className="text-4xl font-semibold mb-10 text-center">Latest News</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
              {dummyNews.map((news, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden p-6"
                >
                  <h2 className="text-2xl font-semibold mb-2">{news.title}</h2>
                  <p className="text-gray-700 mb-2">
                    {news.content.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/news/${index}`}
                    className="text-orange-400 hover:underline"
                  >
                    Read More
                  </Link>
                  <p className="text-gray-500 mt-2">Author: {news.author}</p>
                  <p className="text-gray-500">Date: {news.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
};

export default FourthSection;
