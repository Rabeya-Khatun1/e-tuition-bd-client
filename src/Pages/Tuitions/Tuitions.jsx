import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import useAxios from '../../Hooks/useAxios';
import { IoLocation } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import { AnimatePresence } from "framer-motion";

import { Link, useSearchParams } from 'react-router';
import TuitionSkeleton from './TuitionSkeleton';

const Tuitions = () => {
  const axios = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  const subjects = ["All", "Math", "English", "Bangla", "Physics", "Chemistry"];
 const [openReview, setOpenReview] = useState(null);

  const subject = searchParams.get("subject") || "";
  const location = searchParams.get("location") || "";
  const pageFromURL = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(pageFromURL);
  const [sortBy, setSortBy] = useState("");

  const { data = {} , isLoading} = useQuery({
    queryKey: ['tuitions', page, subject, location, sortBy],
    queryFn: async () => {
      const res = await axios.get(
        `/tuitions?page=${page}&subject=${subject}&location=${location}&sortBy=${sortBy}&limit=8`
      );
      return res.data;
    }
  });

  const tuitions = data.tuitions || [];
  const totalPages = data.totalPages || 1;

  const updateSort = (value) => {
    setSortBy(value);
    setPage(1);
    setSearchParams({ subject, location, page: 1, sortBy: value });
  };

  const updateSearch = (key, value) => {
    const newParams = { subject, location, page: 1 };
    newParams[key] = value === "All" ? "" : value;
    setSearchParams(newParams);
    setPage(1);
  };

  return (
    <div className='px-12'>
      <h2 className="text-4xl font-bold text-center my-12 ">
        Explore Available Tuitions
      </h2>


      <div className="flex justify-center mb-6">
        <select
          value={sortBy}
          onChange={(e) => updateSort(e.target.value)}
          className="border rounded-2xl px-4 py-2"
        >
          <option value="">Sort by</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="budget_asc">Budget Low → High</option>
          <option value="budget_desc">Budget High → Low</option>
        </select>
      </div>


      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {subjects.map(subj => (
          <button
            key={subj}
            onClick={() => updateSearch("subject", subj)}
            className={`btn rounded-2xl text-sm font-medium
              ${subject === (subj === "All" ? "" : subj)
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-800"}`}
          >
            {subj}
          </button>
        ))}
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {
      isLoading ?  Array.from({ length: 8 }).map((_, i) => (
              <TuitionSkeleton key={i} />
            )) :
      tuitions.map((tuition, index) => (
  <motion.div
    key={tuition._id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between"
  >
    {/* Top Info */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
        {tuition.subject}
      </h3>

      <div className="space-y-2 mb-3">
        <p className="flex items-center text-sm ">
          <IoLocation className="mr-2 text-blue-500" />
          {tuition.location}
        </p>
        <p className="flex items-center text-sm ">
          <FaRegClock className="mr-2 text-blue-500" />
          {tuition.timing}
        </p>
      </div>

      <span className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
        Budget: {tuition.budget}
      </span>
      <button
  onClick={() =>
    setOpenReview(openReview === tuition._id ? null : tuition._id)
  }
  className="text-sm text-secondary-500 font-medium hover:underline m-2"
>
  {openReview === tuition._id ? "Hide Review" : "View Review"}
</button>




    </div>

    {/* Button */}
    <Link to={`/viewTuitionDetails/${tuition._id}`} className="mt-5">
      <button className="w-full btn btn-primary font-semibold hover:bg-secondary-100 transition">
        View Details
      </button>
    </Link>
  </motion.div>
))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 my-10">
        <button
          disabled={page === 1}
          onClick={() => {
            const newPage = page - 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
          className="btn bg-gray-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">
          Page {page} / {totalPages}
        </p>

        <button
          disabled={page === totalPages}
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            setSearchParams({ subject, location, page: newPage });
          }}
          className="btn bg-primary-300 disabled:opacity-40"
        >
          Next
        </button>
      </div>
      <AnimatePresence>
  {openReview && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpenReview(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-[90%] max-w-md p-6 shadow-2xl"
      >
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Admin Verified
        </h3>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between">
            Student Info <span className="text-green-600">✔</span>
          </li>
          <li className="flex justify-between">
            Contact Valid <span className="text-green-600">✔</span>
          </li>
          <li className="flex justify-between">
            Subject Correct <span className="text-green-600">✔</span>
          </li>
          <li className="flex justify-between">
            Schedule OK <span className="text-green-600">✔</span>
          </li>
        </ul>

        <p className="text-xs text-gray-500 mt-4">
          Reviewed on{" "}
          {new Date(
            openReview.reviewedAt || openReview.date
          ).toLocaleDateString()}
        </p>

        <button
          onClick={() => setOpenReview(null)}
          className="mt-6 w-full py-2 rounded-2xl bg-primary-200  font-medium "
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Tuitions;
