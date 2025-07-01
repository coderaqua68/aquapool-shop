import { pgTable, text, varchar, serial, integer, boolean, decimal, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: text("sku").unique().notNull(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  composition: text("composition"), // Комплектация товара
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  brand: text("brand"),
  volume: text("volume"),
  imageUrl: text("image_url").notNull(),
  images: text("images").array(),
  specifications: text("specifications").notNull(), // JSON string
  inStock: boolean("in_stock").default(true),
  isPopular: boolean("is_popular").default(false),
  isNew: boolean("is_new").default(false),
  discount: integer("discount").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  // Дополнительные поля для фильтрации
  weight: text("weight"), // Вес
  dimensions: text("dimensions"), // Размеры
  material: text("material"), // Материал
  color: text("color"), // Цвет
  frameType: text("frame_type"), // Тип каркаса
  pumpType: text("pump_type"), // Тип насоса
  pumpCapacity: text("pump_capacity"), // Производительность насоса
  shape: text("shape"), // Форма (круглый, прямоугольный)
  installationType: text("installation_type"), // Тип установки (наземный, встраиваемый)
  countryOrigin: text("country_origin"), // Страна производитель
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  productCount: integer("product_count").default(0),
  parentId: integer("parent_id").references(() => categories.id),
  level: integer("level").default(0), // 0 for main categories, 1 for subcategories
  sortOrder: integer("sort_order").default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address"),
  deliveryMethod: text("delivery_method").notNull(),
  paymentMethod: text("payment_method").notNull(),
  items: text("items").notNull(), // JSON string
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Site settings table for tracking pixels and other configurations
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  category: varchar("category").notNull().default("general"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;

// Telegram administrators table
export const telegramAdmins = pgTable("telegram_admins", {
  id: serial("id").primaryKey(),
  chatId: varchar("chat_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  username: varchar("username", { length: 50 }),
  isActive: boolean("is_active").default(true),
  addedAt: timestamp("added_at").defaultNow(),
  lastNotified: timestamp("last_notified"),
});

export const insertTelegramAdminSchema = createInsertSchema(telegramAdmins).omit({
  id: true,
  addedAt: true,
  lastNotified: true,
});

export type TelegramAdmin = typeof telegramAdmins.$inferSelect;
export type InsertTelegramAdmin = z.infer<typeof insertTelegramAdminSchema>;

// Product filters type for frontend
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  dimensions?: string;
  sortBy?: string;
}
