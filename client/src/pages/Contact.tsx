import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { templeInfo } from "@/lib/data";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Naga Chamundeshwari Temple</title>
        <meta name="description" content="Get in touch with Naga Chamundeshwari Temple for information, services, or inquiries." />
      </Helmet>
      
      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">Contact Us</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Get in touch with us for temple information, services, or any other queries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-light p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-cinzel font-semibold text-maroon mb-6">Temple Address</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-maroon mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p>{templeInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-maroon mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p>{templeInfo.phone}</p>
                      <p>{templeInfo.alternatePhone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-maroon mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p>{templeInfo.email}</p>
                      <p>{templeInfo.alternateEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-maroon mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium">Temple Office Hours</h4>
                      <p>{templeInfo.timings.officeHours.weekdays}</p>
                      <p>{templeInfo.timings.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-maroon text-white rounded-full flex items-center justify-center hover:bg-red-800 transition duration-300"
                      aria-label="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-maroon text-white rounded-full flex items-center justify-center hover:bg-red-800 transition duration-300"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-maroon text-white rounded-full flex items-center justify-center hover:bg-red-800 transition duration-300"
                      aria-label="Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-maroon text-white rounded-full flex items-center justify-center hover:bg-red-800 transition duration-300"
                      aria-label="YouTube"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-light p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-cinzel font-semibold text-maroon mb-6">Get in Touch</h3>
                <ContactForm />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="bg-light p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4 text-center">Temple Location</h3>
              <div className="w-full h-80 rounded-md overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.5544585677!2d76.6481093!3d12.3051511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381169d999%3A0x772e622e9f07fe!2sMysore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1635835741628!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Temple Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Visit Information</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Plan your visit to our temple with this helpful information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Transportation</h3>
              <ul className="space-y-2 text-dark">
                <li>• 5 km from Mysore Railway Station</li>
                <li>• 3 km from Mysore Central Bus Stand</li>
                <li>• Auto-rickshaws and taxis available</li>
                <li>• City bus routes: 101, 201, 305</li>
                <li>• Limited parking available on premises</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Dress Code & Etiquette</h3>
              <ul className="space-y-2 text-dark">
                <li>• Traditional/modest attire recommended</li>
                <li>• Remove footwear before entering temple</li>
                <li>• Maintain silence near sanctum sanctorum</li>
                <li>• No photography in main shrine area</li>
                <li>• Follow instructions from temple staff</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Facilities</h3>
              <ul className="space-y-2 text-dark">
                <li>• Free drinking water available</li>
                <li>• Prasadam counter (offerings)</li>
                <li>• Rest areas within temple premises</li>
                <li>• Wheelchair accessibility</li>
                <li>• First aid services available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
