import React, { useState } from 'react';
import Forms from './components/Forms';

export default function App() {
  const [capitalInicial, setCapitalInicial] = useState(0);
  const [jurosMensal, setjurosMensal] = useState(0);
  const [parcelas, setParcelas] = useState(0);

  const handleInfos = () => {};

  return (
    <div className="container z-depth-2" style={{ padding: '10px' }}>
      <h1 style={{ textAlign: 'center' }}>React - Juros Compostos</h1>
      <Forms
        capitalInicial={capitalInicial}
        jurosMensal={jurosMensal}
        parcelas={parcelas}
        onChangeInfos={handleInfos}
      />
    </div>
  );
}
