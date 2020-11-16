import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ModalTeste from './components/ModalTeste';

import M from 'materialize-css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualValue, setActualValue] = useState(3);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const selectHandleChange = (event) => {
    setActualValue(event.target.value);
  };

  return (
    <div>
      <input type="button" value="Abrir Modal" onClick={handleClick} />
      <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      <select
        className="browser-default"
        id="yearMonthSelect"
        style={{
          width: '100px',
          textAlignLast: 'center',
          height: '30px',
        }}
        onChange={selectHandleChange}
        value={actualValue}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {/* {isModalOpen && (
        <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      )} */}
    </div>
  );
}
