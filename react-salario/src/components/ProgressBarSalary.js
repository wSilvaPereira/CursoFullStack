import React, { Component } from 'react';
import css from './progress.module.css';

export default class ProgressBarSalary extends Component {
  render() {
    const {
      discountINSSPerc,
      discountIRPFPerc,
      netSalaryPerc,
    } = this.props.onCalc;
    return (
      <div className={css.myProgress}>
        <div
          style={{
            width: `${discountINSSPerc}%`,
            backgroundColor: ' #e67e22',
            height: '20px',
          }}
        ></div>
        <div
          style={{
            width: `${discountIRPFPerc}%`,
            backgroundColor: '#c0392b',
            height: '20px',
          }}
        ></div>
        <div
          style={{
            width: `${netSalaryPerc}%`,
            backgroundColor: '#16a085',
            height: '20px',
          }}
        ></div>
      </div>
    );
  }
}
