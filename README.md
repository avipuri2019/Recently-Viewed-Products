# Backend API

## Overview

This backend API is built to manage user registration, recently viewed products, and Redis caching. It uses Firebase Authentication for user management, Firestore for data storage, and Redis for caching frequently accessed data.

### Features:

- **User Signup**: Registers users in Firebase Authentication.
- **Recently Viewed Products**: Captures recently viewed products by users.
- **Redis Caching**: Used to cache frequently accessed data for better performance.
- **Firestore**: Used for storing and retrieving product and user-related data.

# Backend Setup and Running Instructions

This README provides step-by-step instructions to set up and run the backend application using Docker.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)
- Node.js (https://nodejs.org/) (for development purposes)

## Project Setup

Follow these steps to set up the backend project.

### 1. Clone the Repository

Clone the repository to your local machine:

### Key Steps with Commands:

1. **Install dependencies**: `npm install`
2. **Build and start containers**: `docker-compose --build -d`
3. **Check container status**: `docker-compose ps`
4. **View logs**: `docker-compose logs <container-name>`
5. **Stop containers**: `docker-compose down`
6. **Access container shell for debugging**: `docker exec -it <app-container-name> /bin/sh`
7. **Run tests**: `npm test`

Note : Also You need to update serviceAccountkey file content

API screenshot to fetch recentlyviewed products
![recentlyviewed products api]
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-59-46.png" />

#FrontEnd Screenshot
Login page
![login page]
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-58-01.png" />

#Homepage having all products list and below that recently viewed products
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-58-07.png" />

#Recently Viewed product below product list
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-58-10.png" />

#product page
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-58-17.png" />

#after visiting to product page then back to homepage page udpated recently viewed product list
<img src="https://holidaystnt.in/uploads/0000/7/2024/12/02/screenshot-from-2024-12-02-18-58-28.png" />

Let me know if you need further updates!
