# AquaPool E-commerce Platform

## Overview

AquaPool is a modern e-commerce platform for pool equipment and accessories, specifically focusing on frame pools, inflatable pools, and related equipment. The application is built with a React frontend and Express backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Router**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **UI Framework**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **API Design**: RESTful endpoints with TypeScript validation
- **File Structure**: Monorepo with shared schema types

### Build System
- **Development**: Vite dev server with HMR
- **Production**: ESBuild for backend bundling, Vite for frontend
- **TypeScript**: Strict mode with path aliases
- **Deployment**: Multiple deployment strategies (Vercel, standalone)

## Key Components

### Database Schema
The application uses a relational database with the following main entities:
- **Products**: Complete product catalog with specifications, pricing, and inventory
- **Categories**: Hierarchical category structure with parent-child relationships
- **Orders**: Customer order processing and tracking
- **Consultations**: Customer inquiry and callback system
- **Site Settings**: Configurable application settings
- **Telegram Admins**: Integration with Telegram bot for notifications

### Product Management
- Comprehensive product catalog with detailed specifications
- Multi-category classification (frame pools, inflatable pools, accessories)
- Brand management (Intex, Bestway, etc.)
- Price management with discount support
- Image handling with multiple product images
- Inventory tracking and availability status

### E-commerce Features
- Shopping cart functionality with persistent state
- Order processing with customer information collection
- Consultation request system for customer support
- Search and filtering capabilities
- Product recommendations and popular items

### External Integrations
- **Telegram Bot**: Automated notifications for orders and consultations
- **Yandex Metrika**: Analytics and tracking integration
- **Image Storage**: Support for external image hosting

## Data Flow

### Client-Server Communication
1. Frontend makes API requests to `/api` endpoints
2. Backend validates requests using Zod schemas
3. Database operations performed through Drizzle ORM
4. Responses formatted and returned to client
5. React Query handles caching and state updates

### Order Processing Flow
1. Customer adds items to cart (client-side state)
2. Customer provides contact information
3. Order submitted to `/api/orders` endpoint
4. Order stored in database with generated ID
5. Telegram notification sent to administrators
6. Order confirmation displayed to customer

### Product Data Management
1. Products stored with comprehensive specifications
2. Category relationships maintained for navigation
3. Search functionality across product names and descriptions
4. Filtering by brand, category, price range, and other attributes

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **Database**: Drizzle ORM, Neon serverless PostgreSQL
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority
- **Validation**: Zod for schema validation
- **Build Tools**: Vite, ESBuild, TypeScript

### Development Dependencies
- **Replit Integration**: Vite plugins for Replit environment
- **Linting**: ESLint configuration
- **Type Checking**: TypeScript with strict mode

### Optional Dependencies
- **Telegram Integration**: node-telegram-bot-api
- **Web Scraping**: JSDOM for product parsing (development)

## Deployment Strategy

### Development Environment
- Vite development server on port 5173
- Express API server with hot reload
- PostgreSQL database connection via environment variables
- Replit-specific configurations for cloud development

### Production Build
- Frontend built to `dist` directory using Vite
- Backend bundled to `server/index.js` using ESBuild
- Static file serving from Express server
- Environment-specific configurations

### Deployment Targets
- **Vercel**: Configured with `vercel.json` for serverless deployment
- **Standalone**: Production-ready server with PM2 ecosystem
- **Docker**: Containerization support for various hosting platforms

### Performance Optimizations
- Code splitting with manual chunks for vendor libraries
- Terser minification for production builds
- Static asset optimization and caching
- Database query optimization with proper indexing

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 01, 2025. Initial setup