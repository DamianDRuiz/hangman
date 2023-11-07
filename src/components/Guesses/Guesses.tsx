import { useEffect } from 'react'
import { AnswerT, GuessesT } from 'src/app/types'
import { isInAnswer } from 'src/util/isInAnswer'
import { isPreviouslyGuessed } from 'src/util/isPreviouslyGuessed'
import { isValidAnswerInput } from 'src/util/isValidAnswerInput'
import { Updater } from 'use-immer'
import GuessedChar from '../GuessedChar/GuessedChar'

interface GuessesProps {
  guesses: GuessesT
  answer: AnswerT
  setGuesses: Updater<GuessesT>
}
export function Guesses({ guesses, answer, setGuesses }: GuessesProps) {
  useEffect(() => {
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
  }, [answer])

  const guessChars: JSX.Element[] = guesses.map((guess, i) => (
    <GuessedChar key={i} keyChar={guess.keyChar} inAnswer={guess.inAnswer} />
  ))

  return (
    <div>
      <h2>Guesses</h2>
      <strong>{guessChars}</strong>
    </div>
  )
}

export default Guesses
