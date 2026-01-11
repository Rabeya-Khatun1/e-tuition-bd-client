import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-secondary-500 to-primary-600 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Stay Ahead in Learning</h2>
          <p className="text-primary-200 text-lg mb-12 max-w-2xl mx-auto opacity-90">
            Join 5,000+ students and tutors. Get notified about new tuition posts and expert educational tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto bg-white/10 p-2 rounded-full backdrop-blur-md">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="input bg-white border-none rounded-full flex-1 px-8 focus:ring-2 ring-primary-300 h-16 text-neutral-800"
            />
            <button className="btn btn-primary h-16 rounded-full border-none px-10 shadow-lg flex items-center gap-2 text-lg hover:scale-105 transition-transform">
              Join Now <FiSend />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;