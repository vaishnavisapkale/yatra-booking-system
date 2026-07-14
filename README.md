## Yatra Booking System

A full-stack pilgrimage booking platform inspired by the Shri Mata Vaishno Devi Shrine Board. The system enables users to book accommodation, battery car, and ropeway services with real-time availability, secure authentication, and integrated payments. It also handles real-world challenges like seat allocation, booking conflicts, and concurrent bookings using optimized backend logic.


---

## Features

* User Authentication (JWT + Refresh Token)
* Accommodation Booking
* Battery Car Booking (Route-based)
* Ropeway Booking (Slot-based)
* Date-wise Inventory Management
* Dynamic Pilgrim Details (Max 6)
* Booking Cancellation
* Booking History (My Bookings)
* Razorpay Payment Integration
* Admin Dashboard (Create & Manage Inventory)

---

## Key Functionalities

### 1. Authentication

* Register / Login
* Refresh Token mechanism for auto-login
* Secure protected routes

### 2. Inventory System

* Dynamic inventory creation
* Filtering based on:
  
  * Date
  * Location (Accommodation)
  * Route (Car/Ropeway)
* Real-time availability updates

### 3. Booking System

* Accommodation:

  * Room-based booking
  * Capacity validation
* Car/Ropeway:

  * Seat-based booking
  * Route + Slot selection

### 4. Payment Flow

* Create Order using backend
* Razorpay Checkout integration
* Payment verification on backend
* Booking confirmation after successful payment

### 5. Admin Dashboard

* Create and manage inventory (Rooms, Cars, Ropeway)
* Set availability, pricing, and capacity
* View all bookings
* Manage slots based on date and routes

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (Access + Refresh Tokens)

### Payment

* Razorpay (Fully Integrated)

---

## Folder Structure

```
project-root/
│
├── client/               # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── assets/           # GIF / images
│
├── server/               # Node Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the repo

```
git clone https://github.com/your-username/yatra-booking-system.git
cd yatra-booking-system
```

### 2. Backend Setup

```
cd server
npm install
npm run dev
```

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```

---

## Future Enhancements

* Yatra Parchi PDF Generation
* Smart Date Picker (Availability colors)
* Email Notifications
* Advanced Admin Analytics Dashboard

---

## Author

Vaishnavi Sapkale

