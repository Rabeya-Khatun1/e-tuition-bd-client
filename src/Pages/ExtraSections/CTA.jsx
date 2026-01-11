import React from 'react';
import { useNavigate } from 'react-router';
import { UserPlus, Search, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          
   
          <motion.div 
            whileHover={{ y: -5 }}
            className="card bg-primary-100 text-primary-content shadow-xl overflow-hidden relative"
          >
            <div className="card-body z-10">
              <div className="flex items-center gap-3 mb-2">
                <Search size={32} className="opacity-80" />
                <h2 className="card-title text-3xl font-bold italic tracking-tight">Need a Tutor?</h2>
              </div>
              <p className="text-lg opacity-90 mb-6">
                Post your requirements today and get connected with verified subject experts. 
                Secure payments and quality guaranteed.
              </p>
              <div className="card-actions justify-start">
                <button 
                  onClick={() => navigate('/register')}
                  className="btn btn-secondary btn-lg shadow-lg border-none"
                >
                  Post a Tuition <UserPlus size={20} />
                </button>
              </div>
            </div>
         
            <GraduationCap size={200} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
          </motion.div>

          {/* For Tutors Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="card bg-primary-300 text-neutral-content shadow-xl overflow-hidden relative"
          >
            <div className="card-body z-10">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap size={32} className="opacity-80" />
                <h2 className="card-title text-3xl font-bold italic tracking-tight">Want to Teach?</h2>
              </div>
              <p className="text-lg opacity-90 mb-6">
                Browse through hundreds of authentic tuition posts. Build your profile, 
                apply to jobs, and start earning instantly.
              </p>
              <div className="card-actions justify-start">
                <button 
                  onClick={() => navigate('/tuitions')}
                  className="btn btn-accent btn-lg shadow-lg border-none"
                >
                  Find Tuition Jobs <Search size={20} />
                </button>
              </div>
            </div>
      
            <UserPlus size={200} className="absolute -bottom-10 -right-10 opacity-10 -rotate-12" />
          </motion.div>

        </div>

        <div className="mt-12 text-center">
          <p className="text-base-content/60 font-medium">
            Reviewing this project for a job task? 
            <button 
              onClick={() => navigate('/dashboard')} 
              className="link link-primary ml-1"
            >
              Access Admin Credentials here.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;