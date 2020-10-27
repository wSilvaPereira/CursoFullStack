import React from 'react';
import css from './forms.module.css';

export default function Forms({
  capitalInicial,
  jurosMensal,
  parcelas,
  onChangeInfos,
}) {
  function handleChange(event) {
    let capital = 0;
    let juros = 0;
    let parcela = 0;
    // console.log(event.target.value);

    if (event.target.id === 'capital') {
      capital = parseFloat(event.target.value);
    } else if (event.target.id === 'juros') {
      juros = parseFloat(event.target.value);
    } else if (event.target.id === 'parcela') {
      parcela = parseFloat(event.target.value);
    }
    console.log({ capital, juros, parcela });
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <span>Capital inicial</span>
        <input
          id="capital"
          type="number"
          max="100000"
          step="100"
          value={capitalInicial}
          onChange={handleChange}
        />
      </div>
      <div className={css.item}>
        <span>taxa de juros mensal</span>
        <input
          id="juros"
          type="number"
          max="100000"
          step="100"
          value={jurosMensal}
          onChange={handleChange}
        />
      </div>
      <div className={css.item}>
        <span>Parcela (meses)</span>
        <input
          id="parcela"
          type="number"
          max="100000"
          step="100"
          value={parcelas}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
