// API Configuration
// This file centralizes API URL configuration for different environments

// Production API URL (Render deployment)
const PRODUCTION_API_URL = "https://fastapi-react-app-1.onrender.com";

// Development API URL (local backend)
const DEVELOPMENT_API_URL = "http://localhost:8000";

// Automatically detect environment and use appropriate API URL
// You can also manually set this by changing the condition
export const API_URL = process.env.NODE_ENV === 'production'
    ? PRODUCTION_API_URL
    : DEVELOPMENT_API_URL;

// Export both URLs for manual switching if needed
export const PROD_URL = PRODUCTION_API_URL;
export const DEV_URL = DEVELOPMENT_API_URL;
