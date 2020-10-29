import React from 'react';
import css from './installments.module.css';
import { formatNumber, formatPercent } from '../helpers/formatHelpers.js';

export default function Installments({
  id,
  novoValor,
  diferenca,
  difPercentual,
}) {
  const idAux = parseInt(id % 2);
  const style = idAux === 1 ? styles.grayed : styles.normal;
  const color = difPercentual < 0 ? colors.deprecColor : colors.investColor;
  console.log(color);
  return (
    <div>
      <div className={`${css.border} ${css.flex1} z-depth-2`} style={style}>
        <span style={{ fontSize: '1.6rem' }}>
          <strong> {id} </strong>
        </span>
        <div className={`${css.flex2}`}>
          <span style={color.color1}>{formatNumber(novoValor)}</span>
          <span style={color.color1}>{formatNumber(diferenca)}</span>
          <span style={color.color2}>{formatPercent(difPercentual)}</span>
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

// const bold = {
//   negrito: {
//     fontWeight: 'bold',
//   },
// };

const colors = {
  investColor: {
    color1: {
      color: 'green',
    },
    color2: {
      color: 'blue',
    },
  },
  deprecColor: {
    color1: {
      color: 'red',
    },
    color2: {
      color: '#e67e22',
    },
  },
};
