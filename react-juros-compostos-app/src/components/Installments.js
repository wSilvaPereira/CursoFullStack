import React from 'react';
import css from './installments.module.css';
import { formatNumber, formatPercent } from '../helpers/formatHelpers.js';

export default function Installments({
  id,
  novoValor,
  diferenca,
  difPercentual,
}) {
  // console.log(parseInt(id % 2));
  const idAux = parseInt(id % 2);
  const style = idAux === 1 ? styles.grayed : styles.normal;
  return (
    <div>
      <div className={`${css.border} ${css.flex1} z-depth-2`} style={style}>
        <span style={{ fontSize: '1.6rem' }}>
          <strong> {id} </strong>
        </span>
        <div className={`${css.flex2} `}>
          <span>{formatNumber(novoValor)}</span>
          <span>{formatNumber(diferenca)}</span>
          <span>{formatPercent(difPercentual)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grayed: {
    backgroundColor: 'lightgray',
  },
  normal: {
    backgroundColor: 'white',
  },
};
