import React from 'react';
import css from './user.module.css';

export default function User({ user }) {
  const { name, picture } = user;
  const { first, last } = name;
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.large} alt={first} />
      <span>{first + ' ' + last}</span>
    </div>
  );
}
