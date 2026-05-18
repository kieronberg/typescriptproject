import React from 'react';

export default function Header({ score, total }) {
  return (
    <div id="quiz-header">
      <div id="quiz-label">Quiz App</div>
      <div id="score-badge">
        <span>{score}</span><span id="score-sep">/</span><span>{total}</span>
      </div>
    </div>
  );
}