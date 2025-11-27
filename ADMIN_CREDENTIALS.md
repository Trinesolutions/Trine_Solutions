# Admin Login Credentials

## Default Admin Account

When you start the backend server for the first time, a default admin account is automatically created:

**Email:** admin@trinesolutions.com  
**Password:** Admin@123

## Important Security Notes

1. **Change the default password immediately after first login!**
2. The startup script only creates this account if NO admin users exist in the database
3. Subsequent server restarts will NOT recreate or reset this account
4. All passwords are hashed using bcrypt for security

## How to Login

1. Navigate to: http://localhost:3000/admin/login
2. Enter the email and password above
3. Click "Sign In"
4. You will be redirected to the admin dashboard

## Creating Additional Admin Users

You can create additional admin accounts by:

1. Using the registration endpoint (if enabled)
2. Or manually adding users to the MongoDB `admin_users` collection with hashed passwords

## Troubleshooting

If you can't login:

1. **Check backend logs** - The startup event will print a message when creating the default admin
2. **Verify MongoDB connection** - Ensure your MONGO_URL environment variable is correct
3. **Check the database** - Look for the admin user in the `trine_solutions` database, `admin_users` collection
4. **Try the register endpoint** - If login fails, you might need to register a new account

## Backend Startup Message

When the backend starts successfully, you should see:

```
✅ Default admin user created:
   Email: admin@trinesolutions.com
   Password: Admin@123
   Please change this password after first login!
```

OR if an admin already exists:

```
✅ Found 1 admin user(s) in database
```

## Password Reset

If you forget your password, you'll need to:

1. Access MongoDB directly
2. Generate a new password hash using bcrypt
3. Update the `password_hash` field in the `admin_users` collection

Or simply delete all admin users from MongoDB and restart the server to recreate the default account.
