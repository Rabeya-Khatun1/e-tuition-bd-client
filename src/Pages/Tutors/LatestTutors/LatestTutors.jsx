import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from "framer-motion";
import useAxios from '../../../Hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FaStar, FaRegClock } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router';

const LatestTutors = () => {
  const axios = useAxios();

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axios.get('/tutorsApplications?limit=8');
      return res.data;
    }
  });

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <section className="relative flex flex-col justify-center items-center px-6 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold  mb-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            Unlock Your Learning Potential
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl  max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Connect with expert tutors anytime, anywhere, and elevate your skills with personalized guidance.
          </motion.p>

    
        </section>


        <p className="text-center  max-w-3xl mx-auto mb-10">
          Discover a community of passionate, experienced, and verified tutors ready to guide students toward success.
        </p>

        {/* Swiper */}
        <Swiper
          navigation
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {tutors.map((tutor, index) => (
            <SwiperSlide key={tutor._id || index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-linear-to-br from-white to-purple-50 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-gray-100 flex flex-col justify-between relative"
              >
                {/* Rating */}
                {tutor.rating && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-white rounded-full px-3 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
                    <FaStar size={14} /> {tutor.rating}
                  </div>
                )}

                <div className="flex flex-col items-center">
                  {/* Profile */}
                  <div className="w-20 h-20 rounded-full p-1 bg-linear-to-tr from-purple-400 via-pink-400 to-indigo-400 shadow-lg mb-4">
                    <img
                      src={tutor.profilePhoto || tutor.photo}
                      alt={tutor.name}
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>

                  {/* Name (Tuition subject style) */}
                  <h3 className="font-semibold text-xl text-gray-800 text-center mb-3">
                    {tutor.name}
                  </h3>

                  {/* Experience badge (Budget style) */}
                  <div className="bg-purple-100 text-blue-700 py-1 px-3 rounded-full inline-block mb-3 text-sm font-medium">
                    {tutor.experience} yrs experience
                  </div>

                  {/* Location */}
                  <p className=" text-sm mb-2 flex items-center gap-2">
                    <IoLocation className="text-blue-400" />
                    {tutor.expectedSalary || "Location N/A"}
                  </p>

                  {/* Subjects */}
                  <p className=" text-sm mb-2 flex items-center gap-2">
                    <FaRegClock className="text-blue-400" />
                    {tutor.tuitionPostSubject || "Subjects N/A"}
                  </p>

                  {/* Intro */}
                  <p className="text-gray-500 text-sm text-center line-clamp-3 mt-2">
                    {tutor.qualifications || "No description provided."}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default LatestTutors;
