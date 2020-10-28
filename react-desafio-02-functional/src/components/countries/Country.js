import React from 'react';

import css from './countries.module.css';

export default function Country({ country }) {
  const { name, flag } = country;
  return (
    <div className={`${css.border} ${css.country} z-depth-3`}>
      <img className={`${css.flag} z-depth-2`} src={flag} alt={name} />
      <span className={`${css.countryName}`}>{name}</span>
    </div>
  );
}
