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

## User Preferences

Preferred communication style: Simple, everyday language.