import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="py-24  relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Trusted by Parents & Tutors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-10 rounded-3xl shadow-2xl relative"
            >
              <FaQuoteLeft className="text-primary-100 text-5xl absolute top-6 right-8 opacity-50" />
              <div className="flex gap-1 mb-4 text-orange-400">
                {[...Array(5)].map((_, j) => <FaStar key={j} />)}
              </div>
              <p className="text-secondary-600 italic mb-8">"I found an amazing math tutor for my daughter within a day. The platform is incredibly transparent."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary-200 rounded-full border-2 border-primary-500 overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-600">Sarah Jenkins</h4>
                  <p className="text-xs text-secondary-400 font-bold uppercase tracking-widest">Parent</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;