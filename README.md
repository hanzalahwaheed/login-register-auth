## API Documentation

### Authentication Routes

#### 1. Register User
- **Route:** `POST /auth/register`
- **Description:** Registers a new user with provided username, email, and password.
- **Parameters:**
  - `username` (string): The username of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
- **Returns:**
  - `status` (boolean): Indicates if the operation was successful.
  - `message` (string): Message indicating the result of the registration process.

#### 2. User Login
- **Route:** `POST /auth/login`
- **Description:** Authenticates a user with provided email and password, and generates a JWT token for further authorization.
- **Parameters:**
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
- **Returns:**
  - `status` (boolean): Indicates if the login was successful.
  - `message` (string): Message indicating the result of the login process.
- **Token:** The generated JWT token is set as a cookie named `token`.

#### 3. Forgot Password
- **Route:** `POST /auth/forgot-password`
- **Description:** Sends a password reset link to the provided email address.
- **Parameters:**
  - `email` (string): The email address of the user.
- **Returns:**
  - `status` (boolean): Indicates if the email was sent successfully.
  - `message` (string): Message indicating the result of the email sending process.

#### 4. Reset Password
- **Route:** `POST /auth/reset-password/:token`
- **Description:** Resets the password of a user with a valid reset token.
- **Parameters:**
  - `token` (string): The reset token received via email.
  - `password` (string): The new password to be set.
- **Returns:**
  - `status` (boolean): Indicates if the password reset was successful.
  - `message` (string): Message indicating the result of the password reset process.

### Additional Routes

#### 5. Verify User
- **Route:** `GET /auth/verify`
- **Description:** Verifies if the user is authenticated using the JWT token.
- **Token:** Requires a valid JWT token set as a cookie named `token`.
- **Returns:**
  - `status` (boolean): Indicates if the user is authorized.
  - `message` (string): Message indicating the authorization status.

#### 6. Logout User
- **Route:** `GET /auth/logout`
- **Description:** Logs out the user by clearing the JWT token cookie.
- **Returns:**
  - `status` (boolean): Indicates if the logout was successful.
  - `message` (string): Message indicating the result of the logout process.

### Note:
- All routes are accessible from the origin `http://localhost:5173`.
- Cross-origin requests are allowed with credentials.
- JWT tokens are signed using the key `"jwtkey"` and have an expiration time of 2 hours for login and 1 hour for password reset.
- The MongoDB database connection URI is hardcoded within the application.
- The nodemailer service is configured to use a Gmail account for sending emails.