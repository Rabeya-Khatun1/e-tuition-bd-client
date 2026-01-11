import { FiArrowRight } from "react-icons/fi";
import { motion } from 'framer-motion';

const Blog = () => {
  const blogs = [
    { title: "Tips for First-Time Tutors", date: "Aug 12, 2025", category: "Education", img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500" },
    { title: "How to Ace Your Exams", date: "Sep 05, 2025", category: "Student Life", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500" }
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-bold text-primary-500">Latest Insights</h2>
          <button className="btn btn-ghost text-secondary-500 hover:text-primary-500">Read All Articles <FiArrowRight /></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {blogs.map((b, i) => (
            <motion.div key={i} className="flex flex-col md:flex-row bg-base-50 rounded-[2.5rem] overflow-hidden border border-secondary-100 group shadow-sm hover:shadow-xl transition-all">
              <div className="md:w-1/2 overflow-hidden">
                <img src={b.img} alt="blog" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-10 md:w-1/2 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary-400 uppercase mb-2">{b.category}</span>
                <h3 className="text-2xl font-bold text-primary-600 mb-4">{b.title}</h3>
                <p className="text-secondary-600 text-sm mb-6">Learn the best practices to excel in your tutoring career and make a real difference...</p>
                <div className="flex items-center justify-between text-secondary-400 text-xs">
                  <span>{b.date}</span>
                  <span className="font-bold cursor-pointer text-primary-500">Read More</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Blog;