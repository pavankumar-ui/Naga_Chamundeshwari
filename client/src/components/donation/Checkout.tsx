import { useState, useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Donation } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY");
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  clientSecret: string;
  donationId: number;
  onSuccess: () => void;
}

const CheckoutForm = ({ clientSecret, donationId, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Payment failed",
          description: error.message || "An error occurred during payment processing",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Update donation status in database
        await apiRequest("PATCH", `/api/donations/${donationId}/status`, {
          status: "completed",
          transactionId: paymentIntent.id,
        });

        toast({
          title: "Payment successful",
          description: "Thank you for your generous donation!",
        });

        onSuccess();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Complete Donation"
        )}
      </Button>
    </form>
  );
};

interface CheckoutProps {
  donation: Donation;
  onSuccess: () => void;
}

export default function Checkout({ donation, onSuccess }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: donation.amount,
          donationId: donation.id
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Could not initialize payment system. Please try again later.");
        toast({
          title: "Payment Error",
          description: "Could not initialize payment system. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [donation.amount, donation.id, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">Complete Your Donation</h3>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <CheckoutForm clientSecret={clientSecret} donationId={donation.id} onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  );
}