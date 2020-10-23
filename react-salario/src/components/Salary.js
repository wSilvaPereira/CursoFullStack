import React, { Component } from 'react';
import css from './salary.module.css';

export default class Salary extends Component {
  handleSalary = (event) => {
    const { onChangeSalary } = this.props;
    onChangeSalary(parseFloat(event.target.value, 10));
  };
  render() {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>Salário Bruto</span>
        <div className={css.flex}>
          <input type="text" readOnly value="R$" style={{ width: '20px' }} />
          <input
            autoFocus
            step="100"
            type="number"
            min={1000}
            value={this.props.value}
            onChange={this.handleSalary}
          />
        </div>
      </div>
    );
  }
}
