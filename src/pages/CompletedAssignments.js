// ── React Concept: Functional Component + Conditional Rendering + List & Key ──
// CompletedAssignments filters the master list to show only finished tasks.

import React from 'react';
import { Link } from 'react-router-dom';
import AssignmentCard from '../components/AssignmentCard';

const CompletedAssignments = ({ assignments, onToggleComplete, onDelete }) => {

  // Derive the completed subset from the full assignments array
  const completedList = assignments.filter(a => a.completed);

  return (
    <div>

      {/* Page header */}
      <div className="page-header">
        <span className="page-tag">Archive</span>
        <h1 className="page-title">
          Completed <span>Work</span>
        </h1>
        <p className="page-subtitle">
          All the assignments you've finished. Well done!
        </p>
      </div>

      {/* ── React Concept: Conditional Rendering ──
          Show a congratulatory banner only if there are completed tasks. */}
      {completedList.length > 0 && (
        <div className="completed-banner">
          <div className="completed-banner-icon">🎉</div>
          <div>
            <div className="completed-banner-title">
              {completedList.length} task{completedList.length !== 1 ? 's' : ''} completed
            </div>
            <div className="completed-banner-text">
              Keep up the great work! You're making progress.
            </div>
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="section-header">
        <div className="section-title">
          Completed
          <span className="section-count">{completedList.length}</span>
        </div>
      </div>

      {/* ── React Concept: Conditional Rendering ──
          Show empty state when there are no completed assignments. */}
      {completedList.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏁</span>
          <div className="empty-title">Nothing completed yet</div>
          <p className="empty-text">
            Mark assignments as done from the home page.
          </p>
          <br />
          <Link to="/" className="btn btn-ghost">
            ← Back to All
          </Link>
        </div>

      ) : (
        // ── React Concept: List & Key ──
        // Each completed assignment card gets a unique key from its id.
        <div className="assignments-list">
          {completedList.map(assignment => (
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

export default CompletedAssignments;
