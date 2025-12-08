import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth'
import Swal from 'sweetalert2';
const Navbar = () => {

  const { user,signOutUser } = useAuth();

  const links = <>
    <Link to='/' className='m-2'><a>Home</a></Link>
    <Link to='/tuitions' className='m-2'><a>Tuitions</a></Link>
    <Link to='/tutors' className='m-2'><a>Tutors</a></Link>
    <Link className='m-2'><a> About </a></Link>
    <Link className='m-2'><a>Contact </a></Link>
    <Link to='/dashboard' className='m-2'><a>Dashboard </a></Link>

  </>
const navigate = useNavigate();

const handleSignOut = ()=>{
  signOutUser()
  .then( ()=>{
    Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
    navigate('/login')
  })
}

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><Logo></Logo></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">

        {
          user ? <button
            className=" px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors"
          onClick={handleSignOut}
          >
            Sign Out
          </button> : <button
            className=" px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors"
          >
            <Link to='/login'>Login</Link>/ <Link to='/register'>Register</Link>
          </button>
        }

      </div>
    </div>
  );
};

export default Navbar;