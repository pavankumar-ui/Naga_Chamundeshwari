import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  events, type Event, type InsertEvent,
  gallery, type Gallery, type InsertGallery,
  inquiries, type Inquiry, type InsertInquiry,
  donations, type Donation, type InsertDonation,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Gallery
  getAllGallery(): Promise<Gallery[]>;
  getGalleryItem(id: number): Promise<Gallery | undefined>;
  createGalleryItem(galleryItem: InsertGallery): Promise<Gallery>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getAllDonations(): Promise<Donation[]>;
  getDonation(id: number): Promise<Donation | undefined>;
  updateDonationStatus(id: number, status: string, transactionId?: string): Promise<Donation>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private events: Map<number, Event>;
  private galleryItems: Map<number, Gallery>;
  private inquiries: Map<number, Inquiry>;
  private donations: Map<number, Donation>;
  private contacts: Map<number, Contact>;
  
  private userCurrentId: number;
  private serviceCurrentId: number;
  private eventCurrentId: number;
  private galleryCurrentId: number;
  private inquiryCurrentId: number;
  private donationCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.events = new Map();
    this.galleryItems = new Map();
    this.inquiries = new Map();
    this.donations = new Map();
    this.contacts = new Map();
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.eventCurrentId = 1;
    this.galleryCurrentId = 1;
    this.inquiryCurrentId = 1;
    this.donationCurrentId = 1;
    this.contactCurrentId = 1;
    
    // Initialize with default data
    this.initDefaultData();
  }

  private initDefaultData() {
    // Add default services
    const defaultServices: InsertService[] = [
      {
        name: "Daily Pooja",
        description: "Regular worship rituals performed for the deity including abhishekam, alankaram, and naivedyam.",
        price: "₹251 onwards",
        imageUrl: "https://images.unsplash.com/photo-1623940580041-5e54cc9182a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Special Abhishekam",
        description: "Sacred bathing ritual of the deity with milk, curd, honey, ghee, and other auspicious substances.",
        price: "₹501 onwards",
        imageUrl: "https://images.unsplash.com/photo-1609833940049-7856efc8d6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Homam/Yagya",
        description: "Sacred fire ritual performed by learned priests to invoke divine blessings for specific purposes.",
        price: "₹1,100 onwards",
        imageUrl: "https://images.unsplash.com/photo-1616058581804-1586116c8293?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Sahasranama Archana",
        description: "Worship by reciting the 1008 divine names of the deity with flowers and other offerings.",
        price: "₹351 onwards",
        imageUrl: "https://images.unsplash.com/photo-1609177988552-0b04ad4423e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "E-Hundi Donation",
        description: "Make offerings to the temple electronically, similar to the traditional hundi donation system but through online means.",
        price: "Any amount",
        imageUrl: "https://images.unsplash.com/photo-1642982166809-50eed2787904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Shraddha Ceremony",
        description: "Ancestral rituals performed to pay homage to departed souls and seek their blessings.",
        price: "₹751 onwards",
        imageUrl: "https://images.unsplash.com/photo-1589307357824-52c3a3d14098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      }
    ];
    
    defaultServices.forEach(service => this.createService(service));
    
    // Add default events
    const defaultEvents: InsertEvent[] = [
      {
        name: "Dasara Festival",
        description: "A grand 10-day celebration honoring the victory of Goddess Chamundeshwari over the demon Mahishasura with special rituals, cultural programs, and processions. Devotees make special donations during this period to receive divine blessings and prosperity.",
        date: "Oct 3 - Oct 12, 2024",
        time: "6:00 AM - 9:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1589722707707-87642d3726e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Maha Shivarathri",
        description: "A sacred 3-day celebration dedicated to Lord Shiva with continuous prayers, special abhishekams, and spiritual activities throughout the night. This is one of our most significant festivals where devotee donations support the grand arrangements and receive spiritual merit.",
        date: "Mar 7 - Mar 9, 2025",
        time: "6:00 PM - 6:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1626034926348-f1b90ea1ad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Naga Chamundeshwari Birthday Celebration",
        description: "Special celebration of our temple deity's birthday with grand processions, cultural events, and the auspicious Prathangira Homam ritual in the evening. This is a highly sacred occasion where devotee offerings and donations are especially meaningful.",
        date: "Aug 15, 2024",
        time: "Morning ceremonies from 6:00 AM, Prathangira Homam: 7:45 PM - 8:30 PM",
        imageUrl: "https://images.unsplash.com/photo-1621682372775-533449e550ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Prathyangira Homam Monthly Ritual",
        description: "Monthly special fire ritual dedicated to Goddess Prathyangira to remove negative energies and obstacles, providing protection and prosperity to devotees. Conducted every month on the full moon day.",
        date: "Monthly (Pournami)",
        time: "7:45 PM - 8:30 PM",
        imageUrl: "https://images.unsplash.com/photo-1626165269981-6a9d2b07e6ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      }
    ];
    
    defaultEvents.forEach(event => this.createEvent(event));
    
    // Add default gallery items
    const defaultGalleryItems: InsertGallery[] = [
      {
        title: "Temple Architecture",
        imageUrl: "https://images.unsplash.com/photo-1531061484401-e9bc0cddb228?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "architecture"
      },
      {
        title: "Festival Celebration",
        imageUrl: "https://images.unsplash.com/photo-1584722065669-95453e640ad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "festival"
      },
      {
        title: "Ritual Performance",
        imageUrl: "https://images.unsplash.com/photo-1562713143-2b41dc90d9fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "ritual"
      },
      {
        title: "Temple Courtyard",
        imageUrl: "https://images.unsplash.com/photo-1602302522970-c24fd1d0798c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "architecture"
      },
      {
        title: "Deity Decoration",
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "deity"
      },
      {
        title: "Temple Lamp",
        imageUrl: "https://images.unsplash.com/photo-1642982166809-50eed2787904?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "ritual"
      },
      {
        title: "Temple Entrance",
        imageUrl: "https://images.unsplash.com/photo-1620478052604-cd91e7e67a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "architecture"
      },
      {
        title: "Devotional Gathering",
        imageUrl: "https://images.unsplash.com/photo-1621507492022-88fcab37a467?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
        category: "event"
      }
    ];
    
    defaultGalleryItems.forEach(item => this.createGalleryItem(item));
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Service Methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }
  
  // Event Methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCurrentId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  
  // Gallery Methods
  async getAllGallery(): Promise<Gallery[]> {
    return Array.from(this.galleryItems.values());
  }
  
  async getGalleryItem(id: number): Promise<Gallery | undefined> {
    return this.galleryItems.get(id);
  }
  
  async createGalleryItem(insertGalleryItem: InsertGallery): Promise<Gallery> {
    const id = this.galleryCurrentId++;
    const galleryItem: Gallery = { ...insertGalleryItem, id };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
  
  // Inquiry Methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date(),
      isResolved: false
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  
  // Donation Methods
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.donationCurrentId++;
    const donation: Donation = {
      ...insertDonation,
      id,
      createdAt: new Date(),
      paymentStatus: 'pending',
      // Need to make sure required fields have values
      transactionId: null,
      message: insertDonation.message ?? null,
      purpose: insertDonation.purpose ?? null,
      eventId: insertDonation.eventId ?? null,
      serviceId: insertDonation.serviceId ?? null,
      gotram: insertDonation.gotram ?? null,
      nakshatra: insertDonation.nakshatra ?? null
    };
    this.donations.set(id, donation);
    return donation;
  }
  
  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }
  
  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }
  
  async updateDonationStatus(id: number, status: string, transactionId?: string): Promise<Donation> {
    const donation = this.donations.get(id);
    if (!donation) {
      throw new Error(`Donation with ID ${id} not found`);
    }
    
    const updatedDonation: Donation = {
      ...donation,
      paymentStatus: status,
      transactionId: transactionId ?? donation.transactionId
    };
    
    this.donations.set(id, updatedDonation);
    return updatedDonation;
  }
  
  // Contact Methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      isRead: false
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async markContactAsRead(id: number): Promise<Contact> {
    const contact = this.contacts.get(id);
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    
    const updatedContact: Contact = {
      ...contact,
      isRead: true
    };
    
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
}

// Import DatabaseStorage from separate file to avoid circular dependency
import { DatabaseStorage } from "./DatabaseStorage";

// Use database storage as default
export const storage = new DatabaseStorage();