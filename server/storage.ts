import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  events, type Event, type InsertEvent,
  gallery, type Gallery, type InsertGallery,
  inquiries, type Inquiry, type InsertInquiry
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private events: Map<number, Event>;
  private galleryItems: Map<number, Gallery>;
  private inquiries: Map<number, Inquiry>;
  
  private userCurrentId: number;
  private serviceCurrentId: number;
  private eventCurrentId: number;
  private galleryCurrentId: number;
  private inquiryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.events = new Map();
    this.galleryItems = new Map();
    this.inquiries = new Map();
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.eventCurrentId = 1;
    this.galleryCurrentId = 1;
    this.inquiryCurrentId = 1;
    
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
        name: "Marriage Ceremony",
        description: "Traditional Hindu wedding ceremony performed at the temple premises with all rituals.",
        price: "₹11,000 onwards",
        imageUrl: "https://images.unsplash.com/photo-1593100126453-19c0f1707bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
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
        name: "Dasara Fest",
        description: "A grand 10-day celebration honoring the victory of Goddess Chamundeshwari over the demon Mahishasura with special rituals, cultural programs, and processions.",
        date: "15 Oct 2023",
        time: "6:00 AM - 9:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1589722707707-87642d3726e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Maha Shivarathri",
        description: "A sacred night dedicated to Lord Shiva with continuous prayers, special abhishekams, and spiritual activities throughout the night.",
        date: "8 Mar 2024",
        time: "6:00 PM - 6:00 AM",
        imageUrl: "https://images.unsplash.com/photo-1626034926348-f1b90ea1ad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Karaga Event",
        description: "Traditional cultural and religious festival involving processions, rituals and community gatherings to honor the divine feminine energy.",
        date: "2 Apr 2024",
        time: "7:00 AM - 10:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1621682372775-533449e550ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Prathyangira Homam Rituals Pooja",
        description: "Special fire ritual dedicated to Goddess Prathyangira to remove negative energies and obstacles, providing protection and prosperity to devotees.",
        date: "20 May 2024",
        time: "9:30 AM - 1:30 PM",
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
      createdAt: new Date() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
