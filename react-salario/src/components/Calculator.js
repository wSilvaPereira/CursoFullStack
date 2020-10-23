import React, { Component } from 'react';
import { formatNumber, formatPercent } from '../helpers/formatHelpers';
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
      `${formatNumber(discountINSS)} (${formatPercent(discountINSSPerc)})`;
    // prettier-ignore
    const discountIRPFPercFull =
      `${formatNumber(discountIRPF)} (${formatPercent(discountIRPFPerc)})`;
    // prettier-ignore
    const netSalaryPercFull =
      `${formatNumber(netSalary)} (${formatPercent(netSalaryPerc)})`;

    return (
      <div>
        <div className={css.Flex}>
          {/* z-depth-1 */}
          <div className={`${css.Item} z-depth-1`}>
            <span>Base INSS</span>
            <input type="text" readOnly value={formatNumber(baseINSS)} />
          </div>
          <div className={`${css.Item} z-depth-1`}>
            <span>Desconto INSS</span>
            <input type="text" readOnly value={discountINSSPercFull} />
          </div>
          <div className={`${css.Item} z-depth-1`}>
            <span>Base IRPF</span>
            <input type="text" readOnly value={formatNumber(baseIRPF)} />
          </div>
          <div className={`${css.Item} z-depth-1`}>
            <span>Desconto IRPF</span>
            <input type="text" readOnly value={discountIRPFPercFull} />
          </div>
        </div>
        <div
          className={`z-depth-1`}
          style={{ fontWeight: 'bold', margin: '5px', padding: '5px' }}
        >
          <span>Salário Líquido</span>
          <input type="text" readOnly value={netSalaryPercFull} />
        </div>
      </div>
    );
  }
}
