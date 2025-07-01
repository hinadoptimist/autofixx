# AutoFixx - Automobile Spare Parts E-commerce Platform

## Overview

AutoFixx is a modern e-commerce platform specializing in automobile spare parts for both cars and motorcycles. The application is built as a full-stack solution using React for the frontend, Express.js for the backend, and PostgreSQL as the database. The platform features a comprehensive product catalog, shopping cart functionality, user authentication, and a complete checkout process.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theming and dark mode support
- **State Management**: React Context for cart and theme management
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: tsx for TypeScript execution in development

### UI Design System
- **Component Library**: Custom components built on Radix UI primitives
- **Theme**: New York style variant from shadcn/ui
- **Color Scheme**: Blue primary (#3b82f6) with yellow accent (#f59e0b)
- **Typography**: Clean, modern typography with consistent spacing
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Key Components

### Database Schema
The application uses a well-structured PostgreSQL schema with the following main entities:

- **Users**: Customer accounts with personal and shipping information
- **Categories**: Hierarchical product categorization supporting both cars and motorcycles
- **Brands**: Manufacturer information with logos and descriptions
- **Products**: Comprehensive product catalog with specifications, pricing, and inventory

### Frontend Features
- **Product Catalog**: Filterable and searchable product grid with pagination
- **Shopping Cart**: Persistent cart with quantity management and sidebar display
- **User Authentication**: Login and registration with form validation
- **Product Details**: Detailed product pages with specifications and compatibility
- **Checkout Process**: Multi-step checkout with shipping and payment forms
- **Wishlist**: Product saving functionality for future purchases
- **Theme Support**: Light/dark mode toggle with system preference detection

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **API Routes**: RESTful endpoints for product, user, and order management
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Development Tools**: Hot reload and development-optimized middleware

## Data Flow

### Client-Server Communication
1. Frontend makes HTTP requests to `/api/*` endpoints
2. Express middleware handles CORS, parsing, and logging
3. Route handlers interact with storage layer for data operations
4. Responses are formatted as JSON with appropriate status codes

### State Management
1. **Global State**: Cart and theme context providers manage application-wide state
2. **Server State**: TanStack Query handles API data with caching and synchronization
3. **Local State**: Component-level state for forms and UI interactions
4. **Persistence**: Cart data persists in localStorage, theme preferences saved locally

### Product Data Flow
1. Products are stored in PostgreSQL with full specifications and metadata
2. Frontend fetches products through API with filtering and pagination
3. Search and filter operations are handled server-side for performance
4. Product images are served through external CDN (Unsplash for development)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for Neon Database
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management for React
- **wouter**: Lightweight React router (2KB alternative to React Router)

### UI Dependencies
- **@radix-ui/***: Comprehensive set of UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework for rapid styling
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library with consistent design

### Development Tools
- **vite**: Fast build tool with hot module replacement
- **tsx**: TypeScript execution engine for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

## Deployment Strategy

### Build Process
1. **Client Build**: Vite compiles React application to static assets
2. **Server Build**: esbuild bundles Express server with external dependencies
3. **Database Migration**: Drizzle Kit handles schema migrations
4. **Environment**: Production builds optimize for performance and bundle size

### Environment Configuration
- **Development**: Local development with hot reload and debugging tools
- **Production**: Optimized builds with minification and tree shaking
- **Database**: Environment-specific database URLs for different deployment stages

### Scalability Considerations
- **Database**: PostgreSQL supports horizontal scaling and read replicas
- **Frontend**: Static assets can be served from CDN
- **Backend**: Express server can be deployed to multiple instances behind load balancer
- **Storage**: File uploads can be moved to cloud storage providers

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.