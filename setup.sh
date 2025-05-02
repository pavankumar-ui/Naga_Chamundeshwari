#!/bin/bash

# Setup script for Naga Chamundeshwari Temple Website

echo "Setting up the Naga Chamundeshwari Temple Website..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file template
echo "Creating .env file template..."
cat > .env.example << EOL
# Database settings
DATABASE_URL=postgresql://username:password@hostname:port/database

# Stripe API keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
EOL

# Copy .env.example to .env
cp .env.example .env
echo ".env file created. Please update it with your actual credentials."

# Create database tables if no SQL files are present
if [ ! -f "schema.sql" ]; then
  echo "No schema.sql found. You can create database tables using:"
  echo "npm run db:push"
else
  echo "schema.sql found. You can import it to your database using:"
  echo "psql -d your_database_name -f schema.sql"
  echo "psql -d your_database_name -f data.sql"
fi

echo "Setup completed!"
echo "To start the development server, run: npm run dev"