import React, { Component } from 'react';
import Toogle from './components/toogle/Toogle.js';
import Users from './components/users/Users.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    console.log('componentDidMount de App.js');
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const json = await res.json();
    // console.log(json);

    this.setState({
      users: json.results,
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({ showUsers: isChecked });
  };

  render() {
    const { users, showUsers } = this.state;
    console.log(showUsers);
    return (
      <div>
        <h3>React LifeCycle</h3>
        <Toogle
          description="Mostrar usuários:"
          enabled={showUsers}
          onToogle={this.handleShowUsers}
        />
        <hr />
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
