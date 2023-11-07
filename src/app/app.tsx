// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useImmer } from 'use-immer'

type Answer = string
type Guess = string
type Guesses = Guess[]
//type ProcessedGuess = { key: string; inAnswer: boolean }

export function App() {
  const [answer, setAnswer] = useImmer<Answer>('')
  const [guesses, setGuesses] = useImmer<Guesses>([])

  const keyboardEffect = () => {
    const listener = (e: KeyboardEvent) =>
      setGuesses((draft) => {
        if (!isValidAnswerInput(e.key)) return
        draft.push(e.key)
      })

    document.addEventListener('keypress', listener)

    return () => document.removeEventListener('keypress', listener)
  }

  useEffect(keyboardEffect, [])

  return (
    <>
      <h1>Hangman</h1>
      <Answer answer={answer} setAnswer={setAnswer} />
      <Guesses guesses={guesses} />
    </>
  )
}

interface GuessesProps {
  guesses: Guesses
}
function Guesses({ guesses }: GuessesProps) {
  return (
    <div>
      <h2>Guesses</h2>
      <strong>{guesses.join('')}</strong>
    </div>
  )
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
export default App
