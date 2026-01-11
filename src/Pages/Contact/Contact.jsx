import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {

  const handleForm = (e) => {
    e.preventDefault();
    toast.success(
      "Your message was sent successfully! You will receive a reply shortly."
    );
  };

  return (
    <section className=" py-24" id="contact">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Contact Us</h2>
          <div className="w-28 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className=" text-lg max-w-2xl mx-auto">
            Have questions or need help? Feel free to reach out anytime. We are here to assist you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-500 text-white rounded-[2rem] p-10 space-y-8 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>

            <div className="flex items-start gap-5">
              <div className="bg-primary-400 p-3 rounded-xl">
                <FiPhone size={24} />
              </div>
              <div>
                <p className="text-primary-100 text-sm">Call Us</p>
                <p className="font-bold">+880 1234 567 890</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-primary-400 p-3 rounded-xl">
                <FiMail size={24} />
              </div>
              <div>
                <p className="text-primary-100 text-sm">Email Us</p>
                <p className="font-bold">support@etuitionbd.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-primary-400 p-3 rounded-xl">
                <FiMapPin size={24} />
              </div>
              <div>
                <p className="text-primary-100 text-sm">Our Office</p>
                <p className="font-bold">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="bg-primary-400 p-3 rounded-xl">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-primary-100 text-sm">Working Hours</p>
                <p className="font-bold">Sat - Thu: 10AM - 8PM</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-6">
              <FaFacebook className="text-white text-3xl hover:scale-125 transition-transform cursor-pointer" />
              <FaWhatsapp className="text-green-400 text-3xl hover:scale-125 transition-transform cursor-pointer" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-2xl p-10 hover:shadow-blue-200 transition-shadow duration-300"
          >
            <h3 className="text-3xl font-semibold mb-8 text-gray-800">Send a Message</h3>
            <form onSubmit={handleForm} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 outline-none text-gray-700 placeholder-gray-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 outline-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <select
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 outline-none text-gray-700 placeholder-gray-400"
                required
              >
                <option value="" disabled selected>
                  Select an inquiry type
                </option>
                <option>Tutor Verification Issue</option>
                <option>Payment/Refund Query</option>
                <option>Technical Support</option>
                <option>Others</option>
              </select>

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 outline-none text-gray-700 placeholder-gray-400"
                required
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn btn-primary hover:bg-primary-600 transition font-medium flex items-center justify-center gap-2"
              >
                Send Message <FiSend />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
