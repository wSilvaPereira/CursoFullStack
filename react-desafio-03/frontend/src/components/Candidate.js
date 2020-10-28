import React from 'react';
import Info from './Info';
import Name from './Name';
import Votes from './Votes';
import Percentage from './Percentage';
import Popularity from './Popularity';
import Picture from './Picture';
import Position from './Position';
import css from './candidate.module.css';

export default function Candidate({
  candidate,
  position,
  previousVote,
  previousPercentage,
}) {
  const { name, votes, id, percentage, popularity } = candidate;
  const imageSource = `${id}.jpg`;
  return (
    <div className={css.flexRow}>
      <Position>{position} </Position>
      <Picture imageSource={imageSource} description={name} />
      <Info>
        <Name>{name}</Name>
        <Votes value={votes} previous={previousVote} />
        <Percentage previous={previousPercentage} value={percentage} />
        <Popularity value={popularity}></Popularity>
      </Info>
    </div>
  );
}
