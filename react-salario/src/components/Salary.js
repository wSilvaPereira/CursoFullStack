import React, { Component } from 'react';

export default class Salary extends Component {
  handleSalary = (event) => {
    const { onChangeSalary } = this.props;
    onChangeSalary(event.target.value);
  };
  render() {
    return (
      <div>
        <span>Salário Bruto</span>
        <input
          type="number"
          min={0}
          value={this.props.value}
          onChange={this.handleSalary}
        />
      </div>
    );
  }
}
