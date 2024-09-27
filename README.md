# Description

Front end React form application for user authentication. It is meant to be used with features including sign-up, log-in, and two-factor authentication (You can find it here: [Backend Repository](https://github.com/kssampson/fingerprint-project-backend.git)). The app utilizes Chakra UI for styling and FingerprintJS for generating unique visitor IDs.

# Deployed Example
https://fingerprintproject.site/

## Backend

This application requires the backend server for handling user authentication and related operations. You can find the backend repository at the following link:

[Backend Repository](https://github.com/kssampson/fingerprint-project-frontend.git)

## Usage

## Features
- FingerprintJS integration
- User Sign-Up
- User Log-In
- Two-Factor Authentication (2FA) via Email

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kssampson/fingerprint-project-frontend.git
    cd fingerprint-project-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Running the app

To start the application, run:

```bash
# development mode
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

# Components
## App
The main component that handles the routing and state management for user authentication.

## SignUpForm
Form component for user registration.

## Login
Form component for user login.

## OtpModal
Modal component for handling 2FA via a one time passcode.

## LoginSuccessful
Simple component displayed upon successful login.


# API Endpoints
- Sign-Up: POST /auth/sign-up
- Log-In: POST /auth/log-in
- Two Factor Authentication via one-time passcode: POST /auth/process-otp


## ✉ Find me on:
<br />
<p align="left">
 <a href="https://www.linkedin.com/in/sampsonkyle/" target="_blank" rel="noopener noreferrer">
  <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" height="40" style="vertical-align:top; margin:4px 10px 4px 0;">
 </a>
</p>
