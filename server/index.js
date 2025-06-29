var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  categories: () => categories,
  consultations: () => consultations,
  insertCategorySchema: () => insertCategorySchema,
  insertConsultationSchema: () => insertConsultationSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertProductSchema: () => insertProductSchema,
  insertSiteSettingSchema: () => insertSiteSettingSchema,
  insertTelegramAdminSchema: () => insertTelegramAdminSchema,
  orders: () => orders,
  products: () => products,
  siteSettings: () => siteSettings,
  telegramAdmins: () => telegramAdmins
});
import { pgTable, text, varchar, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: text("sku").unique().notNull(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  composition: text("composition"),
  // Комплектация товара
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  brand: text("brand"),
  volume: text("volume"),
  imageUrl: text("image_url").notNull(),
  images: text("images").array(),
  specifications: text("specifications").notNull(),
  // JSON string
  inStock: boolean("in_stock").default(true),
  isPopular: boolean("is_popular").default(false),
  isNew: boolean("is_new").default(false),
  discount: integer("discount").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  // Дополнительные поля для фильтрации
  weight: text("weight"),
  // Вес
  dimensions: text("dimensions"),
  // Размеры
  material: text("material"),
  // Материал
  color: text("color"),
  // Цвет
  frameType: text("frame_type"),
  // Тип каркаса
  pumpType: text("pump_type"),
  // Тип насоса
  pumpCapacity: text("pump_capacity"),
  // Производительность насоса
  shape: text("shape"),
  // Форма (круглый, прямоугольный)
  installationType: text("installation_type"),
  // Тип установки (наземный, встраиваемый)
  countryOrigin: text("country_origin")
  // Страна производитель
});
var categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  productCount: integer("product_count").default(0),
  parentId: integer("parent_id").references(() => categories.id),
  level: integer("level").default(0),
  // 0 for main categories, 1 for subcategories
  sortOrder: integer("sort_order").default(0)
});
var orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address"),
  deliveryMethod: text("delivery_method").notNull(),
  paymentMethod: text("payment_method").notNull(),
  items: text("items").notNull(),
  // JSON string
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});
var consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true
});
var insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  status: true
});
var siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  category: varchar("category").notNull().default("general"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var telegramAdmins = pgTable("telegram_admins", {
  id: serial("id").primaryKey(),
  chatId: varchar("chat_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  username: varchar("username", { length: 50 }),
  isActive: boolean("is_active").default(true),
  addedAt: timestamp("added_at").defaultNow(),
  lastNotified: timestamp("last_notified")
});
var insertTelegramAdminSchema = createInsertSchema(telegramAdmins).omit({
  id: true,
  addedAt: true,
  lastNotified: true
});

// server/db.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, gte, lte, desc, ilike, or, sql } from "drizzle-orm";
var DatabaseStorage = class {
  async getProducts(filters) {
    let query = db.select().from(products);
    if (filters) {
      const conditions = [];
      if (filters.category) {
        const [category] = await db.select().from(categories).where(eq(categories.slug, filters.category));
        if (category) {
          const subcategories = await db.select().from(categories).where(eq(categories.parentId, category.id));
          if (subcategories.length > 0) {
            const subcategorySlugs = subcategories.map((sub) => sub.slug);
            const categoryConditions = subcategorySlugs.map((slug) => eq(products.category, slug));
            conditions.push(or(...categoryConditions));
          } else {
            conditions.push(eq(products.category, filters.category));
          }
        }
      }
      if (filters.minPrice !== void 0) {
        conditions.push(gte(products.price, filters.minPrice.toString()));
      }
      if (filters.maxPrice !== void 0) {
        conditions.push(lte(products.price, filters.maxPrice.toString()));
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        conditions.push(or(
          ilike(products.name, `%${searchTerm}%`),
          ilike(products.sku, `%${searchTerm}%`),
          ilike(products.brand, `%${searchTerm}%`),
          ilike(products.description, `%${searchTerm}%`),
          ilike(products.specifications, `%${searchTerm}%`)
        ));
      }
      if (filters.dimensions) {
        const dimensionsQuery = filters.dimensions.trim();
        if (dimensionsQuery) {
          conditions.push(or(
            ilike(products.name, `%${dimensionsQuery}%`),
            ilike(products.specifications, `%${dimensionsQuery}%`)
          ));
        }
      }
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    return await query.orderBy(desc(products.id));
  }
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  async getProductBySlug(slug) {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }
  async getPopularProducts() {
    return await db.select().from(products).where(eq(products.isPopular, true)).orderBy(desc(products.rating)).limit(8);
  }
  async getSearchSuggestions(query) {
    const searchTerm = query.toLowerCase().trim();
    const suggestions = [];
    if (searchTerm.length < 2) return suggestions;
    const exactSkuProducts = await db.select({
      id: products.id,
      name: products.name,
      sku: products.sku,
      slug: products.slug,
      price: products.price,
      imageUrl: products.imageUrl,
      brand: products.brand
    }).from(products).where(eq(products.sku, searchTerm.toUpperCase())).limit(5);
    exactSkuProducts.forEach((product) => {
      suggestions.push({
        type: "product",
        text: `${product.name} (\u0430\u0440\u0442. ${product.sku})`,
        value: product.slug,
        sku: product.sku,
        price: product.price,
        image: product.imageUrl || void 0
      });
    });
    if (exactSkuProducts.length === 0 && /^\d/.test(searchTerm)) {
      const skuStartProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products).where(ilike(products.sku, `${searchTerm}%`)).limit(5);
      skuStartProducts.forEach((product) => {
        suggestions.push({
          type: "product",
          text: `${product.name} (\u0430\u0440\u0442. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || void 0
        });
      });
    }
    const dimensionMatch = searchTerm.match(/(\d+)\s*[xх×]\s*(\d+)(?:\s*[xх×]\s*(\d+))?/);
    if (dimensionMatch && exactSkuProducts.length === 0) {
      const [, width, height, depth] = dimensionMatch;
      const dimensionConditions = [];
      dimensionConditions.push(
        ilike(products.name, `%${width} x ${height}%`),
        ilike(products.name, `%${width}x${height}%`),
        ilike(products.name, `%${width} \u0445 ${height}%`),
        ilike(products.name, `%${width}\u0445${height}%`)
      );
      if (depth) {
        dimensionConditions.push(
          ilike(products.name, `%${width} x ${height} x ${depth}%`),
          ilike(products.name, `%${width}x${height}x${depth}%`),
          ilike(products.name, `%${width} \u0445 ${height} \u0445 ${depth}%`),
          ilike(products.name, `%${width}\u0445${height}\u0445${depth}%`)
        );
      }
      const dimensionProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products).where(or(...dimensionConditions)).limit(3);
      dimensionProducts.forEach((product) => {
        suggestions.push({
          type: "product",
          text: `${product.name} (\u0430\u0440\u0442. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || void 0
        });
      });
    }
    if (suggestions.length < 8) {
      const nameProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products).where(and(
        ilike(products.name, `%${searchTerm}%`),
        ...suggestions.map((s) => sql`${products.sku} != ${s.sku}`)
      )).limit(8 - suggestions.length);
      nameProducts.forEach((product) => {
        suggestions.push({
          type: "product",
          text: `${product.name} (\u0430\u0440\u0442. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || void 0
        });
      });
    }
    if (suggestions.length < 8) {
      const brandProducts = await db.select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        brand: products.brand
      }).from(products).where(and(
        ilike(products.brand, `%${searchTerm}%`),
        ...suggestions.map((s) => sql`${products.sku} != ${s.sku}`)
      )).limit(8 - suggestions.length);
      brandProducts.forEach((product) => {
        suggestions.push({
          type: "product",
          text: `${product.name} (\u0430\u0440\u0442. ${product.sku})`,
          value: product.slug,
          sku: product.sku,
          price: product.price,
          image: product.imageUrl || void 0
        });
      });
    }
    return suggestions;
  }
  async createProduct(insertProduct) {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  async updateProduct(id, data) {
    const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return product;
  }
  async updateProductPriceBySku(sku, price, originalPrice) {
    const updateData = { price: price.toString() };
    if (originalPrice !== void 0) {
      updateData.originalPrice = originalPrice.toString();
    }
    const [product] = await db.update(products).set(updateData).where(eq(products.sku, sku)).returning();
    return product;
  }
  async deleteProduct(id) {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }
  async getCategories() {
    return await db.select().from(categories);
  }
  async getMainCategories() {
    return await db.select().from(categories).where(sql`parent_id IS NULL`);
  }
  async getCategoryStats(categorySlug) {
    const categoryMapping = {
      "karkasnye-basseyny": ["intex-karkasnye", "bestway-karkasnye"],
      "morozostojkie-basseyny": ["laguna", "magic-pool", "summer-fun", "gre"],
      "dzjakuzi-intex": ["dzjakuzi-intex"],
      "dzjakuzi-bestway": ["dzjakuzi-bestway"],
      "zapasnye-chashi": ["chashi-laguna", "chashi-intex", "chashi-bestway", "chashi-gre", "chashi-azuro", "chashi-atlantic-pool", "chashi-larimar"]
    };
    const subcategories = categoryMapping[categorySlug] || [categorySlug];
    const conditions = subcategories.map((cat) => eq(products.category, cat));
    const whereCondition = conditions.length === 1 ? conditions[0] : or(...conditions);
    const result = await db.select({
      count: sql`count(*)::int`,
      minPrice: sql`min(${products.price}::int)::int`
    }).from(products).where(whereCondition);
    const stats = result[0];
    if (!stats || stats.count === 0) {
      return { count: 0, minPrice: 0 };
    }
    return {
      count: stats.count,
      minPrice: stats.minPrice || 0
    };
  }
  async createCategory(insertCategory) {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
  async createOrder(insertOrder) {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }
  async getOrder(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  async createConsultation(insertConsultation) {
    const [consultation] = await db.insert(consultations).values(insertConsultation).returning();
    return consultation;
  }
  // Site Settings
  async getSiteSettings() {
    return await db.select().from(siteSettings).orderBy(siteSettings.category, siteSettings.key);
  }
  async getSiteSetting(key) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }
  async createSiteSetting(insertSetting) {
    const [setting] = await db.insert(siteSettings).values(insertSetting).returning();
    return setting;
  }
  async updateSiteSetting(id, data) {
    const [setting] = await db.update(siteSettings).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(siteSettings.id, id)).returning();
    return setting;
  }
  // Telegram Admin operations
  async getTelegramAdmins() {
    return await db.select().from(telegramAdmins).orderBy(desc(telegramAdmins.addedAt));
  }
  async createTelegramAdmin(admin) {
    const [newAdmin] = await db.insert(telegramAdmins).values(admin).returning();
    return newAdmin;
  }
  async deleteTelegramAdmin(id) {
    const result = await db.delete(telegramAdmins).where(eq(telegramAdmins.id, id));
    return result.rowCount > 0;
  }
  async toggleTelegramAdmin(id, isActive) {
    const [admin] = await db.update(telegramAdmins).set({ isActive }).where(eq(telegramAdmins.id, id)).returning();
    return admin;
  }
  async updateLastNotified(chatId) {
    await db.update(telegramAdmins).set({ lastNotified: /* @__PURE__ */ new Date() }).where(eq(telegramAdmins.chatId, chatId));
  }
};
var storage = new DatabaseStorage();

// server/telegram.ts
import TelegramBot from "node-telegram-bot-api";
var BOT_TOKEN = "7550930591:AAHZHqOnklv8EFkID5XaTkgzCrGwhY3Ex7M";
var bot = new TelegramBot(BOT_TOKEN, { polling: false });
async function getActiveAdminChatIds() {
  try {
    const admins = await storage.getTelegramAdmins();
    return admins.filter((admin) => admin.isActive).map((admin) => admin.chatId);
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0438\u0437 \u0411\u0414:", error);
    const ADMIN_CHAT_IDS = process.env.TELEGRAM_ADMIN_CHAT_IDS || "5696137293";
    return ADMIN_CHAT_IDS.split(",").map((id) => id.trim()).filter(Boolean);
  }
}
async function sendToAllAdmins(message, options) {
  const adminChatIds = await getActiveAdminChatIds();
  const results = [];
  for (const chatId of adminChatIds) {
    try {
      await bot.sendMessage(chatId, message, options);
      results.push({ chatId, success: true });
      console.log(`\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0447\u0430\u0442 ${chatId}`);
      await storage.updateLastNotified(chatId);
    } catch (error) {
      console.error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 \u0447\u0430\u0442 ${chatId}:`, error);
      results.push({ chatId, success: false, error });
    }
  }
  return results;
}
async function sendConsultationRequest(data) {
  try {
    const messageText = `
\u{1F514} <b>\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u0443\u044E \u0441\u0432\u044F\u0437\u044C</b>

\u{1F464} <b>\u0418\u043C\u044F:</b> ${data.name}
\u{1F4DE} <b>\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</b> ${data.phone}
\u{1F4AC} <b>\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:</b> ${data.message}

\u23F0 <b>\u0412\u0440\u0435\u043C\u044F:</b> ${(/* @__PURE__ */ new Date()).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })} \u041C\u0421\u041A
    `;
    await sendToAllAdmins(messageText, {
      parse_mode: "HTML"
    });
    return { success: true };
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0432 Telegram:", error);
    return { success: false, error };
  }
}
async function sendOrderNotification(orderData) {
  try {
    const itemsList = orderData.items.map(
      (item, index2) => `${index2 + 1}. <b>${item.name}</b>
   \u{1F4E6} \u0410\u0440\u0442\u0438\u043A\u0443\u043B: ${item.sku}
   \u{1F4CA} \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ${item.quantity} \u0448\u0442.
   \u{1F4B0} \u0426\u0435\u043D\u0430: ${item.price} \u20BD`
    ).join("\n\n");
    const messageText = `
\u{1F6D2} <b>\u041D\u041E\u0412\u042B\u0419 \u0417\u0410\u041A\u0410\u0417 #${orderData.orderId}</b>

\u{1F464} <b>\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C:</b>
\u2022 \u0418\u043C\u044F: ${orderData.customerName}
\u2022 \u0422\u0435\u043B\u0435\u0444\u043E\u043D: ${orderData.phone}
\u2022 Email: ${orderData.email}

\u{1F4E6} <b>\u0422\u043E\u0432\u0430\u0440\u044B:</b>
${itemsList}

\u{1F4B5} <b>\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430:</b> ${orderData.totalAmount} \u20BD

\u{1F69A} <b>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430:</b> ${orderData.deliveryMethod}
\u{1F4CD} <b>\u0410\u0434\u0440\u0435\u0441:</b> ${orderData.deliveryAddress}

\u{1F4B3} <b>\u041E\u043F\u043B\u0430\u0442\u0430:</b> ${orderData.paymentMethod}

\u23F0 <b>\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043A\u0430\u0437\u0430:</b> ${(/* @__PURE__ */ new Date()).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })} \u041C\u0421\u041A

\u{1F4DE} <b>\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435:</b> \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430
    `;
    await sendToAllAdmins(messageText, {
      parse_mode: "HTML"
    });
    return { success: true };
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 Telegram:", error);
    return { success: false, error };
  }
}
async function testTelegramBot() {
  try {
    const me = await bot.getMe();
    const adminChatIds = await getActiveAdminChatIds();
    console.log("Telegram \u0431\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D:", me.username);
    console.log(`\u041D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043E ${adminChatIds.length} \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0435\u0439 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439:`, adminChatIds.join(", "));
    return {
      success: true,
      botInfo: me,
      adminChatIds,
      adminCount: adminChatIds.length
    };
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A Telegram \u0431\u043E\u0442\u0443:", error);
    return { success: false, error };
  }
}
async function getAdminChatIds() {
  const adminChatIds = await getActiveAdminChatIds();
  return {
    chatIds: adminChatIds,
    count: adminChatIds.length,
    source: "database"
  };
}

// server/routes.ts
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
function generateSlug(name) {
  return name.toLowerCase().replace(/[а-яё]/g, (char) => {
    const translitMap = {
      "\u0430": "a",
      "\u0431": "b",
      "\u0432": "v",
      "\u0433": "g",
      "\u0434": "d",
      "\u0435": "e",
      "\u0451": "e",
      "\u0436": "zh",
      "\u0437": "z",
      "\u0438": "i",
      "\u0439": "y",
      "\u043A": "k",
      "\u043B": "l",
      "\u043C": "m",
      "\u043D": "n",
      "\u043E": "o",
      "\u043F": "p",
      "\u0440": "r",
      "\u0441": "s",
      "\u0442": "t",
      "\u0443": "u",
      "\u0444": "f",
      "\u0445": "h",
      "\u0446": "ts",
      "\u0447": "ch",
      "\u0448": "sh",
      "\u0449": "sch",
      "\u044A": "",
      "\u044B": "y",
      "\u044C": "",
      "\u044D": "e",
      "\u044E": "yu",
      "\u044F": "ya"
    };
    return translitMap[char] || char;
  }).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").substring(0, 100);
}
async function parseProductFromUrl(url) {
  try {
    console.log(`Parsing product from: ${url}`);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const nameElement = document.querySelector("h1") || document.querySelector(".product-title") || document.querySelector('[class*="title"]');
    const name = nameElement?.textContent?.trim() || "\u0422\u043E\u0432\u0430\u0440 \u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F";
    let price = "0";
    let originalPrice = null;
    console.log("Looking for prices...");
    const priceSelectors = [
      ".product-item-price-current",
      ".product-item-price",
      ".price-current",
      ".current-price",
      ".price",
      '[class*="price"]'
    ];
    for (const selector of priceSelectors) {
      const priceEl = document.querySelector(selector);
      if (priceEl) {
        const priceText = priceEl.textContent?.trim() || "";
        console.log(`Found price element (${selector}): ${priceText}`);
        const priceMatch = priceText.match(/(\d+[\s,.]?\d*)/);
        if (priceMatch) {
          price = priceMatch[1].replace(/[\s,.]/g, "");
          console.log(`Extracted current price: ${price}`);
          break;
        }
      }
    }
    const oldPriceSelectors = [
      ".product-item-price-old",
      ".price-old",
      ".old-price",
      ".price-before"
    ];
    for (const selector of oldPriceSelectors) {
      const oldPriceEl = document.querySelector(selector);
      if (oldPriceEl) {
        const oldPriceText = oldPriceEl.textContent?.trim() || "";
        console.log(`Found old price element (${selector}): ${oldPriceText}`);
        const oldPriceMatch = oldPriceText.match(/(\d+[\s,.]?\d*)/);
        if (oldPriceMatch) {
          originalPrice = oldPriceMatch[1].replace(/[\s,.]/g, "");
          console.log(`Extracted old price: ${originalPrice}`);
          break;
        }
      }
    }
    if (price === "0") {
      console.log("No price found in specific elements, searching in all text...");
      const allElements = Array.from(document.querySelectorAll("*"));
      const pricePatterns = [
        /(\d+)\s*000\s*руб/,
        // "26000 руб", "35000 руб"
        /(\d+)\s*руб/,
        // "26000руб", "35000руб"
        /(\d{4,6})/
        // any 4-6 digit number
      ];
      for (const el of allElements) {
        const text2 = el.textContent?.trim() || "";
        for (const pattern of pricePatterns) {
          const match = text2.match(pattern);
          if (match) {
            const foundPrice = match[1];
            if (foundPrice.length >= 4) {
              if (price === "0") {
                price = foundPrice;
                console.log(`Found price in text: ${price} from "${text2}"`);
              } else if (!originalPrice && foundPrice !== price) {
                originalPrice = foundPrice;
                console.log(`Found original price in text: ${originalPrice} from "${text2}"`);
              }
            }
          }
        }
        if (price !== "0" && originalPrice) break;
      }
    }
    console.log(`Final prices - current: ${price}, original: ${originalPrice}`);
    let sku = `PROD-${Date.now()}`;
    const artikulElement = document.querySelector(".product-item-detail-article span");
    if (artikulElement) {
      const artikulText = artikulElement.textContent?.trim();
      if (artikulText) {
        sku = artikulText;
        console.log(`Found SKU from HTML element: ${sku}`);
      }
    } else {
      const artikulMatch = url.match(/artikul?[_-]([^\/]+)/);
      if (artikulMatch) {
        sku = artikulMatch[1].replace(/-[^-]*$/, "");
        console.log(`Found SKU from URL: ${sku}`);
      } else {
        console.log(`No SKU found, using generated: ${sku}`);
      }
    }
    let description = "";
    let foundDescription = false;
    let composition = "";
    const removeClickableLinks = (html2) => {
      return html2.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");
    };
    const replacePackageImages = (html2) => {
      return html2.replace(
        /<img[^>]*src="[^"]*ac672c30d0d9dc49688f1ab82d73261d[^"]*"[^>]*>/gi,
        '<img width="90" alt="\u0420\u0430\u0437\u043C\u0435\u0440 \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0438" src="/package-icon.png" height="82" align="left" style="margin-right: 15px" title="\u0420\u0430\u0437\u043C\u0435\u0440 \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0438">'
      );
    };
    const compositionElement = document.querySelector('[data-value="free-tab"] .toggle_content');
    if (compositionElement) {
      const rawComposition = compositionElement.innerHTML?.trim() || "";
      composition = removeClickableLinks(rawComposition);
      composition = replacePackageImages(composition);
      console.log(`Found composition: ${composition.substring(0, 100)}...`);
    }
    const descriptionElement = document.querySelector('[data-value="description"] .toggle_content');
    if (descriptionElement) {
      const rawDescription = descriptionElement.innerHTML?.trim() || "";
      description = removeClickableLinks(rawDescription);
      description = replacePackageImages(description);
      foundDescription = true;
      console.log(`Found main description: ${description.substring(0, 100)}...`);
    }
    if (!foundDescription) {
      const fallbackSelectors = [
        ".toggle_content",
        ".product-item-detail-text",
        ".product-description",
        ".product-detail-description",
        '[class*="description"]'
      ];
      for (const selector of fallbackSelectors) {
        const elements = Array.from(document.querySelectorAll(selector));
        if (elements.length > 0) {
          description = elements.map((el) => el.innerHTML?.trim()).filter(Boolean).join("\n\n");
          if (description && description.length > 10) {
            foundDescription = true;
            console.log(`Found description from fallback selector ${selector}: ${description.substring(0, 100)}...`);
            break;
          }
        }
      }
    }
    if (!foundDescription || description.length < 50) {
      description = `<h2>${name}</h2>
<p>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u0430\u0440\u043A\u0430\u0441\u043D\u044B\u0439 \u0431\u0430\u0441\u0441\u0435\u0439\u043D \u043E\u0442 \u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F. \u041E\u0442\u043B\u0438\u0447\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0434\u0430\u0447\u0438 \u0438 \u0437\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u043E\u0433\u043E \u0434\u043E\u043C\u0430.</p>

<h3>\u0412 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0432\u0445\u043E\u0434\u0438\u0442:</h3>
<ul>
<li>\u041A\u0430\u0440\u043A\u0430\u0441\u043D\u044B\u0439 \u0431\u0430\u0441\u0441\u0435\u0439\u043D</li>
<li>\u041A\u0430\u0440\u0442\u0440\u0438\u0434\u0436\u043D\u044B\u0439 \u043D\u0430\u0441\u043E\u0441-\u0444\u0438\u043B\u044C\u0442\u0440</li>
<li>\u0424\u0438\u043B\u044C\u0442\u0440\u0443\u044E\u0449\u0438\u0439 \u043A\u0430\u0440\u0442\u0440\u0438\u0434\u0436</li>
<li>\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430</li>
<li>\u0422\u0435\u043D\u0442 \u0434\u043B\u044F \u0431\u0430\u0441\u0441\u0435\u0439\u043D\u0430</li>
<li>\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043F\u043E \u044D\u043A\u0441\u043F\u043B\u0443\u0430\u0442\u0430\u0446\u0438\u0438</li>
</ul>

<p>\u0411\u0430\u0441\u0441\u0435\u0439\u043D \u0441\u043D\u0438\u0437\u0443 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D \u0441\u043B\u0438\u0432\u043D\u044B\u043C \u043A\u043B\u0430\u043F\u0430\u043D\u043E\u043C \u0434\u043B\u044F \u0443\u0434\u043E\u0431\u043D\u043E\u0433\u043E \u0441\u043B\u0438\u0432\u0430 \u0432\u043E\u0434\u044B. \u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0430\u0440\u043A\u0430\u0441 \u0441\u043E\u0441\u0442\u043E\u0438\u0442 \u0438\u0437 \u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0443\u0433\u043E\u043B\u043A\u043E\u0432, \u0442\u0440\u0443\u0431\u043E\u043A-\u043F\u0435\u0440\u0435\u043C\u044B\u0447\u0435\u043A \u0438 \u0441\u0442\u043E\u0435\u043A. \u0412\u0441\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u043E\u043A\u0440\u0430\u0448\u0435\u043D\u044B \u0438 \u0443\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u044B \u043A \u0438\u0441\u0442\u0438\u0440\u0430\u043D\u0438\u044E.</p>`;
    }
    const specs = {};
    const mainPropsElements = Array.from(document.querySelectorAll(".product-item-detail-properties"));
    mainPropsElements.forEach((prop) => {
      const nameEl = prop.querySelector(".product-item-detail-properties-name");
      const valEl = prop.querySelector(".product-item-detail-properties-val");
      if (nameEl && valEl) {
        const key = nameEl.textContent?.trim() || "";
        const value = valEl.textContent?.trim() || "";
        if (key && value) {
          specs[key] = value;
        }
      }
    });
    const detailedPropsElements = Array.from(document.querySelectorAll(".product-item-detail-properties-group-property"));
    detailedPropsElements.forEach((prop) => {
      const nameEl = prop.querySelector(".product-item-detail-properties-group-property-name");
      const valEl = prop.querySelector(".product-item-detail-properties-group-property-val");
      if (nameEl && valEl) {
        const key = nameEl.textContent?.trim() || "";
        const value = valEl.textContent?.trim() || "";
        if (key && value) {
          specs[key] = value;
        }
      }
    });
    let brand = "Intex";
    if (name.toLowerCase().includes("bestway")) brand = "Bestway";
    else if (name.toLowerCase().includes("intex")) brand = "Intex";
    else if (specs["\u0411\u0440\u0435\u043D\u0434"]) brand = specs["\u0411\u0440\u0435\u043D\u0434"];
    let category = "frame-pools";
    if (name.toLowerCase().includes("\u043D\u0430\u0434\u0443\u0432\u043D\u043E\u0439")) category = "inflatable-pools";
    else if (name.toLowerCase().includes("\u0434\u0435\u0442\u0441\u043A\u0438\u0439")) category = "kids-pools";
    else if (url.includes("karkasnye")) category = "frame-pools";
    const dimensionMatch = name.match(/(\d+[,.]?\d*)\s*[xх×]\s*(\d+[,.]?\d*)\s*[xх×]?\s*(\d+[,.]?\d*)?/);
    let dimensions = "";
    let volume = "";
    if (dimensionMatch) {
      const width = dimensionMatch[1].replace(",", ".");
      const length = dimensionMatch[2].replace(",", ".");
      const height = dimensionMatch[3]?.replace(",", ".") || "";
      dimensions = height ? `${width} x ${length} x ${height}` : `${width} x ${length}`;
    }
    if (specs["\u041E\u0431\u044A\u0435\u043C"]) {
      volume = specs["\u041E\u0431\u044A\u0435\u043C"].replace(/[^\d]/g, "");
    } else {
      const volumeMatch = name.match(/(\d+[\s,.]?\d*)\s*л/);
      if (volumeMatch) {
        volume = volumeMatch[1].replace(/[\s,.]/g, "");
      }
    }
    let imageUrl = "/api/placeholder/400/400";
    const recommendedSelectors = [
      ".main_product img",
      ".main_product .img img",
      ".catalog-block-item img",
      ".product-item-detail-tabs-content img"
    ];
    for (const selector of recommendedSelectors) {
      const imgElement = document.querySelector(selector);
      if (imgElement) {
        const src = imgElement.getAttribute("src");
        console.log(`Checking selector ${selector}, found image: ${src}`);
        if (src && src.includes("upload") && !src.includes("thumb") && !src.includes("small") && !src.includes("watermark")) {
          if (src.includes("2f8e6a1cfe55806934aa37cf1f43bb79") || src.includes("no_photo") || src.includes("placeholder")) {
            console.log(`Skipping generic image: ${src}`);
            continue;
          }
          if (src.startsWith("/")) {
            imageUrl = "https://intex-bassein.ru" + src;
          } else if (src.startsWith("http")) {
            imageUrl = src;
          }
          console.log(`Found image from main_product section (without watermark): ${imageUrl}`);
          break;
        }
      }
    }
    if (imageUrl === "/api/placeholder/400/400") {
      const productImageSelectors = [
        ".bx-pict-big img",
        ".product-item-detail-picture img",
        ".product-item-picture img",
        ".product-pictures img",
        ".product-gallery img:first-child",
        ".main-image img",
        'img[itemprop="image"]',
        ".bx-pict img"
      ];
      for (const selector of productImageSelectors) {
        const imgElement = document.querySelector(selector);
        if (imgElement) {
          const src = imgElement.getAttribute("src");
          if (src && src.includes("upload") && !src.includes("thumb") && !src.includes("small")) {
            if (src.includes("2f8e6a1cfe55806934aa37cf1f43bb79") || src.includes("no_photo") || src.includes("placeholder")) {
              console.log(`Skipping generic image: ${src}`);
              continue;
            }
            if (src.startsWith("/")) {
              imageUrl = "https://intex-bassein.ru" + src;
            } else if (src.startsWith("http")) {
              imageUrl = src;
            }
            console.log(`Found main product image via selector ${selector}: ${imageUrl}`);
            break;
          }
        }
      }
      if (imageUrl === "/api/placeholder/400/400") {
        console.log(`No image found via selectors, scanning all images...`);
        const allImages = Array.from(document.querySelectorAll("img"));
        console.log(`Found ${allImages.length} total images on page`);
        for (let i = 0; i < allImages.length; i++) {
          const imgElement = allImages[i];
          const src = imgElement.getAttribute("src");
          console.log(`Image ${i}: ${src}`);
          if (src && src.includes("upload") && !src.includes("thumb") && !src.includes("small") && !src.includes("resize")) {
            if (src.includes("2f8e6a1cfe55806934aa37cf1f43bb79") || src.includes("no_photo") || src.includes("placeholder") || src.includes("default") || imgElement.getAttribute("alt")?.toLowerCase().includes("\u043B\u043E\u0433\u043E\u0442\u0438\u043F")) {
              console.log(`Skipping generic image: ${src}`);
              continue;
            }
            if (src.startsWith("/")) {
              imageUrl = "https://intex-bassein.ru" + src;
            } else if (src.startsWith("http")) {
              imageUrl = src;
            }
            console.log(`Found fallback product image: ${imageUrl}`);
            break;
          }
        }
      }
    }
    const shortDescription = [
      dimensions ? `\u0420\u0430\u0437\u043C\u0435\u0440: ${dimensions}` : "",
      volume ? `\u041E\u0431\u044A\u0435\u043C: ${volume} \u043B` : "",
      brand ? `\u0411\u0440\u0435\u043D\u0434: ${brand}` : ""
    ].filter(Boolean).join(" \u2022 ");
    return {
      name,
      slug: generateSlug(name),
      sku,
      description,
      composition,
      shortDescription,
      price,
      originalPrice,
      category,
      brand,
      volume,
      weight: specs["\u0412\u0435\u0441"] || "",
      dimensions,
      material: specs["\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"] || specs["\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0447\u0430\u0448\u0438"] || "\u041F\u0412\u0425",
      color: specs["\u0426\u0432\u0435\u0442"] || "\u0413\u043E\u043B\u0443\u0431\u043E\u0439",
      frameType: category === "frame-pools" ? "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0439" : null,
      pumpType: specs["\u0422\u0438\u043F \u043D\u0430\u0441\u043E\u0441\u0430"] || "\u041A\u0430\u0440\u0442\u0440\u0438\u0434\u0436\u043D\u044B\u0439",
      shape: specs["\u0424\u043E\u0440\u043C\u0430"] || (name.toLowerCase().includes("\u043A\u0440\u0443\u0433") ? "\u041A\u0440\u0443\u0433\u043B\u044B\u0439" : "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u044B\u0439"),
      installationType: "\u041D\u0430\u0437\u0435\u043C\u043D\u044B\u0439",
      countryOrigin: specs["\u0421\u0442\u0440\u0430\u043D\u0430-\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"] || "\u041A\u0438\u0442\u0430\u0439",
      imageUrl,
      images: [],
      specifications: JSON.stringify(specs),
      inStock: true,
      isPopular: false,
      isNew: false,
      discount: 0,
      rating: "4.5",
      reviewCount: Math.floor(Math.random() * 50) + 10
    };
  } catch (error) {
    console.error(`Error parsing ${url}:`, error);
    throw error;
  }
}
var ADMIN_LOGIN = "admin";
var ADMIN_PASSWORD = "aquapool2025";
var adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F" });
  }
  const credentials = Buffer.from(authHeader.slice(6), "base64").toString();
  const [login, password] = credentials.split(":");
  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C" });
  }
  next();
};
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const filters = {
        category: req.query.category,
        brand: req.query.brand,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : void 0,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : void 0,
        inStock: req.query.inStock ? req.query.inStock === "true" : void 0,
        search: req.query.search,
        poolType: req.query.poolType,
        volumeRange: req.query.volumeRange,
        shape: req.query.shape,
        material: req.query.material,
        dimensions: req.query.dimensions
      };
      const products2 = await storage.getProducts(filters);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/popular", async (req, res) => {
    try {
      const products2 = await storage.getPopularProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular products" });
    }
  });
  app2.get("/api/search/suggestions", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      const decodedQuery = decodeURIComponent(query);
      const suggestions = await storage.getSearchSuggestions(decodedQuery);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      res.status(500).json({ message: "Failed to fetch suggestions" });
    }
  });
  app2.get("/api/products/:identifier", async (req, res) => {
    try {
      const identifier = req.params.identifier;
      let product;
      if (/^\d+$/.test(identifier)) {
        const productId = parseInt(identifier);
        product = await storage.getProduct(productId);
      } else {
        product = await storage.getProductBySlug(identifier);
      }
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.get("/api/categories/main", async (req, res) => {
    try {
      const categories2 = await storage.getMainCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch main categories" });
    }
  });
  app2.get("/api/categories/:id/subcategories", async (req, res) => {
    try {
      const parentId = parseInt(req.params.id);
      const subcategories = await storage.getSubcategories(parentId);
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subcategories" });
    }
  });
  app2.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  app2.get("/api/categories/:slug/stats", async (req, res) => {
    try {
      const stats = await storage.getCategoryStats(req.params.slug);
      res.json(stats || { count: 0, minPrice: 0 });
    } catch (error) {
      console.error("Error fetching category stats:", error);
      res.status(500).json({ message: "Failed to fetch category stats" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      try {
        await sendOrderNotification({
          orderId: order.id,
          customerName: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail || "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D",
          deliveryAddress: order.deliveryAddress || "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D",
          items: JSON.parse(order.items),
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          deliveryMethod: order.deliveryMethod
        });
        console.log(`\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E \u0437\u0430\u043A\u0430\u0437\u0435 #${order.id} \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u0432 Telegram`);
      } catch (telegramError) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E \u0437\u0430\u043A\u0430\u0437\u0435 \u0432 Telegram:", telegramError);
      }
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data", error });
    }
  });
  app2.get("/api/orders/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  app2.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(consultationData);
      try {
        await sendConsultationRequest({
          name: consultation.name,
          phone: consultation.phone,
          message: consultation.message || "\u0417\u0430\u043F\u0440\u043E\u0441 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438"
        });
        console.log(`\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u043E\u0442 ${consultation.name} \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u0432 Telegram`);
      } catch (telegramError) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E \u0432 Telegram:", telegramError);
      }
      res.status(201).json(consultation);
    } catch (error) {
      res.status(400).json({ message: "Invalid consultation data", error });
    }
  });
  app2.get("/api/telegram/test", async (req, res) => {
    try {
      const result = await testTelegramBot();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F Telegram \u0431\u043E\u0442\u0430",
        error
      });
    }
  });
  app2.get("/api/telegram/admins", (req, res) => {
    try {
      const adminInfo = getAdminChatIds();
      res.json(adminInfo);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E\u0431 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430\u0445",
        error
      });
    }
  });
  app2.post("/api/admin/login", (req, res) => {
    const { login, password } = req.body;
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${login}:${password}`).toString("base64");
      res.json({
        success: true,
        message: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u0430",
        token: `Basic ${token}`
      });
    } else {
      res.status(401).json({
        success: false,
        message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
  });
  app2.post("/api/admin/products", adminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430", error });
    }
  });
  app2.put("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const product = await storage.updateProduct(id, updateData);
      if (!product) {
        return res.status(404).json({ message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430", error });
    }
  });
  app2.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
      }
      res.json({ message: "\u0422\u043E\u0432\u0430\u0440 \u0443\u0434\u0430\u043B\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E" });
    } catch (error) {
      res.status(500).json({ message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430", error });
    }
  });
  app2.post("/api/admin/products/update-price", adminAuth, async (req, res) => {
    try {
      const { sku, price, originalPrice } = req.body;
      if (!sku || !price) {
        return res.status(400).json({ message: "SKU \u0438 \u0446\u0435\u043D\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B" });
      }
      const updated = await storage.updateProductPriceBySku(sku, price, originalPrice);
      if (!updated) {
        return res.status(404).json({ message: "\u0422\u043E\u0432\u0430\u0440 \u0441 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C SKU \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
      }
      res.json({
        success: true,
        message: `\u0426\u0435\u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u0430 ${sku} \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430`,
        product: updated
      });
    } catch (error) {
      res.status(500).json({ message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0446\u0435\u043D\u044B", error });
    }
  });
  app2.post("/api/admin/parse-products", adminAuth, async (req, res) => {
    try {
      const { urls } = req.body;
      if (!Array.isArray(urls)) {
        return res.status(400).json({ message: "URLs must be an array" });
      }
      const results = [];
      const errors = [];
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
          console.log(`Parsing product ${i + 1}/${urls.length}: ${url}`);
          const product = await parseProductFromUrl(url);
          results.push(product);
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error parsing ${url}:`, error);
          errors.push({
            url,
            error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430: " + (error instanceof Error ? error.message : String(error))
          });
        }
      }
      res.json({
        success: true,
        products: results,
        errors
      });
    } catch (error) {
      console.error("Error parsing products:", error);
      res.status(500).json({ message: "Failed to parse products" });
    }
  });
  app2.post("/api/admin/import-products", adminAuth, async (req, res) => {
    try {
      const { products: products2 } = req.body;
      if (!Array.isArray(products2)) {
        return res.status(400).json({ message: "Products must be an array" });
      }
      const results = [];
      const errors = [];
      for (let i = 0; i < products2.length; i++) {
        try {
          const productData = products2[i];
          if (!productData.name) {
            throw new Error("Product name is required");
          }
          console.log(`Creating product: ${productData.name} with price: ${productData.price}, originalPrice: ${productData.originalPrice}`);
          const product = await storage.createProduct(productData);
          console.log(`Created product with id: ${product.id}, price: ${product.price}, originalPrice: ${product.originalPrice}`);
          results.push(product);
        } catch (error) {
          errors.push({
            index: i,
            product: products2[i]?.name || `Product ${i}`,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
      res.json({
        success: true,
        imported: results.length,
        errorCount: errors.length,
        results,
        errorsList: errors
      });
    } catch (error) {
      console.error("Error importing products:", error);
      res.status(500).json({ message: "Failed to import products" });
    }
  });
  app2.get("/api/admin/settings", adminAuth, async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching site settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });
  app2.post("/api/admin/settings", adminAuth, async (req, res) => {
    try {
      const setting = await storage.createSiteSetting(req.body);
      res.json(setting);
    } catch (error) {
      console.error("Error creating site setting:", error);
      res.status(500).json({ message: "Failed to create setting" });
    }
  });
  app2.put("/api/admin/settings/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const setting = await storage.updateSiteSetting(id, req.body);
      res.json(setting);
    } catch (error) {
      console.error("Error updating site setting:", error);
      res.status(500).json({ message: "Failed to update setting" });
    }
  });
  app2.delete("/api/admin/settings/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSiteSetting(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting site setting:", error);
      res.status(500).json({ message: "Failed to delete setting" });
    }
  });
  app2.get("/api/tracking-settings", async (req, res) => {
    try {
      const settings = await storage.getActiveTrackingSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching tracking settings:", error);
      res.status(500).json({ message: "Failed to fetch tracking settings" });
    }
  });
  app2.get("/api/admin/telegram-admins", adminAuth, async (req, res) => {
    try {
      const admins = await storage.getTelegramAdmins();
      res.json(admins);
    } catch (error) {
      console.error("Error fetching telegram admins:", error);
      res.status(500).json({ message: "Failed to fetch telegram admins" });
    }
  });
  app2.post("/api/admin/telegram-admins", adminAuth, async (req, res) => {
    try {
      const admin = await storage.createTelegramAdmin(req.body);
      res.json(admin);
    } catch (error) {
      console.error("Error creating telegram admin:", error);
      if (error.code === "23505") {
        res.status(400).json({ message: "\u042D\u0442\u043E\u0442 Telegram ID \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D" });
      } else {
        res.status(500).json({ message: "Failed to create telegram admin" });
      }
    }
  });
  app2.delete("/api/admin/telegram-admins/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTelegramAdmin(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Admin not found" });
      }
    } catch (error) {
      console.error("Error deleting telegram admin:", error);
      res.status(500).json({ message: "Failed to delete telegram admin" });
    }
  });
  app2.patch("/api/admin/telegram-admins/:id/toggle", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isActive } = req.body;
      const admin = await storage.toggleTelegramAdmin(id, isActive);
      res.json(admin);
    } catch (error) {
      console.error("Error toggling telegram admin:", error);
      res.status(500).json({ message: "Failed to toggle telegram admin" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({ limit: "50mb" }));
app.use(express2.urlencoded({ extended: false, limit: "50mb" }));
app.use("/attached_assets", express2.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
    testTelegramBot().then((result) => {
      if (result.success) {
        console.log("\u2705 Telegram \u0431\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D");
      } else {
        console.log("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A Telegram \u0431\u043E\u0442\u0443:", result.error);
      }
    }).catch((error) => {
      console.log("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F Telegram \u0431\u043E\u0442\u0430:", error);
    });
  });
})();
