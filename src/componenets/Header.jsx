import { Link, NavLink } from 'react-router';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Button from './Button';

function Header() {
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    { id: 'about', label: 'About', icon: <FaInfoCircle />, to: '/about' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, to: '/contact' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="z-30 sticky top-0 bg-gray-800 text-white px-4">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div>
          {' '}
          <Link to="/" className="text-xl font-bold">
            Lean Canvas
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4 ">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className=" hover:text-gray-300"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars></FaBars>
        </button>
        <Button className="hidden md:block">lecture</Button>
      </div>

      {/* Mobile Menu */}
      <aside
        className={`
          fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 md:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          transform transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
          >
            <FaTimes onClick={toggleMenu} className="h-6 w-6"></FaTimes>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className=" hover:text-gray-300"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}

export default Header;
