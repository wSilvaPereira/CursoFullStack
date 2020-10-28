import React, { useEffect, useState } from 'react';
import Candidates from './components/Candidates';
import Header from './components/Header';
import Spinner from './components/Spinner';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    console.log('entrou');
    const fecthVotes = async () => {
      const res = await fetch('http://localhost:8080/votes');
      const json = await res.json();

      console.log(candidates);
      const localPreviousVotes = candidates.map(({ id, votes }) => {
        return { id, votes };
      });

      const localPreviousPercentages = candidates.map(({ id, percentage }) => {
        return { id, percentage };
      });

      setCandidates(json.candidates);
      setPreviousVotes(localPreviousVotes);
      setPreviousPercentages(localPreviousPercentages);
    };
    const interval = setInterval(() => {
      fecthVotes();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [candidates]);

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />;
  } else {
    return (
      <div className="container">
        <Header>Votação</Header>
        <Candidates
          candidates={candidates}
          previousVotes={previousVotes}
          previousPercentages={previousPercentages}
        />
      </div>
    );
  }
}
