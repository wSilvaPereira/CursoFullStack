import React, { Fragment, useState } from 'react';
import Band from './components/Counter/Band.js';
import Counter from './components/Counter/Counter.js';
import Counter2 from './components/Counter/Counter2.js';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    setCurrentCounter(
      clickType === '+' ? currentCounter + 1 : currentCounter - 1
    );
    setSteps(steps + 1);
  };

  return (
    <Fragment>
      <h3>Band</h3>
      <Band />
      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />
      <h3>Counter2</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
    </Fragment>
  );
}
