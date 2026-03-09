// ── React Concept: Functional Component + useState + Forms ──
// AddAssignment uses a controlled form — every input field is bound
// to a state variable, making React the "single source of truth".

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// List of subject options for the dropdown
const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Other',
];

const AddAssignment = ({ onAdd }) => {

  // ── React Concept: useState ──
  // Each form field has its own state variable.
  // This pattern is called "controlled components".
  const [title,    setTitle]    = useState('');
  const [subject,  setSubject]  = useState('');
  const [deadline, setDeadline] = useState('');

  // ── React Concept: useState ──
  // 'errors' holds validation messages per field.
  // 'submitted' shows a success flash after saving.
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  // useNavigate lets us redirect after form submission
  const navigate = useNavigate();

  // ── Validation ──
  const validate = () => {
    const newErrors = {};
    if (!title.trim())   newErrors.title   = 'Title is required.';
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!deadline)       newErrors.deadline = 'Deadline is required.';
    return newErrors;
  };

  // ── Form Submit Handler ──
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    const validationErrors = validate();

    // ── React Concept: Conditional Rendering (via state) ──
    // If there are errors, update state so error messages appear under inputs.
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build a new assignment object with a unique id
    const newAssignment = {
      id:        Date.now().toString(),
      title:     title.trim(),
      subject:   subject.trim(),
      deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newAssignment); // pass up to App.js

    // Show success message, then navigate home after a short delay
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1200);
  };

  // ── Reset form ──
  const handleReset = () => {
    setTitle('');
    setSubject('');
    setDeadline('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div>

      {/* Page header */}
      <div className="page-header">
        <span className="page-tag">New Entry</span>
        <h1 className="page-title">
          Add <span>Assignment</span>
        </h1>
        <p className="page-subtitle">
          Fill in the details below to track a new task.
        </p>
      </div>

      <div className="form-card">

        {/* ── React Concept: Conditional Rendering ──
            The success banner is only shown after a successful submit. */}
        {submitted && (
          <div className="form-success">
            ✓ &nbsp; Assignment added! Redirecting…
          </div>
        )}

        {/* ── React Concept: Forms ──
            onSubmit is bound to our handler. Inputs use value + onChange
            to create a fully controlled form. */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">

            {/* ── Title input (controlled) ── */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="title">
                Assignment Title *
              </label>
              <input
                id="title"
                type="text"
                className="form-input"
                placeholder="e.g. Chapter 5 Problem Set"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  // Clear error as user types
                  if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                }}
              />
              {/* ── React Concept: Conditional Rendering ──
                  Error message only renders when the field has a validation error. */}
              {errors.title && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>
                  ⚠ {errors.title}
                </span>
              )}
            </div>

            {/* ── Subject dropdown (controlled) ── */}
            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                Subject *
              </label>
              <select
                id="subject"
                className="form-input"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                }}
                style={{ cursor: 'pointer' }}
              >
                <option value="">— Select subject —</option>
                {/* ── React Concept: List & Key ──
                    Rendering a list of <option> elements with .map() + key */}
                {SUBJECTS.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              {errors.subject && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>
                  ⚠ {errors.subject}
                </span>
              )}
            </div>

            {/* ── Deadline date input (controlled) ── */}
            <div className="form-group">
              <label className="form-label" htmlFor="deadline">
                Deadline *
              </label>
              <input
                id="deadline"
                type="date"
                className="form-input"
                value={deadline}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  if (errors.deadline) setErrors(prev => ({ ...prev, deadline: '' }));
                }}
                style={{ colorScheme: 'dark' }}
              />
              {errors.deadline && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>
                  ⚠ {errors.deadline}
                </span>
              )}
            </div>

          </div>

          {/* Form action buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleReset}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitted}
            >
              Save Assignment
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AddAssignment;
