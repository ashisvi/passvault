# PassVault API

## Description

PassVault API is the backend service for the PassVault password manager app, designed primarily for use with a React Native frontend. It securely manages user authentication and stores user credentials.

## Live API

[https://passvault-3ucq.onrender.com/api](https://passvault-3ucq.onrender.com/api)

## Getting Started

To get started with the PassVault, follow these steps:

1. Make sure you are in backend directory.
2. Install dependencies using preferred package manager.

   ```bash
   bun install or npm install
   ```

3. Copy copy .env.sample to .env.

   ```bash
   cp .env.sample .env
   ```

4. Start the application server.

   ```bash
   bun start or npm start
   ```

## API Endpoints

### Password Management

- **Create Password**
  - `POST /api/passwords`
  - Creates a new password entry.
- **Get All Passwords**
  - `GET /api/passwords`
  - Retrieves all password entries.
- **Get Password by ID**
  - `GET /api/passwords/:id`
  - Retrieves a password entry by ID.
- **Update Password**
  - `PUT /api/passwords/:id`
  - Updates a specific password entry.
- **Delete Password**
  - `DELETE /api/passwords/:id`
  - Deletes a specific password entry.

### User Authentication

- **User Registration**
  - `POST /api/auth/register`
  - Registers a new user.
- **User Login**
  - `POST /api/auth/login`
  - Authenticates a user and returns a token.
- **User Logout**
  - `POST /api/auth/logout`
  - Logs out a user.
- **Token Refresh**
  - `POST /api/auth/refresh`
  - Refreshes the authentication token.
- **User Profile**
  - `GET /api/auth/profile`
  - Retrieves the authenticated user's profile.

### Endpoints to be implemented.

- **Change Password**
  - `PUT /api/auth/password`
  - Allows the user to change their password.
- **Forgot Password**
  - `POST /api/auth/forgot-password`
  - Initiates a password reset process for the user.
- **Reset Password**
  - `POST /api/auth/reset-password/:token`
  - Allows a user to reset their password using a valid token.

## Acknowledgements

- MongoDB
- Express.js
- Node.js

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.
