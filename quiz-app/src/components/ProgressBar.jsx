import React from 'react';

export default function ProgressBar({ width }) {
  return (
    <div id="progress-track">
      <div id="progress-fill" style={{ width: `${width}%` }}></div>
    </div>
  );
}