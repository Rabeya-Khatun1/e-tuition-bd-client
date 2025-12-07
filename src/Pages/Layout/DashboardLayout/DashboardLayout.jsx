import React from 'react';
import { FaChalkboard, FaUserGraduate } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiChalkboardTeacherBold } from 'react-icons/pi';
import { Link, Outlet } from 'react-router';
import { IoIosSettings } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import Logo from '../../../Components/Logo/Logo';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
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
                    <div className="px-4">
                      <Logo></Logo>
                    </div>
                </nav>

                {/* PAGE CONTENT */}
                <Outlet></Outlet>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow">

                        {/* Homepage */}
                        <li>
                            <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <IoHomeSharp />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* My Tuitions */}
                        <li>
                            <Link to="/dashboard/myTuitions" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Tuitions">
                                <FaUserGraduate />
                                <span className="is-drawer-close:hidden">My Tuitions</span>
                            </Link>
                        </li>

                        {/* Post Tuition */}
                        <li>
                            <Link to="/dashboard/postTuition" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Post a Tuition">
                                <PiChalkboardTeacherBold />
                                <span className="is-drawer-close:hidden">Post a Tuition</span>
                            </Link>
                        </li>

                        {/* Applied Tutors */}
                        <li>
                            <Link to="/dashboard/appliedTutors" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Applied Tutors">
                                <FaChalkboard />
                                <span className="is-drawer-close:hidden">Applied Tutors</span>
                            </Link>
                        </li>

                        {/* Payments */}
                        <li>
                            <Link to="/dashboard/payments" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments">
                                <MdOutlinePayments />
                                <span className="is-drawer-close:hidden">Payments</span>
                            </Link>
                        </li>

                        {/* Settings */}
                        <li>
                            <Link to="/dashboard/profile-settings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                <IoIosSettings />
                                <span className="is-drawer-close:hidden">Settings</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
