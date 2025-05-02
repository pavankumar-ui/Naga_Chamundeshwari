import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-light shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-16 h-16 mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1621507492022-88fcab37a467?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Temple Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-maroon rounded-full text-white font-bold">
                <span>NC</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a className={`text-dark hover:text-maroon font-medium transition duration-300 ${isActive(link.path) ? 'text-maroon' : ''}`}>
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/donation">
              <a className="bg-maroon text-white px-5 py-2 rounded-md hover:bg-red-800 transition duration-300">
                Donate
              </a>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a 
                    className={`text-dark hover:text-maroon font-medium transition duration-300 py-2 border-b border-gray-200 ${isActive(link.path) ? 'text-maroon' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Link href="/donation">
                <a 
                  className="bg-maroon text-white px-5 py-2 rounded-md hover:bg-red-800 transition duration-300 text-center"
                  onClick={closeMenu}
                >
                  Donate
                </a>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
