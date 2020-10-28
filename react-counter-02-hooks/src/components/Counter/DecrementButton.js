import React from 'react';

export default function DecrementButton(props) {
  const handleButtonClick = () => {
    props.onDecrement('-');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-light btn black darken-4"
    >
      -
    </button>
  );
}
