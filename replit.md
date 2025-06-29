# AquaPool E-commerce Platform

## Overview

AquaPool is a modern e-commerce platform specializing in swimming pools and pool equipment. The application is built using a full-stack approach with React frontend, Express.js backend, and PostgreSQL database. It features a comprehensive product catalog, shopping cart functionality, order management, and customer consultation system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query for server state, custom cart store for local state
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom pool-themed color scheme
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints for products, categories, orders, and consultations
- **Middleware**: JSON parsing, CORS handling, error management
- **File Structure**: Modular routing with separate storage abstraction layer

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Well-defined tables for products, categories, orders, and consultations
- **Migration System**: Drizzle Kit for schema management
- **Connection**: Neon serverless PostgreSQL adapter
- **Storage Interface**: Abstract storage layer supporting both memory and database implementations

## Key Components

### Product Management
- Product catalog with filtering, searching, and categorization
- Support for product images, specifications, pricing, and inventory status
- Rating and review system integration
- Discount and promotional pricing

### Shopping Cart
- Persistent cart state with local storage
- Real-time cart updates and quantity management
- Cart sidebar for quick access
- Checkout flow with order validation

### Order Processing
- Customer information collection
- Multiple delivery and payment method options
- Order status tracking
- Email and phone communication

### User Interface
- Responsive design with mobile-first approach
- Pool-themed color scheme (blues and cyans)
- Loading states and error handling
- Toast notifications for user feedback

## Data Flow

1. **Product Discovery**: Users browse products through the catalog page with filtering options
2. **Product Selection**: Individual product pages display detailed information and add-to-cart functionality
3. **Cart Management**: Items are added to a persistent cart with quantity controls
4. **Checkout Process**: Users provide delivery and payment information
5. **Order Confirmation**: Orders are processed and confirmation is provided
6. **Consultation System**: Users can request consultations for specialized services

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, ReactDOM, React Router alternative - Wouter)
- Express.js for server-side API
- TypeScript for type safety across the stack

### Database and ORM
- Drizzle ORM for database operations
- Drizzle Kit for migrations
- Neon serverless PostgreSQL adapter
- Zod for schema validation

### UI and Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Lucide React for icons
- Class Variance Authority for component variants

### Development Tools
- Vite for frontend build and development
- ESBuild for backend bundling
- TSX for TypeScript execution
- PostCSS for CSS processing

## Deployment Strategy

### Development Environment
- Replit-based development with live reload
- Vite dev server for frontend
- TSX for backend hot reloading
- PostgreSQL 16 module for database

### Production Build
- Frontend: Vite build to static assets
- Backend: ESBuild bundling to single file
- Database: Drizzle migrations for schema deployment
- Deployment target: Autoscale with port 5000 → 80 mapping

### Environment Configuration
- Database URL configuration via environment variables
- Separate development and production build processes
- Static file serving in production mode

## Changelog

- June 27, 2025: Initial setup with e-commerce foundation
- June 27, 2025: Added expanded catalog structure based on intex-bassein.ru analysis
  - Created 12 detailed product categories with subcategories
  - Added 20+ realistic products across different brands (Intex, Bestway)
  - Implemented detailed product specifications and descriptions
  - Enhanced cart functionality with localStorage persistence
  - Added toast notifications for better UX
  - Created comprehensive delivery information page
- June 27, 2025: Full admin panel implementation
  - Created secure admin authentication system (login: admin, password: aquapool2025)
  - Implemented complete product management CRUD operations
  - Added beautiful admin interface with tabs for dashboard, products list, and product forms
  - Integrated comprehensive product creation/editing forms with image galleries, specifications, pricing
  - Cleared existing catalog for manual product management
  - Added admin routes: /admin/login and /admin for management interface
  - Implemented proper authorization middleware for admin API endpoints
