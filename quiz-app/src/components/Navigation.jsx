import React from 'react';

export default function Navigation({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div id="nav-row">
      <button 
        className="nav-btn" 
        onClick={onPrev} 
        disabled={disablePrev}
      >
        ← Prev
      </button>
      <button 
        className="nav-btn" 
        onClick={onNext} 
        disabled={disableNext}
      >
        Next →
      </button>
    </div>
  );
}