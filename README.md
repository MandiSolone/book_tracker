# Book Tracker

Keep track of your books and their locations. 

Book Tracker is a web application that helps you manage your personal library by tracking the books you've read, want to read, and their locations—all in one central spot. With Book Tracker, you can effortlessly monitor your reading journey and focus on what matters most: enjoying your books!

## Key Features
- **Comprehensive Library Management**: Track all your books in one place, including titles, authors, and locations (e.g., home library, Kindle, etc.).
- **Reading Progress**: Mark books as "Read," "Currently Reading," or "Want to Read." Add comments and ratings to remember what you liked or didn't like.
- **User Authentication**: Sign up and log in using Google OAuth for secure access.
- **Book Management**: Easily add new books, view your reading list, and remove books you no longer wish to track.
- **Responsive Design**: Optimized for both desktop and mobile devices, ensuring a great experience on any screen size.
- **User Profiles**: Each user has a unique profile where their books are stored, keeping personal libraries separate and organized.

## Technologies Used
- **Frontend**: React, CSS, Axios
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: Passport.js with Google OAuth
- **Caching**: Redis for session management

## Table of Contents
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Usage](#usage)
- [Contact](#contact)


## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a package manager like npm or yarn.

## Installation
To run this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MandiSolone/book_tracker.git
   cd book_tracker

2. **Navigate to the project directory**:
   ```
   cd src
   ```

3. **Install the dependencies for both client and server**:
   ```cd client
npm install
cd ../server
npm install

4. **Set up environment variables**: 

# Client (.env):
REACT_APP_API_URL=http://localhost:8080/api

# Server (.env):
NODE_ENV=development
PORT=8080
API_URL=http://localhost:8080
CLIENT_URL=http://localhost:8080
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

Database configuration 
DB_HOST=your_db_host
DB_USER=your_user
DB_PASS=your_password
DB_SCHEMA=your_db_schema

GOOGLE_BOOKS_API_KEY=your_google_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_google_session_secret
REDISCLOUD_URL=your_redis_url


### Running the Application

To start the application, run:
npm run dev 
To start the app for production: 
npm run build 
To start the production server:
npm start 

### Scripts 

dev:client: Start the client development server.
dev:server: Start the server development server.
build:client: Build the client application for production.
build:server: Build the server application for production.
start: Start the production server.

This will start the development server and open the application in your default web browser.

## Usage

1. Sign Up/Log In: Use the Google OAuth button to sign up or log in.
2. Add Books: Click the "Add Book" button to enter book details.
3. View Books: Your reading list will be displayed with options to remove books as needed.
4. Logout: Use the logout option to end your session.

Contact 
For questions or feedback, feel free to reach out to me:

Email: mandisolone@gmail.com
GitHub: MandiSolone

