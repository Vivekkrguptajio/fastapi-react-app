# API Configuration Guide

## Overview
The application is configured for **local development** using localhost.

## Files Modified

### Frontend
- **`src/config.js`**: Centralized API configuration for localhost
- **`src/submit.js`**: Uses `API_URL` from config

### Backend
- **`main.py`**: CORS settings configured for localhost

## How It Works

The `config.js` file uses a simple localhost configuration:
- **API URL**: `http://localhost:8000`

## Running the Application

### Local Development
```bash
# Backend (Terminal 1)
cd backend
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd frontend
npm start
```

## CORS Configuration
The backend accepts requests from:
- `http://localhost:3000` (local development)

## Testing
1. Start the backend locally with `uvicorn main:app --reload --port 8000`
2. Start the frontend with `npm start`
3. The app will connect to `http://localhost:8000`
