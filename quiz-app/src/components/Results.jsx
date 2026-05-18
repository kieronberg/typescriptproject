import React from 'react';

export default function Result({ score, total, onRestart }) {
  const getEmoji = () => {
    if (score === total) return "🏆";
    if (score >= total / 2) return "👏";
    return "📚";
  };

  const getTitle = () => {
    if (score === total) return "Perfect score!";
    if (score >= total / 2) return "Good job!";
    return "Keep practising!";
  };

  return (
    <div id="result-screen">
      <div className="result-emoji">{getEmoji()}</div>
      <h2>{getTitle()}</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong> correctly.
      </p>
      <button id="restart-btn" onClick={onRestart}>Try again</button>
    </div>
  );
}