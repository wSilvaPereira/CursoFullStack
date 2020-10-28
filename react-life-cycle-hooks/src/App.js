'use strict';
import React, { useEffect, useState } from 'react';
import Toogle from './components/toogle/Toogle.js';
import Users from './components/users/Users.js';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=br&results=10'
      );
      const json = await res.json();
      setUsers(json.results);
    };
    fetchUsers();
  }, [users]);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  console.log(showUsers);
  return (
    <div>
      <h3>React LifeCycle</h3>
      <Toogle
        description="Mostrar usuários:"
        enabled={showUsers}
        onToogle={handleShowUsers}
      />
      <hr />
      {showUsers && <Users users={users} />}
    </div>
  );
}
