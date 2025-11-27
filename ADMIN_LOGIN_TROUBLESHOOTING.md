# Admin Login Troubleshooting

## Current Status

✅ Backend is running successfully on http://localhost:8000
✅ Found 3 admin users in the database

## The Problem

You're getting "Authentication failed" when trying to login with your credentials.

## Likely Causes

1. **Email case mismatch**: The system normalizes emails to lowercase
   - If you registered with `Admin@Example.com`, you must login with `admin@example.com`

2. **Wrong password**: The password must match exactly what was used during registration

3. **Account inactive**: Your account may have been deactivated

## Solutions

### Option 1: Use the Registration Page

If you can't remember your credentials:

1. Go to the admin login page: http://localhost:3000/admin/login
2. Click the toggle to switch to "Register" mode
3. Create a new admin account with:
   - Your email (will be converted to lowercase)
   - A strong password
   - Your full name

### Option 2: Create Default Admin (if none exists)

I've added code that creates a default admin account on server startup if NO admin users exist. Since you have 3 existing users, this won't run. To use it:

1. Stop the backend server
2. Delete all admin users from MongoDB:
   ```javascript
   use trine_solutions
   db.admin_users.deleteMany({})
   ```
3. Restart the backend server
4. Look for this message in the logs:
   ```
   ✅ Default admin user created:
      Email: admin@trinesolutions.com
      Password: Admin@123
   ```
5. Login with these credentials
6. **IMPORTANT**: Change the password immediately after first login!

### Option 3: Check MongoDB Directly

Connect to your MongoDB database and check the admin_users collection:

```javascript
use trine_solutions
db.admin_users.find({}, { email: 1, name: 1, is_active: 1 })
```

This will show you:
- All registered email addresses
- User names
- Account status

### Option 4: Reset a Specific User's Password

If you know the email but forgot the password:

1. Generate a password hash in Python:
   ```python
   import bcrypt
   password = "YourNewPassword123"
   hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
   print(hash)
   ```

2. Update MongoDB:
   ```javascript
   use trine_solutions
   db.admin_users.updateOne(
     { email: "your@email.com" },
     { $set: { password_hash: "PASTE_HASH_HERE" } }
   )
   ```

## Common Mistakes

❌ **Email with uppercase**: Use lowercase only
- Wrong: `Admin@Example.Com`
- Correct: `admin@example.com`

❌ **Extra spaces**: No spaces before/after email or password

❌ **Wrong endpoint**: Make sure frontend is using `http://localhost:8000/api/admin/login`

## Verify Backend is Working

Test the login endpoint directly with curl:

```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trinesolutions.com",
    "password": "Admin@123"
  }'
```

If this returns a token, the backend is working fine and the issue is with your credentials.

## Check Browser Console

Open DevTools (F12) in your browser and check:
1. **Console tab**: Any JavaScript errors?
2. **Network tab**: What response is the /login request getting?
   - 401 = Wrong email/password
   - 403 = Account disabled
   - 500 = Server error

## Still Having Issues?

Check backend logs for specific error messages when you try to login. The terminal running uvicorn will show detailed error information.
