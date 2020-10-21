import React, { Component } from 'react';

export default class Toogle extends Component {
  // handleShowUsers = (event) => {
  //   console.log(event.target.checked);
  //   this.setState({ showUsers: event.target.checked });
  // };

  handleChange = (event) => {
    const isChecked = event.target.checked;
    const { onToogle } = this.props;
    onToogle(isChecked);
  };

  render() {
    const { enabled, description } = this.props;
    return (
      <div className="switch">
        <label>
          {description}
          <input
            type="checkbox"
            checked={enabled}
            onChange={this.handleChange}
          />
          <span className="lever"></span>
        </label>
      </div>
    );
  }
}
