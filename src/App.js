// ── React Concept: React Router ──
// BrowserRouter wraps the entire app to enable client-side routing.
// Routes/Route define which component renders at each URL path.

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddAssignment from './pages/AddAssignment';
import CompletedAssignments from './pages/CompletedAssignments';

// ── React Concept: Functional Component ──
// App is a functional component (arrow function, no class).
const App = () => {

  // ── React Concept: useState ──
  // 'assignments' holds the array of all assignment objects.
  // setAssignments is the setter used to update state throughout the app.
  const [assignments, setAssignments] = useState([]);

  // ── React Concept: useEffect ──
  // This effect runs ONCE on mount (empty dependency array []).
  // It loads any previously saved assignments from localStorage.
  useEffect(() => {
    const saved = localStorage.getItem('sat_assignments');
    if (saved) {
      setAssignments(JSON.parse(saved));
    }
  }, []); // empty array = run only once on mount

  // ── React Concept: useEffect (with dependency) ──
  // This effect runs every time 'assignments' state changes.
  // It syncs the latest assignments array into localStorage.
  useEffect(() => {
    localStorage.setItem('sat_assignments', JSON.stringify(assignments));
  }, [assignments]); // re-runs whenever assignments changes

  // ── Handler: Add a new assignment ──
  const handleAdd = (newAssignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };

  // ── Handler: Toggle completed/pending status ──
  const handleToggleComplete = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  // ── Handler: Delete an assignment ──
  const handleDelete = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  return (
    // ── React Concept: React Router ──
    // Router wraps the whole app; Routes selects the matching Route.
    <Router>
      <div className="app-shell">
        {/* Navbar is shown on every page */}
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Route 1: Home — shows all assignments */}
            <Route
              path="/"
              element={
                <Home
                  assignments={assignments}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              }
            />

            {/* Route 2: Add Assignment form */}
            <Route
              path="/add"
              element={<AddAssignment onAdd={handleAdd} />}
            />

            {/* Route 3: Completed assignments only */}
            <Route
              path="/completed"
              element={
                <CompletedAssignments
                  assignments={assignments}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
