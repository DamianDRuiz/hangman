// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { isInAnswer } from 'src/util/isInAnswer'
import { isPreviouslyGuessed } from 'src/util/isPreviouslyGuessed'
import { isValidAnswerInput } from 'src/util/isValidAnswerInput'
import { lose } from 'src/util/lose'
import { win } from 'src/util/win'
import { Updater, useImmer } from 'use-immer'
import { MAX_WRONG_GUESSES } from './constants'

export type Answer = string | null
export type Guess = { keyChar: string; inAnswer: boolean }
export type Guesses = Guess[]

export function App() {
  const [answer, setAnswer] = useState<Answer>(null)
  const [guesses, setGuesses] = useImmer<Guesses>([])

  const observeGameEffect = () => {
    if (answer == null) return

    const tooManyWrongGuesses: boolean =
      guesses.filter((guess) => guess.inAnswer == false).length >=
      MAX_WRONG_GUESSES

    const allLettersGuessedCorrectly: boolean =
      guesses.filter((guess) => guess.inAnswer == true).length == answer.length

    if (tooManyWrongGuesses) lose()
    if (allLettersGuessedCorrectly) win()
  }

  useEffect(observeGameEffect, [guesses])

  return (
    <>
      <h1>Hangman</h1>
      {!answer ? (
        <Answer answer={answer} setAnswer={setAnswer} />
      ) : (
        <Guesses guesses={guesses} answer={answer} setGuesses={setGuesses} />
      )}
    </>
  )
}

interface AnswerProps {
  answer: Answer
  setAnswer: React.Dispatch<SetStateAction<Answer>>
}
export function Answer({ answer, setAnswer }: AnswerProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidAnswerInput(e.target.value)) return
    setInputValue(e.target.value)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidAnswerInput(inputValue)) return
    setAnswer(inputValue)
    setInputValue('')
  }

  return (
    <div>
      <strong>Answer: {answer}</strong>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
        />
      </form>
    </div>
  )
}

interface GuessesProps {
  guesses: Guesses
  answer: Answer
  setGuesses: Updater<Guesses>
}
export function Guesses({ guesses, answer, setGuesses }: GuessesProps) {
  const keyboardEffect = () => {
    const listener = (e: KeyboardEvent) =>
      setGuesses((draft) => {
        if (!isValidAnswerInput(e.key)) return
        if (isPreviouslyGuessed(e.key, draft)) return
        draft.push({
          keyChar: e.key,
          inAnswer: isInAnswer(e.key, answer),
        })
      })

    document.addEventListener('keypress', listener)
    return () => document.removeEventListener('keypress', listener)
  }

  useEffect(keyboardEffect, [answer])

  const guessChars = guesses.map((guess, i) => (
    <GuessedChar key={i} keyChar={guess.keyChar} inAnswer={guess.inAnswer} />
  ))

  return (
    <div>
      <h2>Guesses</h2>
      <strong>{guessChars}</strong>
    </div>
  )
}

interface GuessedCharProps extends Guess {}
function GuessedChar({ keyChar, inAnswer }: GuessedCharProps) {
  const styles = {
    color: inAnswer ? 'green' : 'red',
    border: '1px solid #000',
    display: 'inline-block',
    marginRight: '10px',
    lineHeight: '0',
    padding: '10px',
  }

  return <span style={styles}>{keyChar}</span>
}

export default App
