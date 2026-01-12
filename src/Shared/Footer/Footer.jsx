import React from 'react';
import twitter from '../../assets/twitter.png'
import Logo from '../../Components/Logo/Logo'
import { Link } from 'react-router';

const Footer = () => {
  return (
<div className=' text-neutral-content'>
      <footer className=" flex flex-col justify-start items-start text-neutral-content p-5 ml-20">
      <div className='my-10'>
        <Logo></Logo>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 
        
        <div>


          <h6 className="footer-title text-white font-bold mb-2">About Platform</h6>
          <p className="text-neutral-content text-sm">
            Our platform provides powerful tools and resources to help you stay connected,
            learn, and grow. We focus on delivering a smooth, user-friendly experience.
          </p>
        </div>

       
     <div>
      
  <ul className="space-y-1 text-neutral-content">
    <h1 className='font-semibold'>QUICKE LINKS</h1>
    <li><Link to="/" className="link link-hover">Home</Link></li>
    <li><Link to="/features" className="link link-hover">Features</Link></li>
    <li><Link to="/faq" className="link link-hover">FAQ</Link></li>
  </ul>
</div>

<div>
  <ul className="space-y-1 text-ba-content">
    <li><Link to="/about" className="link link-hover">About Us</Link></li>
    <li><Link to="/blog" className="link link-hover">Blog</Link></li>
    <li><Link to="/privacy-policy" className="link link-hover">Privacy Policy</Link></li>
    <li><Link to="/contact" className="link link-hover">Contact</Link></li>
  </ul>
</div>

    
        <div>
          <h6 className="footer-title text-white font-bold mb-2">Contact Information</h6>
          <p className="text-sm">Email: etuitionbd@gmail.com</p>
          <p className="text-sm">Phone: +880 1611096577</p>
          <p className="text-sm">Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="footer-title text-white font-bold mb-2">Follow Us</h6>
         <div className="flex space-x-3 mt-2">
  <a href="https://x.com/prorabeya2008" target="_blank" rel="noopener noreferrer">
    <img className="w-6 h-6" src={twitter} alt="X"/>
  </a>
  <a href="https://www.facebook.com/rabeya17/" target="_blank" rel="noopener noreferrer">
    <img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png" alt="Facebook"/>
  </a>
  <a href="https://www.instagram.com/prorabeya2008/" target="_blank" rel="noopener noreferrer">
    <img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"/>
  </a>
  <a href="https://www.linkedin.com/in/rabeya123/" target="_blank" rel="noopener noreferrer">
    <img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn"/>
  </a>
</div>

        </div>

      </div>

      {/* Copyright */}
     
    </footer>
     <div className="text-center mt-8 border-t border-neutral-content/20 pt-4 text-sm">
        © 2025 eTuitionBD. All rights reserved.
      </div>
</div>
  );
};

export default Footer;
