import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { IoLocation } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router";

const LatestTuition = () => {

const axios = useAxios();

const {data} = useQuery({
    queryKey: ['tuitions',],
    queryFn: async()=>{
const res = await axios.get('/tuitions?limit=8')
return res.data.tuitions;
    }
})

const tuitions = data || []

  return (
   <div className="px-6 py-20">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center my-2">
    Latest Tuition Posts
  </h2>

<p className="my-4 text-black text-center leading-relaxed">
  Discover skilled, verified, and passionate tutors dedicated to helping students excel. 
  Each tutor brings proven expertise, real-world experience, and a supportive teaching approach— 
  empowering learners to grow with confidence and achieve lasting success.
</p>


  <Swiper
    navigation={true}
    modules={[Navigation, Autoplay]}
    spaceBetween={25}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    }}
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
    className=""
  >
    {tuitions.map((tuition, index) => (
      <SwiperSlide key={index} className="overflow-visible">
         <motion.div
            key={tuition.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
           className="bg-linear-to-br from-white to-purple-50 hover:scale-105 hover:border-2 border-primary transition-transform rounded-2xl p-6 flex flex-col justify-between relative overflow-visible"
          >
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">
                {tuition.subject}
              </h3>

              <p className=" text-sm mb-2 flex tuitions-center">
                <IoLocation className="mr-2 text-blue-400" /> {tuition.location}
              </p>
              <p className=" text-sm mb-3 flex tuitions-center">
                <FaRegClock className="mr-2 text-blue-400" /> {tuition.timing}
              </p>

              <div className="bg-purple-100 text-blue-700 py-2 px-3 rounded-full inline-block mb-3 text-sm font-medium">
                Budget: {tuition.budget}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-3">
                Posted on: {new Date(tuition.date).toLocaleDateString()}
              </p>

              <Link to={`/viewTuitionDetails/${tuition._id}`}>
                <button className="w-full btn btn-primary font-semibold hover:bg-secondary-500 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default LatestTuition;
