// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
type Guess = string
type Guesses = Guess[]
type Answer = string

export function App() {
  return (
    <>
      <NxWelcome title="hangman" />

      <div />
    </>
  );
}

export default App;
