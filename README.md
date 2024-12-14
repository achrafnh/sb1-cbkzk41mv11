# Lawyer API

A Node.js API for managing lawyers and users with JWT authentication.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` file

3. Run database migrations:
   ```bash
   npm run migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

For development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- POST /users/signup - Create new user
- POST /users/login - User login
- PUT /users/update - Update user details

### Lawyers
- POST /lawyers/signup - Create new lawyer
- POST /lawyers/login - Lawyer login
- PUT /lawyers/update - Update lawyer details
- GET /lawyers/search - Search lawyers

### Admin
- GET /admin/lawyers - Get all lawyers
- PUT /admin/lawyers/:id - Update lawyer
- GET /admin/users - Get all users
- PUT /admin/users/:id - Update user

## Testing

Run tests:
```bash
npm test
```

Now that the server is running, here's how to test each endpoint using curl:

First, run the migrations to set up the database:

npm run migrate
Test the authentication flow:

# Admin Login (use these credentials to get admin token)
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# Create a new user
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

# Create a new lawyer
curl -X POST http://localhost:3000/lawyers/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "specialty": "Criminal Law",
    "experience_years": 10,
    "email": "john@example.com",
    "password": "password123"
  }'
Test protected endpoints (replace YOUR_TOKEN with the token received from login):

# Update user profile
curl -X PUT http://localhost:3000/users/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "username": "newusername"
  }'

# Search lawyers
curl -X GET "http://localhost:3000/lawyers/search?term=John&specialty=Criminal&experience_years=5"

# Admin endpoints (use admin token)
curl -X GET http://localhost:3000/admin/lawyers \
  -H "Authorization: Bearer ADMIN_TOKEN"

curl -X GET http://localhost:3000/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
Expected responses:

Successful login:

{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  },
  "token": "eyJhbGciOiJ..."
}
Successful signup:

{
  "message": "User created successfully",
  "user": {
    "id": 2,
    "username": "testuser",
    "role": "user"
  },
  "token": "eyJhbGciOiJ..."
}
Error response:

{
  "error": "Please authenticate"
}
Remember to:

Save the tokens returned from login/signup requests
Use the correct token in the Authorization header for protected endpoints
Check response status codes and messages for debugging