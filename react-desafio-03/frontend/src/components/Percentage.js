import React from 'react';
import CountUp from 'react-countup';

export default function Percentage({ value, previous }) {
  // return <div>{children}</div>;
  return (
    <CountUp
      start={previous}
      end={value}
      duration={0.6}
      separator="."
      decimals={2}
      decimal="."
      // prefix="EUR "
      suffix="%"
      // onEnd={() => console.log('Ended! 👏')}
      // onStart={() => console.log('Started! 💨')}
    >
      {({ countUpRef, start }) => (
        <div>
          <span ref={countUpRef} />
          {/* <button onClick={start}>Start</button> */}
        </div>
      )}
    </CountUp>
  );
}
