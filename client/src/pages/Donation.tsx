import { donationOptions } from "@/lib/data";
import DonationOptions from "@/components/donation/DonationOptions";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DonationForm } from "@/components/donation/DonationForm";

const Donation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Check if user came with intent to donate immediately
  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'donate') {
      setIsDialogOpen(true);
    }
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Donate - Naga Chamundeshwari Temple</title>
        <meta name="description" content="Support Naga Chamundeshwari Temple through your generous donations." />
      </Helmet>
      
      <section className="donation-section py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-cinzel font-bold mb-3">{donationOptions.title}</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="mb-8">{donationOptions.description}</p>
            
            {/* Quick Donate Button */}
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="mb-8 bg-maroon hover:bg-maroon/90 text-white px-6 py-3 rounded-md font-medium text-lg transition"
            >
              Quick Donate Now
            </button>
            
            <DonationOptions />
            
            <p className="mt-6 text-sm">{donationOptions.taxExemption}</p>
          </div>
        </div>
      </section>
      
      {/* Donation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-cinzel text-maroon">
              Make a Donation
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to make your offering to Naga Chamundeshwari Temple.
            </DialogDescription>
          </DialogHeader>
          
          <DonationForm 
            donationType="general"
            defaultPurpose="Temple Donation"
          />
        </DialogContent>
      </Dialog>
      
      <section className="py-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">How Your Donations Help</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Your contributions make a significant difference in preserving our temple and supporting the community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-light p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Temple Maintenance</h3>
              <p className="text-dark text-sm">
                Helps in preserving the ancient temple structure, renovations, repairs, and maintaining cleanliness.
              </p>
            </div>
            
            <div className="bg-light p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Daily Rituals</h3>
              <p className="text-dark text-sm">
                Enables uninterrupted daily poojas, abhishekams, and rituals performed by our priests.
              </p>
            </div>
            
            <div className="bg-light p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Community Services</h3>
              <p className="text-dark text-sm">
                Supports annadanam (food distribution), educational initiatives, and medical camps for the community.
              </p>
            </div>
            
            <div className="bg-light p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Cultural Preservation</h3>
              <p className="text-dark text-sm">
                Helps preserve ancient traditions through festivals, music, dance performances, and cultural education.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Donation FAQs</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Is my donation tax-deductible?</h3>
              <p className="text-dark">
                Yes, all donations to Naga Chamundeshwari Temple are tax-exempted under Section 80G of the Income Tax Act. 
                You will receive an official receipt that can be used for tax purposes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Can I specify how my donation should be used?</h3>
              <p className="text-dark">
                Absolutely. When making your donation, you can specify which program or area you would like your 
                contribution to support. We honor donor intentions and ensure funds are allocated accordingly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Do you accept international donations?</h3>
              <p className="text-dark">
                Yes, we accept donations from international devotees through our online payment gateway. 
                Please note that foreign donations are subject to FCRA regulations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Can I make a monthly recurring donation?</h3>
              <p className="text-dark">
                Yes, we offer options for setting up recurring donations. This helps us plan and sustain our 
                programs throughout the year. You can set this up through our online donation portal.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-cinzel font-semibold text-maroon mb-2">Is there a minimum donation amount?</h3>
              <p className="text-dark">
                No, we appreciate donations of any amount. Every contribution, regardless of size, 
                helps us in our mission and is received with equal gratitude.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donation;
