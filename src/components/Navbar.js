// ── React Concept: Functional Component ──
// Navbar is a reusable functional component rendered on every page.
// NavLink from React Router automatically applies 'active' class
// to the link whose path matches the current URL.

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Brand logo links back to home */}
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon">📚</div>
          <span className="brand-text">
            Assignment<span>Tracker</span>
          </span>
        </NavLink>

        {/* ── React Concept: React Router ──
            NavLink adds className="active" automatically when the route matches.
            'end' prop on "/" ensures it's only active on exact home match. */}
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            All
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            + Add
          </NavLink>

          <NavLink
            to="/completed"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Done
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
