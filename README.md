# MERN Stack E-Commerce Application

This is an e-commerce application built using the **MERN** stack (MongoDB, Express, React, Node.js). The application allows users to register, log in, add products, search, update, and delete products. Authentication is implemented using JSON Web Tokens (JWT) for secure access.

## 🚀 Features

- **Authentication and Authorization**:
  - User registration and login.
  - JWT-based token storage for route protection.
- **Product Management**:
  - Add new products.
  - List products belonging to the logged-in user.
  - Search for products by name, brand, or category.
  - Update and delete products.
- **Frontend**:
  - Built with React to provide a modern user interface.
  - Navigation between components using React Router.
- **Backend**:
  - RESTful API built with Node.js and Express.
  - MongoDB integration for data storage.

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- React Router
- Fetch API for HTTP requests

### Backend:
- Node.js
- Express.js
- MongoDB (using mongoose for data modeling)
- JSON Web Tokens (JWT) for authentication

---

## 📂 Project Structure

```plaintext
project-root/
├── backend/
│   ├── db/
│   │   ├── config.js        # MongoDB database configuration
│   │   ├── User.js          # User model
│   │   ├── Product.js       # Product model
│   ├── index.js            # Main server code
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (Login, Product List, etc.)
│   │   ├── App.css           # Main application css
│   │   ├── App.js           # Main application component
│   │   ├── index.js         # React entry point
|   |── public/
│
├── .env                     # Environment variables
├── README.md                # This document
