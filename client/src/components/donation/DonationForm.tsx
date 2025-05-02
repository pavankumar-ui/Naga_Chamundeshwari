import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDonationSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkout } from "./index";
import { Event } from "@shared/schema";

// Extend the donation schema for client-side validation
const donationFormSchema = insertDonationSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  amount: z.string().refine((value) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue > 0;
  }, "Please enter a valid amount"),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

interface DonationFormProps {
  eventId?: number;
  eventName?: string;
  donationType?: "general" | "pooja" | "event" | "ehundi" | "other";
  defaultPurpose?: string;
}

export function DonationForm({
  eventId,
  eventName,
  donationType = "general",
  defaultPurpose = "",
}: DonationFormProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [donationData, setDonationData] = useState<any>(null);
  const { toast } = useToast();

  // Set up form with default values
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      amount: "",
      donationType,
      purpose: eventName || defaultPurpose,
      message: "",
      gotram: "",
      nakshatra: "",
      eventId: eventId || null,
      serviceId: null
    },
  });

  async function onSubmit(data: DonationFormValues) {
    try {
      const response = await apiRequest("POST", "/api/donations", data);
      const donation = await response.json();
      
      setDonationData(donation);
      setShowCheckout(true);
      
      toast({
        title: "Donation submitted",
        description: "Please complete the payment process",
      });
    } catch (error) {
      console.error("Error creating donation:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your donation",
        variant: "destructive",
      });
    }
  }

  function handleDonationSuccess() {
    // Reset form and hide checkout
    form.reset();
    setShowCheckout(false);
    queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
    
    toast({
      title: "Thank you!",
      description: "Your donation has been received successfully.",
    });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {!showCheckout ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">
            {eventName ? `Donate for ${eventName}` : "Make a Donation"}
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donation Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter amount in INR"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the amount you wish to donate in Indian Rupees
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {!eventId && (
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose of Donation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Temple maintenance, special rituals, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="gotram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gotram (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your gotram" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nakshatra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nakshatra (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your nakshatra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions or message for the temple"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Complete Payment</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCheckout(false)}
            >
              Back
            </Button>
          </div>
          
          <div className="bg-muted/20 p-4 rounded-md mb-4">
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold">₹{donationData?.amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Purpose:</span>
              <span>{donationData?.purpose || "General Donation"}</span>
            </div>
          </div>
          
          <Checkout 
            donation={donationData} 
            onSuccess={handleDonationSuccess} 
          />
        </div>
      )}
    </div>
  );
}