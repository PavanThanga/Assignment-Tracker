// ── React Concept: Functional Component + useState + Conditional Rendering + List & Key ──
// Home is the main dashboard page showing all assignments.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentCard from '../components/AssignmentCard';

const Home = ({ assignments, onToggleComplete, onDelete }) => {

  // ── React Concept: useState ──
  // 'filter' controls which tab is active: "all", "pending", or "completed"
  const [filter, setFilter] = useState('all');

  // Derived counts for the stats bar
  const totalCount     = assignments.length;
  const pendingCount   = assignments.filter(a => !a.completed).length;
  const completedCount = assignments.filter(a => a.completed).length;

  // Filter assignments based on active tab
  const filteredAssignments = assignments.filter(a => {
    if (filter === 'pending')   return !a.completed;
    if (filter === 'completed') return a.completed;
    return true; // 'all'
  });

  return (
    <div>

      {/* Page header */}
      <div className="page-header">
        <span className="page-tag">Dashboard</span>
        <h1 className="page-title">
          My <span>Assignments</span>
        </h1>
        <p className="page-subtitle">
          Track, manage, and complete your academic tasks.
        </p>
      </div>

      {/* Stats bar — always visible */}
      <div className="stats-bar">
        <div className="stat-card total">
          <div className="stat-number">{totalCount}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card done">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {['all', 'pending', 'completed'].map(tab => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="section-header">
        <div className="section-title">
          Assignments
          <span className="section-count">{filteredAssignments.length}</span>
        </div>
        <Link to="/add" className="btn btn-primary">
          + New
        </Link>
      </div>

      {/* ── React Concept: Conditional Rendering ──
          If no assignments exist at all, show a CTA to add one.
          If there are assignments but none match the filter, show a different message. */}
      {assignments.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <div className="empty-title">No assignments yet</div>
          <p className="empty-text">
            Add your first assignment to get started.
          </p>
          <br />
          <Link to="/add" className="btn btn-primary">
            + Add Assignment
          </Link>
        </div>

      ) : filteredAssignments.length === 0 ? (
        // ── React Concept: Conditional Rendering ──
        // Shows only when the active filter returns zero results.
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <div className="empty-title">Nothing here</div>
          <p className="empty-text">
            No {filter} assignments found.
          </p>
        </div>

      ) : (
        // ── React Concept: List & Key ──
        // .map() renders one AssignmentCard per assignment.
        // Each element gets a unique 'key' prop (the assignment's id).
        // React uses keys internally to efficiently update the DOM.
        <div className="assignments-list">
          {filteredAssignments.map(assignment => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
