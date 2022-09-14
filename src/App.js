import './styles.css';
import Die from './Die';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(createRandomArray());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allSelected = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allValuesMatch = dice.every((die) => die.value === firstValue);
    if (allSelected && allValuesMatch) {
      setTenzies(true);
    }
  }, [dice]);

  function dieGenerator() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function createRandomArray() {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      randomArray.push(dieGenerator());
    }
    return randomArray;
  }

  function rollDice() {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ? die : dieGenerator();
      });
    });
  }

  function freezeNumber(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const mapDice = dice.map((die) => {
    return (
      <Die
        hold={die.isHeld}
        key={die.id}
        value={die.value}
        freeze={() => freezeNumber(die.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti numberOfPieces={1900} />}
      <section>
        <div className='main-section'>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className='dice-section'>{mapDice}</div>
          <button onClick={rollDice}>{tenzies ? 'YOU WON!' : 'ROLL'}</button>
        </div>
      </section>
    </main>
  );
}

export default App;
