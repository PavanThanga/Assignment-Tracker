# 📚 Student Assignment Tracker

A mid-range React project for tracking academic assignments.  
Built to demonstrate core React concepts: **Functional Components, useState, useEffect, Conditional Rendering, React Router, List & Key, and Forms**.

---

## 🗂 Folder Structure

```
student-assignment-tracker/
├── public/
│   └── index.html               # HTML shell with Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.js            # Navigation bar (React Router NavLink)
│   │   └── AssignmentCard.js    # Reusable card for each assignment
│   ├── pages/
│   │   ├── Home.js              # All assignments + filter tabs
│   │   ├── AddAssignment.js     # Controlled form to add tasks
│   │   └── CompletedAssignments.js  # Completed tasks archive
│   ├── App.js                   # Root component: Router + state + effects
│   ├── index.js                 # ReactDOM entry point
│   └── index.css                # Global styles & design tokens
├── package.json
└── README.md
```

---

## ⚛️ React Concepts Used

| Concept               | Where Used                                              |
|-----------------------|---------------------------------------------------------|
| Functional Components | Every file — App, Navbar, AssignmentCard, all pages     |
| `useState`            | App.js (assignments), AddAssignment.js (form fields, errors), Home.js (filter) |
| `useEffect`           | App.js — load from localStorage on mount, save on change |
| Conditional Rendering | AssignmentCard (completed styles), Home (empty state, filter), AddAssignment (error messages, success flash), CompletedAssignments (banner, empty state) |
| React Router          | App.js (BrowserRouter, Routes, Route), Navbar (NavLink), pages (Link, useNavigate) |
| List & Key            | Home.js, CompletedAssignments.js (.map() with key prop), AddAssignment.js (subject options) |
| Forms                 | AddAssignment.js — controlled inputs with validation    |

---

## 🚀 How to Run

### Prerequisites
- **Node.js** v16 or higher — [Download](https://nodejs.org)
- **npm** (comes with Node.js)

### Steps

```bash
# 1. Enter the project folder
cd student-assignment-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**

### Build for Production

```bash
npm run build
```
Outputs optimized files to the `build/` folder.

---

## ✨ Features

- **Add assignments** with title, subject, and deadline
- **Mark as complete / undo** with a single click
- **Delete** assignments
- **Filter** by All / Pending / Completed on the home page
- **Overdue detection** — deadline chips turn red past due date
- **Data persists** across page refreshes via `localStorage`
- **Three routes**: Home (`/`), Add (`/add`), Completed (`/completed`)
- Responsive layout for mobile and desktop
