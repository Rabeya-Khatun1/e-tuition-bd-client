import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxios from '../../../../Hooks/useAxios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaUserTag } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { signUpUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const axios = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUserRegister = (data) => {
    setIsSubmitting(true);
    const photoImg = data.photo[0];

    signUpUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", photoImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

        axios.post(image_API_URL, formData)
          .then((result) => {
            const photoURL = result.data.data.url;

            const userInfo = {
              displayName: data.name,
              email: data.email,
              photoURL: photoURL,
              phoneNumber: data.phoneNumber,
              role: data.role,
            };

            axios.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  Swal.fire({
                    title: "Registration Successful!",
                    text: "Welcome to Our Website",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                  });

                  const userProfile = {
                    displayName: data.name,
                    photoURL: photoURL
                  };

                  updateUserProfile(userProfile)
                    .then(() => {
                      setTimeout(() => {
                        navigate(location?.state || '/');
                      }, 1000);
                    })
                    .catch(error => {
                      console.log(error);
                      setIsSubmitting(false);
                    });
                }
              });
          })
          .catch(err => {
            console.log(err);
            setIsSubmitting(false);
          });
      })
      .catch(err => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50 px-4 py-4"
    >
      <title>eTuitionBd - Registration</title>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col lg:flex-row items-center w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white"
      >
        {/* Left Side - Image/Illustration */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hidden lg:flex lg:w-1/2 bg-primary-200 text-white p-12 flex-col justify-center items-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-8"
            >
              <FaUserPlus className="text-8xl mx-auto mb-6 opacity-90" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-6 leading-tight"
            >
              Join Our Learning Community
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg opacity-90 mb-8"
            >
              Connect with verified tutors or find perfect learning opportunities. Start your educational journey today!
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
            >
              <p className="text-sm">Already have an account?</p>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-6 py-2 bg-white text-primary-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign In Here
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full lg:w-1/2 p-8 md:p-12"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center lg:text-left mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Fill in your details to start your learning journey
            </p>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit(handleUserRegister)}>
            {/* Name Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaUser className="inline mr-2 text-primary-500" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      ⚠️ Name is required
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaEnvelope className="inline mr-2 text-primary-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="john@example.com"
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
                      ⚠️ Valid email is required
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Photo Upload */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaCamera className="inline mr-2 text-primary-500" />
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full file:bg-purple-50 file:text-primary-500 file:border-purple-300 hover:file:bg-purple-100"
                    accept="image/*"
                  />
                </div>
                {selectedFile && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400"
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.photo && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    ⚠️ Profile photo is required
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaLock className="inline mr-2 text-primary-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: true,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message: ""
                    }
                  })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <AnimatePresence>
                  {errors.password?.type === 'pattern' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      ⚠️ Must contain uppercase, lowercase, number & 6+ characters
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Role Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaUserTag className="inline mr-2 text-primary-500" />
                Your Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('role', {
                    required: 'Role is required',
                    pattern: {
                      value: /^[a-z]+$/,
                      message: 'Role must be in lowercase'
                    }
                  })}
                  placeholder="student or tutor"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
                <AnimatePresence>
                  {errors.role && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      ⚠️ {errors.role.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <label className="block text-gray-700 font-medium mb-2">
                <FaPhone className="inline mr-2 text-primary-500" />
                Phone Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register('phoneNumber')}
                  placeholder="+880 1XXX XXXXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'btn cursor-not-allowed' 
                    : 'btn btn-primary hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center my-8"
          >
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </motion.div>

          {/* Social Login */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <SocialLogin />
          </motion.div>

          {/* Login Link for Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 lg:hidden"
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-primary-500 font-semibold hover:text-purple-700 cursor-pointer underline"
                >
                  Sign In
                </motion.span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;