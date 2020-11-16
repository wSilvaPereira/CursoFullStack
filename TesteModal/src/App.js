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

  const handleClickButton = (event) => {
    const divTeste = document.getElementById('testeClick');
    // console.log(event.target);
    divTeste.textContent = event.target.id;
  };

  return (
    <div>
      <input type="button" value="Abrir Modal" onClick={handleClick} />
      <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <a
          className="waves-effect waves-light btn"
          id="button1"
          onClick={handleClickButton}
        >
          button1
        </a>
        <select
          // className="browser-default"
          id="yearMonthSelect"
          style={{
            width: '100px',
            textAlignLast: 'center',
            height: '38px',
          }}
          onChange={selectHandleChange}
          value={actualValue}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <a
          className="waves-effect waves-light btn"
          id="button2"
          onClick={handleClickButton}
        >
          button2
        </a>
      </div>
      <div id="testeClick"></div>
      {/* {isModalOpen && (
        <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      )} */}
    </div>
  );
}
