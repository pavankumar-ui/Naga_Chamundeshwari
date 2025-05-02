import { donationOptions } from "@/lib/data";
import { Link } from "wouter";
import { Check, CreditCard, Banknote, QrCode, Coins } from "lucide-react";

const DonationOptions = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-cinzel font-semibold mb-4">Donations & E-hundi</h3>
          <ul className="space-y-3">
            {donationOptions.options.map((option, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-gold mt-1 mr-2" size={18} />
                <span>{option}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-4 border-t border-white/20">
            <h4 className="text-lg font-medium mb-3">E-hundi Digital Offerings</h4>
            <p className="mb-3">Make your offerings directly to the temple's digital hundi from anywhere in the world.</p>
            <div className="flex items-center mt-2">
              <Coins className="text-gold mr-2" size={18} />
              <span>Secure online offering system</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-cinzel font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <CreditCard className="text-gold mr-2" size={18} />
              <span>Online Transfer</span>
            </div>
            <div className="flex items-center">
              <Banknote className="text-gold mr-2" size={18} />
              <span>Cash Donation at Temple</span>
            </div>
            <div className="flex items-center">
              <QrCode className="text-gold mr-2" size={18} />
              <span>UPI Payment</span>
            </div>
            <div className="flex items-center">
              <Check className="text-gold mr-2" size={18} />
              <span>Cheque/DD</span>
            </div>
          </div>
          
          <div className="mt-6 bg-maroon/30 p-4 rounded-md">
            <h4 className="text-lg font-cinzel mb-2">Temple Account Details</h4>
            <p className="text-sm mb-1">Account Name: Naga Chamundeshwari Devasthana</p>
            <p className="text-sm mb-1">Account Number: XXXX XXXX XXXX 4578</p>
            <p className="text-sm mb-1">IFSC Code: ABCD0001234</p>
            <p className="text-sm">Branch: JP Nagar, Bangalore</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => {
            const donationDialog = document.createElement('div');
            donationDialog.innerHTML = `
              <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div class="p-6">
                    <h2 class="text-2xl font-bold text-maroon mb-4">Make a Donation</h2>
                    <form id="donation-form">
                      <!-- Form content will be added via DonationForm component -->
                    </form>
                  </div>
                </div>
              </div>
            `;
            document.body.appendChild(donationDialog);
            
            // Close when clicking outside
            donationDialog.addEventListener('click', (e) => {
              if (e.target === donationDialog) {
                document.body.removeChild(donationDialog);
              }
            });
            
            // Navigate to the donation page instead of using dialog
            window.location.href = '/donation';
          }}
          className="inline-block secondary-btn cursor-pointer"
        >
          Donate Now
        </button>
        <button
          onClick={() => {
            window.location.href = '/donation';
          }}
          className="inline-block secondary-btn cursor-pointer"
        >
          E-hundi Offering
        </button>
      </div>
    </div>
  );
};

export default DonationOptions;
