import React from 'react';
import { FaChalkboard, FaUserGraduate } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiChalkboardTeacherBold } from 'react-icons/pi';
import { Link, Outlet } from 'react-router';
import { IoIosSettings } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";

const DashboardLayout = () => {
    return (
       <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
           <IoHomeSharp />
            <span className="is-drawer-close:hidden"><Link to='/dashboard'>Homepage</Link></span>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My tuitions">
            {/* tuition icon */}
           
           
           <FaUserGraduate />
            <span className="is-drawer-close:hidden"><Link to='/dashboard/myTuitions'>My Tuitions</Link></span>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Post a Tuition">
            {/* tuition icon */}
           
           
           <PiChalkboardTeacherBold />
            <span className="is-drawer-close:hidden"><Link to='/postTuition'>Post a Tuition</Link></span>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Applied Tutors">
            {/* tuition icon */}
           
           
          <FaChalkboard />
            <span className="is-drawer-close:hidden"><Link to='/appliedTutors'>Applied Tutors</Link></span>
          </button>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments">
            {/* tuition icon */}
           
           
           <MdOutlinePayments />
            <span className="is-drawer-close:hidden"><Link to='/payments'>Payments</Link></span>
          </button>
        </li>

        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
       <IoIosSettings />
            <span className="is-drawer-close:hidden"><Link to='/profile-settings'>Settings</Link></span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default DashboardLayout;