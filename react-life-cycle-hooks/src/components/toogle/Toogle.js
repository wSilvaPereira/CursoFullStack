import React from 'react';

export default function Toogle({ onToogle, enabled, description }) {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    onToogle(isChecked);
  };

  return (
    <div className="switch">
      <label>
        {description}
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
