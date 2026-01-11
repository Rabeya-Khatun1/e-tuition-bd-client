import React from 'react';
import { motion } from 'framer-motion';
import tutor from '../../assets/Tutor.png';
import { Link } from 'react-router';

const HeroSection = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className=" relative pt-5 min-h-[60vh] 
  flex flex-col md:flex-row items-center justify-center px-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full"
      >
        {/* Left side - Content */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100"
          >
            Find the{' '}
            <span className="text-primary-600 relative inline-block">
              Best Tutors
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-primary-200"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                />
              </svg>
            </span>{' '}
            Near You
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl  dark:text-gray-300 max-w-lg leading-relaxed"
          >
            Verified tutors for any subject, any class — instantly. Elevate your learning experience today.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-5 justify-center md:justify-start">
            <Link to="/tuitions">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl shadow-lg shadow-primary-200 transition-all transform hover:-translate-y-1 active:scale-95">
                Find Tuitions
              </button>
            </Link>

            {/* Premium Animated Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 md:px-10 py-3 md:py-4 overflow-hidden rounded-xl bg-white border-2 border-orange-500 font-bold uppercase tracking-widest text-sm md:text-base"
            >
              <span className="relative z-10 text-orange-600 group-hover:text-white transition-colors duration-300">
                eTuitionBd
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </motion.div>
        </div>

        {/* Right side - Image with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex justify-center mt-8 md:mt-0"
        >
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-50 -z-10"></div>

          <motion.img
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            src={tutor}
            alt="Tutor Illustration"
            className="max-h-[400px] md:max-h-[500px] w-auto drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-secondary-500 dark:text-secondary-300 text-2xl cursor-pointer"
      >
        &#x25BC;
      </motion.div>
    </div>
  );
};

export default HeroSection;
