# Production Deployment Configuration

## Required Environment Variables

Make sure these are set in your Render.com deployment:

### Database
- `MONGO_URL` or `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name (defaults to 'trine_solutions' if not set)

### Security
- `JWT_SECRET_KEY` - Secret key for JWT tokens (required for production)
- `CORS_ORIGINS` - Comma-separated list of allowed origins (e.g., `https://your-frontend.com,https://www.your-frontend.com`)

### Cloudinary (Optional - for image uploads)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## Health Check Endpoints

Your backend now has health check endpoints:

- `GET /` - Basic status check
- `GET /health` - Detailed health check with database connection status

## Common Deployment Issues

### 1. Backend not responding in production

**Symptoms:** Frontend shows "Authentication failed" or can't connect to backend

**Solutions:**
1. Check Render logs for startup errors
2. Verify all required environment variables are set
3. Test health endpoint: `https://trine-solutions-backend.onrender.com/health`
4. Check CORS_ORIGINS includes your frontend URL

### 2. Database connection fails

**Symptoms:** `/health` endpoint shows "database": "disconnected"

**Solutions:**
1. Verify MONGO_URL is correct
2. Check MongoDB Atlas allows connections from Render IP addresses
3. Ensure database user has proper permissions

### 3. JWT token issues

**Symptoms:** Login works but sessions expire unexpectedly

**Solutions:**
1. Set JWT_SECRET_KEY environment variable (don't rely on auto-generated)
2. Use the same secret across all backend instances

## Verifying Deployment

### 1. Check Backend Health
```bash
curl https://trine-solutions-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "cloudinary": "enabled"
}
```

### 2. Check API Endpoint
```bash
curl https://trine-solutions-backend.onrender.com/api/
```

Expected response:
```json
{
  "message": "Trine Solutions API"
}
```

### 3. Test Admin Login
```bash
curl -X POST https://trine-solutions-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "password": "yourpassword"
  }'
```

Should return a token if credentials are correct.

## Render-Specific Configuration

### Build Command
```bash
pip install -r requirements.txt
```

### Start Command
```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

Note: Render provides the `PORT` environment variable automatically.

## Troubleshooting Steps

1. **Check Render Dashboard Logs**
   - Go to your Render dashboard
   - Click on your backend service
   - Check the "Logs" tab for errors

2. **Verify Environment Variables**
   - In Render dashboard, go to "Environment"
   - Ensure all required variables are set
   - Check for typos in variable names

3. **Test Locally First**
   - Make sure backend works locally
   - Set all environment variables in `.env` file
   - Run: `uvicorn server:app --reload`

4. **Check Database Access**
   - MongoDB Atlas: Add Render's IP to whitelist (or use 0.0.0.0/0 for all IPs)
   - Test connection string locally

5. **CORS Issues**
   - Ensure CORS_ORIGINS includes your frontend domain
   - Use comma-separated list: `https://app.com,https://www.app.com`
   - Don't use trailing slashes in URLs

## Quick Deploy Checklist

- [ ] MONGO_URL environment variable set
- [ ] JWT_SECRET_KEY set (use a strong random string)
- [ ] CORS_ORIGINS includes frontend URL
- [ ] Cloudinary credentials set (if using image uploads)
- [ ] MongoDB allows connections from Render
- [ ] Start command uses uvicorn with --host 0.0.0.0
- [ ] Health endpoint returns "healthy"
- [ ] Can login via API endpoint
