import React, { useEffect, useState } from 'react';
import { getNewTimestamp } from './helpers/dataTimeHelpers';

export default function App() {
  const [clickArray, setclickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length.toString();
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    // const newClickArray = [...clickArray];
    newClickArray.push(getNewTimestamp());
    setclickArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React e <em>Hooks</em>
      </h1>
      <button onClick={handleClick}>Clique Aqui!</button>

      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
