import {  FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="rounded-md text-white pb-[1rem] ">
      <div className="flex items-center p-[1rem]">
     
        <div className='flex flex-col w-full items-center justify-center'>
        <div className="flex justify-center items-center space-x-4">
          <a href="https://github.com/aswathcm29" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={24} />
          </a>
          <a href="https://x.com/aswath_cm0316" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/_.aswathcm_29" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com/in/aswathcm29" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Aswath C M. All rights reserved.</p>
        </div>
        </div>
        </div>
    </footer>
  );
}
export default Footer;