import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ModalTeste from './components/ModalTeste';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {}, [isModalOpen]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <input type="button" value="Abrir Modal" onClick={handleClick} />
      <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      {/* {isModalOpen && (
        <ModalTeste onClose={handleClose} isModalOpen={isModalOpen} />
      )} */}
    </div>
  );
}
