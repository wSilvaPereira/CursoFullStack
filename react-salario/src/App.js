import React, { Component } from 'react';
import Calculator from './components/Calculator';
import ProgressBarSalary from './components/ProgressBarSalary';
import Salary from './components/Salary';
import { calculateSalaryFrom } from './helpers/salary.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 3900,
    };
  }

  onChangeSalary = (fullSalary) => {
    this.setState({ fullSalary });
  };

  render() {
    const calculatedSalary = calculateSalaryFrom(this.state.fullSalary);
    return (
      <div
        className="container z-depth-2"
        style={{ padding: '10px', marginTop: '10px' }}
      >
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          React Salário
        </h1>
        <Salary
          value={this.state.fullSalary}
          onChangeSalary={this.onChangeSalary}
        />
        <Calculator onCalc={calculatedSalary} />
        <ProgressBarSalary onCalc={calculatedSalary} />
      </div>
    );
  }
}
