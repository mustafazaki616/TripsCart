# TripsCart - Travel Booking Platform

## Project Overview

TripsCart is a modern travel booking platform built with React, TypeScript, and Tailwind CSS. The application provides a responsive user interface for booking flights, hotels, and other travel services.

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components
- **Flight Booking**: Search and book flights with flexible date options
- **Hotel Booking**: Find and reserve accommodations
- **User Authentication**: Secure login and registration system
- **Booking Management**: View and manage your travel bookings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone https://github.com/mustafazaki616/TripsCart.git

# Navigate to the project directory
cd TripsCart

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Build Tool**: Vite
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Routing**: React Router

## Project Structure

```
src/
├── assets/        # Static assets like images and icons
├── components/    # Reusable UI components
│   ├── layout/    # Layout components (Navbar, Footer, etc.)
│   ├── site/      # Site-specific components
│   └── ui/        # UI components from Shadcn
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
└── styles/        # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.








## Deployment

The project can be deployed using various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Configure the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