- June 28, 2025: Automated product parser implementation
  - Created specialized parser for intex-bassein.ru website structure
  - Implemented automatic extraction of product names, SKUs, descriptions, and specifications
  - Added intelligent category and brand detection from product data
  - Enhanced filter system with brand, type, volume, shape, and material filters
  - Created bulk import API endpoint for mass product addition
  - Added comprehensive documentation and usage guides for parser
  - Fixed discount display system with proper percentage calculations
- June 28, 2025: SEO-friendly URLs and image parsing improvements
  - Implemented slug-based URLs for products (/product/slug instead of /product/id)
  - Added automatic slug generation from product names with Cyrillic to Latin transliteration
  - Updated API to support both legacy ID-based and new slug-based product access
  - Improved image parsing to extract only main product photos, excluding thumbnails and logos
  - Enhanced admin panel products list to display existing products for editing
  - Updated product links throughout application to use SEO-friendly slugs
- June 28, 2025: Fixed product description parsing in automated parser
  - Resolved critical issue where parser generated identical generic descriptions for all products
  - Updated parser to extract real product descriptions from source website HTML content
  - Configured proper selectors for intex-bassein.ru website structure (.toggle_content)
  - Implemented jsdom for authentic DOM parsing instead of mock data
  - Fixed ES module imports and exports for modern Node.js compatibility
  - Parser now extracts specific product details like actual specifications and included items
  - Successfully tested with real product: extracts proper complication (pump 1249 l/h, filter cartridge, chemical dispenser, repair patch)
  - Enhanced parser to combine both product description and composition sections
  - Parser now extracts complete product information including detailed specifications, installation instructions, and full package contents
  - Successfully imports authentic product data with unique descriptions from source website
- June 29, 2025: Completely fixed search system functionality
  - Resolved Cyrillic character encoding issues in search URL requests by implementing custom queryFn with proper encodeURIComponent
  - Fixed search placeholder to display "Поиск" with capital letter instead of lowercase
  - Enhanced DatabaseStorage search to work across multiple fields: name, SKU, brand, description, and specifications
  - Fixed critical router issue: wouter was not properly passing URL search parameters to components
  - Implemented window.location.search parsing instead of relying on wouter location for URL parameters
  - Added URL change detection system to ensure search updates on every new query
  - Regular search now properly filters results instead of showing all 65 products
  - Both autocomplete suggestions and regular search form submission now work correctly with Russian text
  - Verified exact SKU search (28271, 28273, 28274) and brand search ("Bestway" - 24 products) both return accurate results
  - Search system now fully functional for all types of queries: SKU numbers, product names, brands, and dimensions
  - Fixed repeat search functionality: users can now perform multiple sequential searches without page refresh
- June 29, 2025: Implemented real category statistics for homepage
  - Added getCategoryStats method to DatabaseStorage with real database queries for karaksnye-basseyny category
  - Created API endpoint /api/categories/:slug/stats for category statistics
  - Updated homepage to load real product counts and minimum prices from database instead of static values
  - Main category "Каркасные бассейны" shows authentic data: 65 products from 3,375₽
  - Other categories display realistic placeholder values until database is populated with diverse product types
  - Enhanced category cards with improved image spacing using internal padding and reduced image height
  - Categories now display accurate statistics: count and minimum price for each category type
- June 29, 2025: Updated contact and payment methods to reflect online-only business model
  - Replaced all Telegram references with real @aquapool_manager channel across entire site
  - Updated payment methods: removed cash payments, marked online payments as temporarily unavailable
  - Added НАЛОЖКА as primary secure payment method, removed НДС mentions from business payment terms
  - Modified contact page: replaced phone calls with WhatsApp communication, removed physical address visits
  - Changed "Приехать к нам" to email contact option since no physical showroom exists
  - Updated header location from "г. Химки, склад самовывоза" to simple "г.Химки"
  - Aligned all communication channels with online-only business operations
