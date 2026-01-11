import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <Eye className="text-primary" />,
            title: "Information We Collect",
            desc: "We collect personal information such as your name, email address, and profile details when you register as a Student or Tutor. For students, we collect tuition post details; for tutors, we collect professional expertise and applications."
        },
        {
            icon: <Lock className="text-secondary" />,
            title: "Data Security",
            desc: "Your security is our priority. We use Firebase Authentication and JWT (JSON Web Tokens) to ensure your account is protected. Payment information is securely handled via Stripe; we do not store your card details on our servers."
        },
        {
            icon: <ShieldCheck className="text-success" />,
            title: "How We Use Your Data",
            desc: "Data is used to facilitate the connection between students and tutors, process payments, and improve platform experience. Admins use this data to verify users and ensure the authenticity of tuition posts."
        },
        {
            icon: <Bell className="text-warning" />,
            title: "Notifications",
            desc: "We may send you system-related notifications regarding tuition approvals, application status, or payment confirmations. You can manage these settings in your dashboard."
        }
    ];

    return (
        <div className="bg-base-100 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <ShieldCheck size={48} className="text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 italic">Privacy Policy</h1>
                    <p className="text-base-content/70">
                        Last Updated: December 2025 | Your privacy and trust are our top priorities at eTuitionBD.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid gap-8">
                    {sections.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="card-body flex-row gap-5 items-start">
                                <div className="p-3 bg-base-100 rounded-lg shadow-inner">
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className="card-title text-xl mb-2">{item.title}</h2>
                                    <p className="text-base-content/70 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 p-8 border-2 border-dashed border-base-300 rounded-2xl text-center"
                >
                    <FileText className="mx-auto mb-4 text-base-content/30" size={32} />
                    <h3 className="text-lg font-semibold mb-2">Have Questions?</h3>
                    <p className="text-sm text-base-content/60 mb-4">
                        If you have any questions about this Privacy Policy or how we handle your data, please contact our support team.
                    </p>
                   <Link to='/contact'>
                    <button className="btn btn-primary btn-outline btn-sm">Contact Support</button></Link>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;