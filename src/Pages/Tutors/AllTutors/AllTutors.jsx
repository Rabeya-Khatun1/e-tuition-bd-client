import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { motion } from "framer-motion";
import { IoLocation } from 'react-icons/io5';
import { FaRegClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const AllTutors = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);

  const { data = {} } = useQuery({
    queryKey: ['tutors', page],
    queryFn: async () => {
      const res = await axios.get(`/tutorsApplications?page=${page}&limit=8`);
      return res.data;
    },
  });

  const tutors = data.tutors || []
  const totalPages = data.totalPages || 1;

  return (
    <div className="py-10 px-4 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
      <title>eTuitionBd-Tutors</title>
      <div className="flex justify-center mb-10">
        <h2 className="text-4xl font-bold  text-center">
          Meet Our Tutors
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.map((tutor, index) => (
      <motion.div
  key={tutor._id || tutor.id}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  className="bg-linear-to-br from-white to-purple-50 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-gray-100 flex flex-col justify-between relative"
>

<div>
    {/* Rating Badge */}
  {tutor.rating && (
    <p className="absolute top-4 right-4 bg-yellow-400 text-white rounded-full px-3 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
      <FaStar size={14} /> {tutor.rating.toFixed(1)}
    </p>
  )}
    <div className="w-20 h-20 rounded-full p-1 bg-linear-to-tr from-purple-400 via-pink-400 to-indigo-400 shadow-lg mb-4">
      <img
        src={tutor.profilePhoto || tutor.photo}
        alt={tutor.name}
        className="w-full h-full rounded-full object-cover border-2 border-white"
      />
    </div>
  <h3>  {tutor.name}</h3>
    <p className=" text-sm mb-2 flex items-center gap-2">
      <IoLocation className="text-blue-400" />
      {tutor.tuitionPostSubject || "Subject not specified"}
    </p>
 <p className="bg-purple-100 text-blue-700 py-2 px-3 rounded-full inline-block mb-3 text-sm font-medium">
      Experience: {tutor.experience || 0} yrs
    </p>
       <p className=" text-sm mb-3 flex items-center gap-2">
      <FaRegClock className="text-blue-400" />
      {tutor.qualifications || "Qualification not mentioned"}
    </p>
       {/* Short Intro */}
    {/* <p className="text-gray-500 text-sm text-center line-clamp-3">
      {tutor.intro || tutor.reviewText || "No introduction provided."}
    </p> */}
  <div>

  </div>
</div>



  {/* Top Content */}
  <div className="flex flex-col items-center">
    {/* Profile Image */}
  

    {/* Name */}
    <h3 className="font-semibold text-xl text-gray-800  mb-3">
    
    </h3>

    {/* Experience (Budget badge style) */}
    

    {/* Subject / Location */}
  

    {/* Qualification */}
 

 
  </div>

</motion.div>

        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="btn bg-gray-300 rounded-2xl disabled:opacity-40 hover:bg-gray-400 transition"
        >
          Previous
        </button>

        <p className="font-semibold">Page {page} / {totalPages}</p>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="btn btn-primary disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTutors;
