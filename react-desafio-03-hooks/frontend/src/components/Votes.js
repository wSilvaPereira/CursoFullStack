import React from 'react';
import CountUp from 'react-countup';

export default function Votes({ value, previous }) {
  return (
    <CountUp
      start={previous}
      end={value}
      duration={0.6}
      separator="."
      // decimals={4}
      // decimal=","
      // prefix="EUR "
      // suffix=" left"
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
