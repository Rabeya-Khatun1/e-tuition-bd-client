import { motion } from "framer-motion";
import { HiOutlineBookOpen, HiOutlineCalculator, HiOutlineBeaker, HiOutlineTranslate, HiOutlineDesktopComputer, HiOutlineMusicNote } from "react-icons/hi";
import { Link } from "react-router";

const Categories = () => {
  const subjects = [
    { name: "Mathematics", count: "120+ Tutors", icon: <HiOutlineCalculator />, color: "bg-primary-50" },
    { name: "Science", count: "85+ Tutors", icon: <HiOutlineBeaker />, color: "bg-secondary-50" },
    { name: "English", count: "95+ Tutors", icon: <HiOutlineTranslate />, color: "bg-primary-50" },
    { name: "ICT & Coding", count: "50+ Tutors", icon: <HiOutlineDesktopComputer />, color: "bg-secondary-50" },
    { name: "Business Studies", count: "40+ Tutors", icon: <HiOutlineBookOpen />, color: "bg-primary-50" },
    { name: "Arts & Music", count: "30+ Tutors", icon: <HiOutlineMusicNote />, color: "bg-secondary-50" },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500">Popular Categories</h2>
            <p className="text-secondary-500 mt-2">Explore tutors by your required subject</p>
          </div>
        <Link to='/tutors'>
          <button className="btn btn-outline border-secondary-400 text-secondary-500 hover:bg-secondary-500 hover:border-secondary-500 mt-6 md:mt-0 rounded-full px-8">
            View All Subjects
          </button></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 91, 59, 0.1)" }}
              className={`p-6 rounded-[2rem] ${s.color} border border-transparent hover:border-primary-200 transition-all text-center cursor-pointer`}
            >
              <div className="text-4xl text-primary-500 mb-4 flex justify-center">{s.icon}</div>
              <h3 className="font-bold text-primary-600 text-lg">{s.name}</h3>
              <p className="text-xs text-secondary-400 mt-1 font-medium uppercase tracking-tighter">{s.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;