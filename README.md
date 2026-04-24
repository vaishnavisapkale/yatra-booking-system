# 🛕 Yatra Booking System

A full-stack pilgrimage booking platform inspired by the Shri Mata Vaishno Devi Shrine Board. This application allows users to book accommodation, battery car, and ropeway services with real-time availability and secure authentication.

---

## 🚀 Features

* 🔐 User Authentication (JWT + Refresh Token)
* 🏨 Accommodation Booking
* 🚗 Battery Car Booking (Route-based)
* 🚡 Ropeway Booking (Slot-based)
* 📅 Date-wise Inventory Management
* 👥 Dynamic Pilgrim Details (Max 6)
* ❌ Booking Cancellation
* 📜 Booking History (My Bookings)
* 💳 Razorpay Payment Integration (In Progress)

---

## 🧠 Key Functionalities

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

### 4. Payment Flow (Planned)

* Create Order
* Razorpay Checkout
* Payment Verification
* Booking Confirmation after success

---

## 🛠️ Tech Stack

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

* Razorpay (Integration in progress)

---

## 📁 Folder Structure

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

## ⚙️ Installation & Setup

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

## 📸 Screens (Optional)

* Login Page
* Accommodation Booking
* Car Service Booking
* Ropeway Booking
* My Bookings Page

<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/d719ba05-4faa-4d60-858f-ed908ddb32fa" />
<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/9da3fa96-2d46-4991-80c8-3e0c30585fb7" />
<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/23c2b76b-6ce3-47c3-9b2c-d888f2dc307d" />
<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/7cd09b5e-60e7-41fd-88b3-782bd5fffbf4" />
<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/b48ac1db-746c-4d81-9f3a-f19018d4fa3f" />
<img width="1438" height="696" alt="image" src="https://github.com/user-attachments/assets/2a67f410-ceae-4a76-8595-577580800079" />


---

## 🔥 Future Enhancements

* ✅ Payment Integration (Razorpay)
* 📄 Yatra Parchi PDF Generation
* 📅 Smart Date Picker (Availability colors)
* 🔔 Email Notifications
* 📊 Admin Dashboard

---

## 👩‍💻 Author

Vaishnavi Sapkale

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
