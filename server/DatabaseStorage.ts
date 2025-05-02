import { eq } from "drizzle-orm";
import { db, logQueryError } from "./db";
import {
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  events, type Event, type InsertEvent,
  gallery, type Gallery, type InsertGallery,
  inquiries, type Inquiry, type InsertInquiry,
  donations, type Donation, type InsertDonation,
  contacts, type Contact, type InsertContact
} from "@shared/schema";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      logQueryError(error, "getUser");
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      logQueryError(error, "getUserByUsername");
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      logQueryError(error, "createUser");
      throw error;
    }
  }

  // Service Methods
  async getAllServices(): Promise<Service[]> {
    try {
      return await db.select().from(services);
    } catch (error) {
      logQueryError(error, "getAllServices");
      throw error;
    }
  }

  async getService(id: number): Promise<Service | undefined> {
    try {
      const [service] = await db.select().from(services).where(eq(services.id, id));
      return service;
    } catch (error) {
      logQueryError(error, "getService");
      throw error;
    }
  }

  async createService(insertService: InsertService): Promise<Service> {
    try {
      const [service] = await db.insert(services).values(insertService).returning();
      return service;
    } catch (error) {
      logQueryError(error, "createService");
      throw error;
    }
  }

  // Event Methods
  async getAllEvents(): Promise<Event[]> {
    try {
      return await db.select().from(events);
    } catch (error) {
      logQueryError(error, "getAllEvents");
      throw error;
    }
  }

  async getEvent(id: number): Promise<Event | undefined> {
    try {
      const [event] = await db.select().from(events).where(eq(events.id, id));
      return event;
    } catch (error) {
      logQueryError(error, "getEvent");
      throw error;
    }
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    try {
      const [event] = await db.insert(events).values(insertEvent).returning();
      return event;
    } catch (error) {
      logQueryError(error, "createEvent");
      throw error;
    }
  }

  // Gallery Methods
  async getAllGallery(): Promise<Gallery[]> {
    try {
      return await db.select().from(gallery);
    } catch (error) {
      logQueryError(error, "getAllGallery");
      throw error;
    }
  }

  async getGalleryItem(id: number): Promise<Gallery | undefined> {
    try {
      const [item] = await db.select().from(gallery).where(eq(gallery.id, id));
      return item;
    } catch (error) {
      logQueryError(error, "getGalleryItem");
      throw error;
    }
  }

  async createGalleryItem(insertGalleryItem: InsertGallery): Promise<Gallery> {
    try {
      const [galleryItem] = await db.insert(gallery).values(insertGalleryItem).returning();
      return galleryItem;
    } catch (error) {
      logQueryError(error, "createGalleryItem");
      throw error;
    }
  }

  // Inquiry Methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const [inquiry] = await db
        .insert(inquiries)
        .values({
          ...insertInquiry,
          isResolved: false
        })
        .returning();
      return inquiry;
    } catch (error) {
      logQueryError(error, "createInquiry");
      throw error;
    }
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    try {
      return await db.select().from(inquiries);
    } catch (error) {
      logQueryError(error, "getAllInquiries");
      throw error;
    }
  }

  // Donation Methods
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    try {
      const [donation] = await db
        .insert(donations)
        .values({
          ...insertDonation,
          paymentStatus: 'pending',
          message: insertDonation.message || null,
          purpose: insertDonation.purpose || null,
          eventId: insertDonation.eventId || null,
          serviceId: insertDonation.serviceId || null
        })
        .returning();
      return donation;
    } catch (error) {
      logQueryError(error, "createDonation");
      throw error;
    }
  }

  async getAllDonations(): Promise<Donation[]> {
    try {
      return await db.select().from(donations);
    } catch (error) {
      logQueryError(error, "getAllDonations");
      throw error;
    }
  }

  async getDonation(id: number): Promise<Donation | undefined> {
    try {
      const [donation] = await db.select().from(donations).where(eq(donations.id, id));
      return donation;
    } catch (error) {
      logQueryError(error, "getDonation");
      throw error;
    }
  }

  async updateDonationStatus(id: number, status: string, transactionId?: string): Promise<Donation> {
    try {
      const updateData: any = { paymentStatus: status };
      if (transactionId) {
        updateData.transactionId = transactionId;
      }

      const [updatedDonation] = await db
        .update(donations)
        .set(updateData)
        .where(eq(donations.id, id))
        .returning();

      return updatedDonation;
    } catch (error) {
      logQueryError(error, "updateDonationStatus");
      throw error;
    }
  }

  // Contact Methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const [contact] = await db
        .insert(contacts)
        .values({
          ...insertContact,
          isRead: false
        })
        .returning();
      return contact;
    } catch (error) {
      logQueryError(error, "createContact");
      throw error;
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    try {
      return await db.select().from(contacts);
    } catch (error) {
      logQueryError(error, "getAllContacts");
      throw error;
    }
  }

  async getContact(id: number): Promise<Contact | undefined> {
    try {
      const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
      return contact;
    } catch (error) {
      logQueryError(error, "getContact");
      throw error;
    }
  }

  async markContactAsRead(id: number): Promise<Contact> {
    try {
      const [updatedContact] = await db
        .update(contacts)
        .set({ isRead: true })
        .where(eq(contacts.id, id))
        .returning();

      return updatedContact;
    } catch (error) {
      logQueryError(error, "markContactAsRead");
      throw error;
    }
  }
}