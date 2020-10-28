import React from 'react';
// import css from './counter.module.css';

export default function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement('+');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-light btn orange darken-4"
    >
      +
    </button>
  );
}
