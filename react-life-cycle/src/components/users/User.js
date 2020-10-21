import React, { Component } from 'react';
import css from './user.module.css';

export default class User extends Component {
  render() {
    const { user } = this.props;
    const { name, picture } = user;
    const { first, last } = name;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.large} alt={first} />
        <span>{first + ' ' + last}</span>
      </div>
    );
  }
}
