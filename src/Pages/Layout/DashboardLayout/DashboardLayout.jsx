import React from 'react';
import { FaChalkboard, FaUserGraduate } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiChalkboardTeacherBold } from 'react-icons/pi';
import { Link, Outlet } from 'react-router';
import { IoIosSettings, IoMdAnalytics } from "react-icons/io";
import { MdManageAccounts, MdOutgoingMail, MdOutlineManageHistory, MdOutlinePayments, MdOutlineReviews } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { RiFolderHistoryLine } from "react-icons/ri";
import Logo from '../../../Components/Logo/Logo';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Components/Loading/Loading';

const DashboardLayout = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    // Helper function to render a sidebar link with tooltip
    const SidebarLink = ({ to, icon: Icon, label }) => (
        <li className="relative group">
            <Link to={to} className="flex items-center gap-3 p-2">
                <Icon className="text-xl" />
                <span className="is-drawer-close:hidden">{label}</span>
            </Link>
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                             whitespace-nowrap bg-black text-white text-xs 
                             px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200">
                {label}
            </span>
        </li>
    );

    return (
        <div className="drawer lg:drawer-open">
            <title>eTuitionBd-Dashboard-Home</title>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                            <path d="M4 4h16v16H4z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <Link to='/'><div className="px-4">
                        <Logo />
                    </div></Link>
                </nav>

                {/* PAGE CONTENT */}
                <Outlet />
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow">

                        {/* Homepage */}
                        <SidebarLink to="/dashboard" icon={IoHomeSharp} label="Homepage" />

                        {/* Student Links */}
                        {role === 'student' && (
                            <>
                                <SidebarLink to="/dashboard/myTuitions" icon={FaUserGraduate} label="My Tuitions" />
                                <SidebarLink to="/dashboard/postTuition" icon={PiChalkboardTeacherBold} label="Post a Tuition" />
                                <SidebarLink to="/dashboard/appliedTutors" icon={FaChalkboard} label="Applied Tutors" />
                                <SidebarLink to="/dashboard/payments" icon={MdOutlinePayments} label="Payments" />
                            </>
                        )}

                        {/* Tutor Links */}
                        {role === 'tutor' && (
                            <>
                                <SidebarLink to="/dashboard/my-applications" icon={VscGitStashApply} label="My Applications" />
                                <SidebarLink to="/dashboard/ongoing-tuitions" icon={MdOutgoingMail} label="On Going Tuitions" />
                                <SidebarLink to="/dashboard/revenue-history" icon={RiFolderHistoryLine} label="Revenue History" />
                                <SidebarLink to="/dashboard/students-reviews" icon={MdOutlineReviews} label="Students Reviews" />
                            </>
                        )}

                        {/* Admin Links */}
                        {role === 'admin' && (
                            <>
                                <SidebarLink to="/dashboard/user-management" icon={MdManageAccounts} label="User Management" />
                                <SidebarLink to="/dashboard/tuition-management" icon={MdOutlineManageHistory} label="Tuition Management" />
                                <SidebarLink to="/dashboard/report-analytics" icon={IoMdAnalytics} label="Reports & Analytics" />
                            </>
                        )}

                        {/* Settings */}
                        <SidebarLink to="/dashboard/profile-settings" icon={IoIosSettings} label="Settings" />

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
