import React, { Component } from 'react';
// import css from './counter.module.css';

export default class IncrementButton extends Component {
  handleButtonClick = () => {
    this.props.onIncrement('+');
  };

  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-light btn orange darken-4"
      >
        +
      </button>
    );
  }
}
