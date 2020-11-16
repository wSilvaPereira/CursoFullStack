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
  }, [actualValue]);

  // useEffect(() => {
  //   console.log(actualValue);
  // }, [actualValue]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const selectHandleChange = (event) => {
    // console.log('teste');
    setActualValue(event.target.value);
  };

  const handleClickButton = (event) => {
    const divTeste = document.getElementById('testeClick');
    divTeste.textContent = event.target.id;

    let newSelect = actualValue;
    console.log(event.target.id);
    if (event.target.id === 'button1') {
      newSelect--;
    } else {
      newSelect++;
    }
    setActualValue(newSelect);
  };

  return (
    <div>
      <input type="button" value="Abrir Modal" onClick={handleClick} />
      <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <span
          className="waves-effect waves-light btn"
          id="button1"
          onClick={handleClickButton}
          // href={}
        >
          button1
        </span>
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
          // input={actualValue}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <span
          className="waves-effect waves-light btn"
          id="button2"
          onClick={handleClickButton}
          // href="#"
        >
          button2
        </span>
      </div>
      <div id="testeClick"></div>
      {/* {isModalOpen && (
        <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      )} */}
    </div>
  );
}
