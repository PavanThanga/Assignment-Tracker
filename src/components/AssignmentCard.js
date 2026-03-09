// ── React Concept: Functional Component ──
// AssignmentCard is a reusable component that renders a single assignment.
// It receives data and callbacks as props — no internal state needed.

import React from 'react';

// Helper: check if a deadline date has passed
const isOverdue = (deadline) => {
  if (!deadline) return false;
  return new Date(deadline) < new Date() && deadline !== '';
};

// Helper: format date to a readable string
const formatDate = (dateStr) => {
  if (!dateStr) return 'No deadline';
  const d = new Date(dateStr + 'T00:00:00'); // avoid timezone shift
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const AssignmentCard = ({ assignment, onToggleComplete, onDelete }) => {
  const { id, title, subject, deadline, completed } = assignment;

  const overdue = !completed && isOverdue(deadline);

  return (
    // ── React Concept: Conditional Rendering ──
    // The 'completed' class is applied conditionally using a template literal.
    <div className={`assignment-card ${completed ? 'completed' : ''}`}>

      {/* Circular checkbox to toggle completion */}
      <button
        className="card-checkbox"
        onClick={() => onToggleComplete(id)}
        title={completed ? 'Mark as pending' : 'Mark as completed'}
        aria-label={completed ? 'Mark as pending' : 'Mark as completed'}
      >
        {/* ── React Concept: Conditional Rendering ──
            Show checkmark only when completed. */}
        {completed && '✓'}
      </button>

      {/* Assignment details */}
      <div className="card-body">
        <div className="card-title">{title}</div>

        <div className="card-meta">
          {/* Subject chip */}
          {subject && (
            <span className="meta-chip subject">
              {subject}
            </span>
          )}

          {/* Deadline chip — turns red if overdue */}
          <span className={`meta-chip deadline ${overdue ? 'overdue' : ''}`}>
            {/* ── React Concept: Conditional Rendering ──
                Show warning icon only when overdue. */}
            {overdue && '⚠ '}
            {formatDate(deadline)}
          </span>

          {/* ── React Concept: Conditional Rendering ──
              Only show "Done" badge when the task is completed. */}
          {completed && (
            <span className="meta-chip done-chip">✓ Done</span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="card-actions">
        {/* Toggle button text changes based on state */}
        <button
          className="btn btn-complete"
          onClick={() => onToggleComplete(id)}
          title={completed ? 'Undo' : 'Complete'}
        >
          {completed ? '↩' : '✓'}
        </button>

        {/* Delete button */}
        <button
          className="btn btn-danger"
          onClick={() => onDelete(id)}
          title="Delete assignment"
          aria-label="Delete"
        >
          🗑
        </button>
      </div>

    </div>
  );
};

export default AssignmentCard;
