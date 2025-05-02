import { donationOptions } from "@/lib/data";
import { Link } from "wouter";
import { Check, CreditCard, Banknote, QrCode } from "lucide-react";

const DonationOptions = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-cinzel font-semibold mb-4">Donation Options</h3>
          <ul className="space-y-3">
            {donationOptions.options.map((option, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-gold mt-1 mr-2" size={18} />
                <span>{option}</span>
              </li>
            ))}
          </ul>
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
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/contact">
          <a className="inline-block secondary-btn">Donate Now</a>
        </Link>
      </div>
    </div>
  );
};

export default DonationOptions;
