#  eTuitionBD – Tuition Management System

##  Project Purpose

**eTuitionBD** is a full-stack Tuition Management System designed to connect **students**, **tutors**, and **admins** on a single, secure platform. The goal of this project is to solve real-life problems of finding **verified tutors** and **authentic tuition posts**, while ensuring smooth communication, transparent payments, and proper administrative control.

This project was developed as part of a **job task assessment**, focusing on real-world workflows, clean UI/UX, role-based authentication, and scalable backend architecture.

---
![Screenshot of e-Tuition BD](https://i.ibb.co.com/B22yJY1g/Screenshot-2025-12-31-040238.png)


##  Live Website

* **Client Live URL:** [https://e-tuition-bd-3d12f.web.app/](https://e-tuition-bd-3d12f.web.app/)
* **Server Live URL:** [https://e-tuition-bd-server-pi.vercel.app//](https://e-tuition-bd-server-pi.vercel.app//)

>  Firebase authorized domains are properly configured and all environment variables are secured.

---

## How the System Works (Workflow)

1. **Student** registers and posts a tuition requirement (class, subject, budget, location, schedule).
2. **Admin** reviews and approves/rejects tuition posts.
3. **Tutors** browse approved tuition posts and apply.
4. **Students** review tutor applications and approve a tutor by completing payment.
5. **Tutors** start ongoing tuitions after payment confirmation.
6. **Admin** monitors users, tuitions, and financial activities.

---

## Screenshot
![Screenshot of e-Tuition BD](https://i.ibb.co.com/qL6QhwD9/Screenshot-2025-12-31-040723.png)


##  Key Features

###  Authentication & Authorization

* Firebase Authentication (Email/Password)
* Google Social Login (Default role: Student)
* JWT-based authentication
* Role-based dashboard routing (Student / Tutor / Admin)
* Token verification (role, access level, expiration)
* Protected & persistent private routes

---

###  Home Page

* Hero section
* Latest Tuition Posts (dynamic)
* Latest Tutors (dynamic)
* Framer Motion animations (minimum 2)
* How the Platform Works (3-step grid)
* Why Choose Us section

---

###  Student Dashboard

**Functionalities:**

* Post new tuition (Pending → Admin Approval)
* Update tuition (with pre-filled values)
* Delete tuition (with confirmation popup)
* View approved tuitions
* View applied tutors
* Approve tutor only after Stripe payment
* Reject tutor applications
* View payment history
* Update profile information

---

###  Tutor Dashboard

**Functionalities:**

* Apply to tuition posts
* Track application status (Pending / Approved / Rejected)
* Update or delete application before approval
* View ongoing tuitions
* Revenue & transaction history

---

###  Admin Dashboard

**User Management**

* View all users
* Update user information
* Change user roles (Student / Tutor / Admin)
* Delete users

**Tuition Management**

* Review tuition posts
* Approve or reject tuition requests
* Control platform data quality

**Reports & Analytics**

* View total earnings
* Transaction history
* Charts & graphs using Recharts

---

##  Challenge Features Implemented

* Search tuitions by subject & location
* Sort by budget & date
* Pagination on tuition listing page
* Advanced filter (class, subject, location)
* Secure JWT role verification

---

##  Optional Features Implemented

* Tutor rating & review system
* Notifications system
* Bookmark tuition posts

---

## UI & UX Highlights

* Unique and recruiter-friendly design
* Responsive for mobile, tablet & desktop
* Sticky navbar with DaisyUI
* Consistent color theme & typography
* Dashboard with sidebar layout
* Loading spinner during data fetch
* Custom 404 error page

---

##  Technologies Used

###  Client Side Packages

* React 19
* React Router 7
* Tailwind CSS 4
* DaisyUI
* Firebase
* Axios
* TanStack React Query
* React Hook Form
* Framer Motion
* Recharts
* Leaflet & React-Leaflet
* SweetAlert2
* Swiper
* React Toastify
* Lucide React

---

### Server Side Packages

* Node.js
* Express.js 
* MongoDB
* Firebase Admin SDK
* JSON Web Token (JWT)
* Stripe Payment Gateway
* CORS
* Dotenv

---

##  Security Practices

* Firebase keys stored in environment variables
* MongoDB credentials secured with `.env`
* JWT-based role verification
* Protected API routes
* No exposed secret keys

---

##  Deployment Notes

* No CORS / 404 / 504 issues
* Firebase authorized domains updated
* Private routes persist after reload
* Production-ready build

---
 Developer Info

 **Project Name:** eTuitionBD
 **Developer:** Rabeya
 **Project Type:** Full Stack MERN Application

---

 This project strictly follows the provided job task requirements and template.
