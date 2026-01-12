import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { motion } from "framer-motion";
import { IoLocation } from 'react-icons/io5';
import { FaRegClock, FaStar } from 'react-icons/fa';
import TutorSkeleton from './TutorSkeleton';


const AllTutors = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);

  const { data = {}, isLoading } = useQuery({
    queryKey: ['tutors', page],
    queryFn: async () => {
      const res = await axios.get(`/tutorsApplications?page=${page}&limit=8`);
      return res.data;
    },
  });

  const tutors = data.tutors || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="py-10 px-4 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">Meet Our Tutors</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <TutorSkeleton key={i} />
            ))
          : tutors.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className=" hover:scale-105 transition shadow-lg rounded-2xl p-6 "
              >
                {tutor.rating && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaStar size={14} /> {tutor.rating.toFixed(1)}
                  </span>
                )}

                <div className="w-20 h-20 rounded-full p-1 bg-linear-to-tr from-purple-400 to-indigo-400 mb-4">
                  <img
                    src={tutor.profilePhoto || tutor.photo}
                    alt={tutor.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-2">{tutor.name}</h3>

                <p className="text-sm mb-2 flex items-center gap-2">
                  <IoLocation className="text-blue-400" />
                  {tutor.tuitionPostSubject || "Subject not specified"}
                </p>

                <p className="bg-purple-100 text-blue-700 py-1 px-3 rounded-full inline-block mb-3 text-sm font-medium">
                  Experience: {tutor.experience || 0} yrs
                </p>

                <p className="text-sm flex items-center gap-2">
                  <FaRegClock className="text-blue-400" />
                  {tutor.qualifications || "Qualification not mentioned"}
                </p>
              </motion.div>
            ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="btn bg-gray-300 rounded-2xl disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">
          Page {page} / {totalPages}
        </p>

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="btn btn-primary disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTutors;
