import './styles.css';
import Die from './Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = useState(createRandomArray());

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
        key={die.id}
        hold={die.isHeld}
        value={die.value}
        freeze={() => freezeNumber(die.id)}
      />
    );
  });

  return (
    <main>
      <section>
        <div className='main-section'>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className='dice-section'>{mapDice}</div>
          <button onClick={rollDice}>Roll</button>
        </div>
      </section>
    </main>
  );
}

export default App;
