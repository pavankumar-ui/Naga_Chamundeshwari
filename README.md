# Naga Chamundeshwari Temple Website

A comprehensive website for Naga Chamundeshwari Temple (Devasthana) featuring information about temple services, special events, gallery, and online donation functionality with Stripe payment integration.

## Features

- **Temple Information**: About the temple, services, contact details
- **Special Events**: Information about Dasara, Mahashivarathri, and Naga Chamundeshwari Birthday celebrations
- **Online Donations**: Multiple donation paths with Stripe payment integration
- **E-hundi Offerings**: Digital devotional offerings
- **Gallery**: Photos of the temple and events
- **Contact Form**: For inquiries and feedback

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment**: Stripe API integration

## Installation

1. Clone this repository to your local machine
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
   ```
4. Create the database tables:
   ```
   npm run db:push
   ```
   Or import the schema and data from the SQL files:
   ```
   psql -d your_database_name -f schema.sql
   psql -d your_database_name -f data.sql
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

```
/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities and helpers
│   │   ├── pages/             # Page components
│   │   ├── App.tsx            # Main application component
│   │   └── main.tsx           # Entry point
├── server/                    # Backend application
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API routes
│   ├── storage.ts             # Data storage interface
│   └── db.ts                  # Database connection
└── shared/                    # Shared between client and server
    └── schema.ts              # Data models and validation schemas
```

## Stripe Integration

This project uses Stripe for payment processing. You will need to:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up the environment variables as mentioned in the Installation section

## Database Schema

The application uses PostgreSQL with the following main tables:
- users - For admin authentication
- events - Temple special events and festivals
- services - Temple services and poojas
- donations - Donation transactions
- gallery - Temple photos
- contacts - Contact form submissions
- inquiries - General inquiries

## Deployment

1. Build the application:
   ```
   npm run build
   ```
2. Deploy to your preferred hosting provider
3. Set up the required environment variables on your hosting platform
4. Ensure your database is properly configured and accessible

## License

This project is licensed for use by Naga Chamundeshwari Temple/Devasthana.