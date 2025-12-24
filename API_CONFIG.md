# API Configuration Guide

## Overview
The application now supports both **development** (localhost) and **production** (Render) environments through a centralized configuration system.

## Files Modified

### Frontend
- **`src/config.js`** (NEW): Centralized API configuration
- **`src/submit.js`**: Updated to use `API_URL` from config

### Backend
- **`main.py`**: Updated CORS settings to allow both local and production origins

## How It Works

### Automatic Environment Detection
The `config.js` file automatically detects the environment:
- **Development**: Uses `http://localhost:8000`
- **Production**: Uses `https://fastapi-react-app-6ke5.onrender.com`

### Manual Override
If you need to manually switch between environments, edit `src/config.js`:

```javascript
// Force production URL
export const API_URL = PROD_URL;

// Force development URL
export const API_URL = DEV_URL;
```

## Running the Application

### Development Mode
```bash
# Backend (Terminal 1)
cd backend
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd frontend
npm start
```

### Production Deployment
The app will automatically use the production URL when deployed.

## CORS Configuration
The backend now accepts requests from:
- `http://localhost:3000` (local development)
- `https://fastapi-react-app-6ke5.onrender.com` (production)
- `*` (all origins - for testing, remove in production for security)

## Testing
1. Start the backend locally
2. Start the frontend with `npm start`
3. The app should connect to `http://localhost:8000`
4. When deployed, it will automatically use the Render URL
