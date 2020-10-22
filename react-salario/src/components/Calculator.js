import React, { Component } from 'react';
import { formatNumber } from '../helpers/formatHelpers';
import css from './calculator.module.css';

export default class Calculator extends Component {
  render() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      discountINSSPerc,
      discountIRPFPerc,
      netSalaryPerc,
    } = this.props.onCalc;

    // prettier-ignore
    const discountINSSPercFull = 
      `${formatNumber(discountINSS)} (${discountINSSPerc}%)`;
    // prettier-ignore
    const discountIRPFPercFull =
      `${formatNumber(discountIRPF)} (${discountIRPFPerc}%)`;
    // prettier-ignore
    const netSalaryPercFull =
      `${formatNumber(netSalary)} (${netSalaryPerc}%)`;

    return (
      <div>
        <div className={css.Flex}>
          <div className={css.Item}>
            <span>Base INSS</span>
            <input type="text" readOnly value={formatNumber(baseINSS)} />
          </div>
          <div className={css.Item}>
            <span>Desconto INSS</span>
            <input type="text" readOnly value={discountINSSPercFull} />
          </div>
          <div className={css.Item}>
            <span>Base IRPF</span>
            <input type="text" readOnly value={formatNumber(baseIRPF)} />
          </div>
          <div className={css.Item}>
            <span>Desconto IRPF</span>
            <input type="text" readOnly value={discountIRPFPercFull} />
          </div>
        </div>
        <div>
          <span>Salário Líquido</span>
          <input type="text" readOnly value={netSalaryPercFull} />
        </div>
      </div>
    );
  }
}
