import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router";

const Highlights = () => {
  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Image/Visual */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="Education" 
              className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
            />
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-primary-500 mb-6 leading-tight">
              A Transparent Platform Designed for Excellence
            </h2>
            <p className="text-secondary-600 text-lg mb-8">
              We eliminate the middleman and the uncertainty. Connect directly with verified professionals who are passionate about teaching.
            </p>
            
            <ul className="space-y-5">
              {[
                "Direct communication between Student and Tutor",
                "Advanced filtering based on location and budget",
                "Review system based on real tutoring sessions",
                "24/7 Admin support for dispute resolution"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-primary-600 font-bold">
                  <FiCheckCircle className="text-secondary-400 text-2xl flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

           <Link to='/dashboard/postTuition'>
            <button className="btn btn-primary mt-10 rounded-full px-10 h-14 shadow-lg shadow-primary-200">
              Get Started Now
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Highlights;