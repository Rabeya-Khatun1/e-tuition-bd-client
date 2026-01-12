import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../../../Components/Logo/Logo';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaArrowLeft, FaUser, FaGraduationCap } from 'react-icons/fa';

const Login = () => {
  const { signInUser, forgetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors }, getValues , setValue} = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInUser = (data) => {
    setIsLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        setTimeout(() => {
          navigate(location?.state || '/');
        }, 1000);
      })
      .catch(err => {
        setIsLoading(false);
        toast.error("Invalid email or password. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored"
        });
        console.log(err);
      });
  };

  const handleForgotPassword = () => {
    const email = getValues('email');
    if (!email || errors.email) {
      toast.info('Please enter a valid email address first', {
        position: "top-center",
        autoClose: 3000,
        theme: "light"
      });
      return;
    }
    
    forgetPassword(email)
      .then(() => {
        toast.success('Password reset email sent! Please check your inbox.', {
          position: "top-center",
          autoClose: 4000,
          theme: "colored"
        });
      })
      .catch(err => {
        toast.error('Failed to send reset email. Please try again.', {
          position: "top-center",
          theme: "colored"
        });
        console.log(err);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        type: "spring",
        damping: 25
      } 
    },
  };



const handleDemoStudent = ()=>{
  setValue('email','raiha@n.com')
  setValue('password','Amiraihan1')

}
const handleDemoTutor = ()=>{
  setValue('email','ahan@a.com')
  setValue('password','Amiahana1')

}
const handleDemoAdmin = ()=>{
  setValue('email','cutegirlrabeya2008@gmail.com')
  setValue('password','Amirabeya1')

}

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0
            }}
            animate={{
              x: [null, (Math.random() - 0.5) * 100 + 'px'],
              y: [null, (Math.random() - 0.5) * 100 + 'px'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Logo with Animation */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-8 z-10"
      >
        <Logo />
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="relative w-full max-w-5xl flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm z-10"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Left Side Banner */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex lg:w-1/2 bg-primary-300 text-white p-12 flex-col justify-center items-center relative overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Floating shapes */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <div className="relative z-10 text-center">
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <FaGraduationCap className="text-8xl mx-auto mb-6 opacity-90" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold mb-6 leading-tight"
            >
              Welcome Back to eTuitionBd!
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg opacity-90 mb-8"
            >
              Log in to find verified tutors or manage your tuition easily. Learn smarter, faster, and better with us.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30"
            >
              <p className="text-sm mb-3">New to our platform?</p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-primary-500 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create New Account
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          {/* Back Button */}
          <Link to="/">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center text-gray-600 hover:text-primary-500 mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </motion.button>
          </Link>

          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-8">
              Sign in to continue your learning journey
            </p>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit(handleSignInUser)}>
            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium">
                <FaEnvelope className="inline mr-2 text-primary-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      ⚠️ {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block text-gray-700 font-medium">
                <FaLock className="inline mr-2 text-primary-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      ⚠️ {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Forgot Password */}
              <motion.div
                whileHover={{ x: 5 }}
                className="mt-2"
              >
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-500 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                >
                  Forgot your password?
                </button>
              </motion.div>
            </motion.div>

            {/* Remember Me Checkbox */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                id="remember"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label htmlFor="remember" className="text-sm text-gray-700 select-none cursor-pointer">
                Remember me for 30 days
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isLoading 
                    ? 'btn cursor-not-allowed' 
                    : 'btn btn-primary '
                }`}
              >
             
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center"
                  >
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Signing In...
                  </motion.span>
                  
                ) : (
                  <>
                    <FaSignInAlt className="inline mr-2" />
                    Sign In
                  </>
                )}
              </motion.button>
                 <button onClick={handleDemoStudent } className='btn btn-primary mt-2 w-full'>Demo Student Login</button>
                 <button onClick={handleDemoTutor } className='btn btn-primary mt-2 w-full'>Demo Tutor Login</button>
                 <button onClick={handleDemoAdmin } className='btn btn-primary mt-2 w-full'>Demo Admin Login</button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center my-8"
          >
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </motion.div>

          {/* Social Login */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <SocialLogin />
          </motion.div>

          {/* Register Link for Mobile */}
          <motion.div
            variants={itemVariants}
            className="text-center lg:hidden"
          >
            <p className="text-gray-600">
              New to eTuitionBd?{' '}
              <Link to="/register">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-primary-500 font-semibold hover:text-purple-700 cursor-pointer underline"
                >
                  Create Account
                </motion.span>
              </Link>
            </p>
          </motion.div>

          {/* Animated decorative line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Floating helper text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-gray-500 text-sm z-10"
      >
        <p>Need help? <span className="text-primary-500 hover:underline cursor-pointer">Contact Support</span></p>
      </motion.div>
    </motion.div>
  );
};

export default Login;