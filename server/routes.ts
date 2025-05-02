import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { 
  insertInquirySchema, 
  insertDonationSchema, 
  insertContactSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required for donation processing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Get all services
  apiRouter.get("/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  // Get service by ID
  apiRouter.get("/services/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  
  // Get all events
  apiRouter.get("/events", async (_req: Request, res: Response) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  
  // Get event by ID
  apiRouter.get("/events/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  
  // Get all gallery items
  apiRouter.get("/gallery", async (_req: Request, res: Response) => {
    try {
      const galleryItems = await storage.getAllGallery();
      res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      res.status(500).json({ message: "Failed to fetch gallery" });
    }
  });
  
  // Get gallery item by ID
  apiRouter.get("/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gallery item ID" });
      }
      
      const galleryItem = await storage.getGalleryItem(id);
      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      
      res.json(galleryItem);
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });
  
  // Create inquiry (contact form)
  apiRouter.post("/inquiries", async (req: Request, res: Response) => {
    try {
      const inquiryData = insertInquirySchema.safeParse(req.body);
      
      if (!inquiryData.success) {
        const validationError = fromZodError(inquiryData.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const inquiry = await storage.createInquiry(inquiryData.data);
      res.status(201).json(inquiry);
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });
  
  // Create contact message
  apiRouter.post("/contacts", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.safeParse(req.body);
      
      if (!contactData.success) {
        const validationError = fromZodError(contactData.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const contact = await storage.createContact(contactData.data);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Create donation
  apiRouter.post("/donations", async (req: Request, res: Response) => {
    try {
      const donationData = insertDonationSchema.safeParse(req.body);
      
      if (!donationData.success) {
        const validationError = fromZodError(donationData.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const donation = await storage.createDonation(donationData.data);
      res.status(201).json(donation);
    } catch (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to process donation" });
    }
  });
  
  // Get donation by ID
  apiRouter.get("/donations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid donation ID" });
      }
      
      const donation = await storage.getDonation(id);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      
      res.json(donation);
    } catch (error) {
      console.error("Error fetching donation:", error);
      res.status(500).json({ message: "Failed to fetch donation" });
    }
  });
  
  // Update donation status
  apiRouter.patch("/donations/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid donation ID" });
      }
      
      const { status, transactionId } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const donation = await storage.updateDonationStatus(id, status, transactionId);
      res.json(donation);
    } catch (error) {
      console.error("Error updating donation status:", error);
      res.status(500).json({ message: "Failed to update donation status" });
    }
  });
  
  // Create a payment intent for Stripe
  apiRouter.post("/create-payment-intent", async (req: Request, res: Response) => {
    try {
      const { amount, donationId } = req.body;
      
      if (!amount || !donationId) {
        return res.status(400).json({ message: "Amount and donationId are required" });
      }
      
      // Get the donation to validate it exists
      const donation = await storage.getDonation(donationId);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      
      // Convert amount to cents for Stripe (e.g., 10.50 -> 1050)
      const amountInCents = Math.round(parseFloat(amount) * 100);
      
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "inr", // Using Indian Rupees
        metadata: {
          donationId: donationId.toString(),
          donationType: donation.donationType,
          purpose: donation.purpose || "General Donation"
        }
      });
      
      // Return the client secret to the client
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });
  
  // Webhook endpoint for Stripe events
  apiRouter.post("/stripe-webhook", express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    
    try {
      // This endpoint is for future use when you set up the webhook with Stripe
      // The webhook secret would need to be configured in your environment variables
      // const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
      
      // Instead, we'll manually process the event type
      const payload = req.body;
      const event = JSON.parse(payload.toString());
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const donationId = parseInt(paymentIntent.metadata.donationId);
        
        // Update donation status to completed
        await storage.updateDonationStatus(
          donationId, 
          'completed', 
          paymentIntent.id
        );
        
        console.log(`Payment for donation ${donationId} completed successfully`);
      }
      
      res.json({ received: true });
    } catch (err) {
      const error = err as Error;
      console.error('Webhook error:', error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });

  // Mount the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