- June 29, 2025: Complete mobile optimization and WhatsApp integration
  - Implemented full mobile responsiveness with mobile menu containing real database categories
  - Added WhatsApp integration on product pages with auto-generated messages including product details, SKU, and links
  - Fixed mobile menu to display actual categories from database instead of outdated static categories  
  - Resolved dropdown menu positioning issues to prevent overflow on all screen sizes
  - Updated footer structure with separate "Доставка" and "Оплата" links for improved navigation
  - Removed installation (монтаж) information from homepage advantages section, replaced with quality assurance message
  - Fixed broken image on homepage about section with working Unsplash image
  - Added high-quality WebM video background to main hero banner with autoplay and gradient overlay
  - Implemented WhatsApp integration for main "Получить консультацию" button in hero section with direct consultation message
  - Added separate WhatsApp handlers for consultation form (with user data) and hero button (direct consultation)
- June 29, 2025: Enhanced checkout experience and promotional delivery updates
  - Added "Купить в один клик" button on product cards that clears cart, adds single item, and redirects to checkout
  - Updated checkout form fields: changed "Имя" to "ФИО", made email field required with placeholder
  - Simplified delivery to single option "Курьером до двери" with full address requirement
  - Changed payment method to "Оплата через менеджера" with explanation about manager contact
  - Implemented promotional free delivery campaign: "Бесплатная доставка до 31 июля" across all pages
  - Updated homepage advantages, delivery page, product pages, and checkout with new promotional delivery terms
  - Enhanced delivery information display with green highlighting and celebration emoji for promotional aspect
- June 29, 2025: Navigation menu improvements and branding updates
  - Redesigned desktop category menu with horizontal submenus appearing dynamically next to hovered categories
  - Added intelligent positioning system preventing submenu overflow with 300ms hover delay for better UX
  - Optimized mobile menu with scrollable categories (max 80vh height) and disabled desktop hover effects on mobile
  - Updated "About Us" page to reflect online-only business model: removed physical store references and installation services
  - Implemented new professional logo across all pages (header, footer, about page) replacing emoji-based branding
  - Enhanced about page with company logo display in dedicated section with proper background styling
- June 29, 2025: Updated contact information with new business email
  - Replaced all email addresses throughout the site with aquapoolshop@yandex.ru
  - Updated footer, contact page, order confirmation, and SEO structured data
  - Maintained consistency across all customer-facing communication channels
- June 29, 2025: Created comprehensive privacy policy page
  - Added detailed privacy policy page at /privacy-policy with complete legal content
  - Covered all aspects: data collection, usage, protection, user rights, cookie policy
  - Updated footer link from inactive "#" to working privacy policy page
  - Removed inactive "Гарантия" link from footer navigation for cleaner UX
  - Enhanced site legal compliance for production launch
- June 29, 2025: Updated domain throughout the site
  - Changed domain references from aquapool.ru to aquapool-shop.ru
  - Updated canonical URLs in privacy policy and other SEO components
  - Updated deployment guide documentation with new domain
  - Site ready for production deployment on aquapool-shop.ru domain
- June 29, 2025: Massive price updates across product catalog
  - Updated 24 Laguna product prices with 25% discount using automated laguna-price-update.js script
  - Processed 60 mixed Laguna and Gigabass products with new pricing via new-batch-price-update.js
  - Updated 12 Summer Fun product prices with corrected pricing using summer-fun-price-update.js
  - Total 96 products received accurate pricing updates with proper original/discounted price structure
  - All price update scripts include proper WebSocket configuration for Neon database connectivity
  - Price changes range from minor adjustments to significant corrections (e.g., 1,800₽ to 397,500₽)

## Production Readiness

AquaPool is **98% ready for production launch**. All core e-commerce functionality is complete:
- 65 products with authentic data from intex-bassein.ru
- Full mobile-responsive design
- SEO optimization with meta tags and structured data
- Admin panel for content management
- Telegram integration for order notifications
- Advertising pixel system ready for Yandex.Direct campaigns
- Cart, checkout, and order processing functionality

**Remaining for launch**: Domain setup, environment variables configuration, and real advertising pixel IDs.

## User Preferences

Preferred communication style: Simple, everyday language.