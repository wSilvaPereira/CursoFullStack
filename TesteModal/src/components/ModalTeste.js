import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function ModalTeste({ onClose, isModalOpen }) {
  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div>
          <h3>William</h3>
          <h3>William</h3>
          <h3>William</h3>
          <input type="button" value="Teste" />
          <button
            className="waves-effect waves-light btn"
            onClick={handleModalClose}
          >
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
}
