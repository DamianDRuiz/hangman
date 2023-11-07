// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Updater, useImmer } from 'use-immer'

const MAX_WRONG_GUESSES = 5
const LOSING_MESSAGE = 'You lost!!!! BOOO 🥺'
const WINNING_MESSAGE = 'YOU WON!!! ❤️ ❤️ ❤️ ❤️'
type Answer = string | null
type Guess = { keyChar: string; inAnswer: boolean }
type Guesses = Guess[]

export function App() {
  const [answer, setAnswer] = useState<Answer>(null)
  const [guesses, setGuesses] = useImmer<Guesses>([])

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

interface GuessesProps {
  guesses: Guesses
  answer: Answer
  setGuesses: Updater<Guesses>
}
function Guesses({ guesses, answer, setGuesses }: GuessesProps) {
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

interface AnswerProps {
  answer: Answer
  setAnswer: React.Dispatch<SetStateAction<Answer>>
}
function Answer({ answer, setAnswer }: AnswerProps) {
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

interface ActionButtonProps {
  action: () => void
  label: string
}
function ActionButton({ action, label }: ActionButtonProps) {
  return <button onClick={action}>{label}</button>
}

function isValidAnswerInput(value: string) {
  return value.match(/^[a-z]*$/)
}

function isPreviouslyGuessed(value: string, guesses: Guesses) {
  const isInGuess: boolean =
    guesses.filter((guess) => guess.keyChar == value).length > 0
  return isInGuess
}

function isInAnswer(value: string, answer: Answer) {
  if (answer == null) return false
  return answer.split('').includes(value)
}

function win() {
  window.alert(WINNING_MESSAGE)
  resetGame()
}

function lose() {
  window.alert(LOSING_MESSAGE)
  resetGame()
}

function resetGame() {
  window.location.reload()
}
export default App
