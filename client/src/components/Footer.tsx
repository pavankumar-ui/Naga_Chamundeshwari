import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1621507492022-88fcab37a467?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                  alt="Temple Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-cinzel font-bold text-gold">Naga Chamundeshwari</h3>
                <p className="text-sm text-gray-300">Temple & Devasthana</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              A sacred place of worship with a rich heritage dating back to the 12th century.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-cinzel font-semibold text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition duration-300">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Temple Services</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-gray-400 hover:text-white transition duration-300">Events & Festivals</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-gray-400 hover:text-white transition duration-300">Gallery</a>
                </Link>
              </li>
              <li>
                <Link href="/donation">
                  <a className="text-gray-400 hover:text-white transition duration-300">Donations</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-cinzel font-semibold text-gold mb-6">Temple Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Daily Poojas</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Special Abhishekam</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Homam/Yagya</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Marriage Ceremonies</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Annadanam</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Prasadam</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-400 hover:text-white transition duration-300">Temple Tours</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-cinzel font-semibold text-gold mb-6">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-gold mt-1 mr-2" size={18} />
                <span className="text-gray-400">
                  Naga Chamundeshwari Temple, <br />
                  Temple Street, Mysore, <br />
                  Karnataka - 570001, India
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="text-gold mt-1 mr-2" size={18} />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-gold mt-1 mr-2" size={18} />
                <span className="text-gray-400">info@nagachamundeshwari.org</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-gold mt-1 mr-2" size={18} />
                <span className="text-gray-400">Open Daily: 6:00 AM - 8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Naga Chamundeshwari Temple. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
