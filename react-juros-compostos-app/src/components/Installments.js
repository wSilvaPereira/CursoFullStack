import React from 'react';
import css from './installments.module.css';
import { formatNumber, formatPercent } from '../helpers/formatHelpers.js';

export default function Installments({
  id,
  novoValor,
  diferenca,
  difPercentual,
}) {
  return (
    <div>
      <div className={`${css.border} ${css.flex1}  z-depth-2`}>
        <span style={{ fontSize: '1.6rem' }}>
          <strong> {id} </strong>
        </span>
        <div className={`${css.flex2}`}>
          <span>{formatNumber(novoValor)}</span>
          <span>{formatNumber(diferenca)}</span>
          <span>{formatPercent(difPercentual)}</span>
        </div>
      </div>
    </div>
  );
}
