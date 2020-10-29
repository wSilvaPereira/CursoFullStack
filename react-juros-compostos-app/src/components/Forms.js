import React from 'react';
import css from './forms.module.css';

export default function Forms({
  capitalInicial,
  jurosMensal,
  parcelas,
  onChangeInfos,
}) {
  function handleChange() {
    const capitalClass = document.querySelector('#capital');
    const jurosClass = document.querySelector('#juros');
    const parcelaClass = document.querySelector('#parcelas');

    let capital = parseFloat(capitalClass.value);
    let juros = parseFloat(jurosClass.value);
    let parcelas = parseFloat(parcelaClass.value);

    onChangeInfos(capital, juros, parcelas);
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <span>Capital inicial</span>
        <input
          id="capital"
          type="number"
          min="0"
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
          min="-12"
          max="12"
          step="0.1"
          value={jurosMensal}
          onChange={handleChange}
        />
      </div>
      <div className={css.item}>
        <span>Parcelas (meses)</span>
        <input
          id="parcelas"
          type="number"
          min="1"
          max="36"
          step="1"
          value={parcelas}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
