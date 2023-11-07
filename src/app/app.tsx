// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useEffect, useState } from 'react'
import Answer from 'src/components/Answer/Answer'
import Guesses from 'src/components/Guesses/Guesses'
import { lose } from 'src/util/lose'
import { win } from 'src/util/win'
import { useImmer } from 'use-immer'
import { MAX_WRONG_GUESSES } from '../constants'
import { AnswerT, GuessesT } from '../types'

export function App() {
  const [answer, setAnswer] = useState<AnswerT>(null)
  const [guesses, setGuesses] = useImmer<GuessesT>([])

  useEffect(() => {
    if (answer == null) return

    const tooManyWrongGuesses: boolean =
      guesses.filter((guess) => guess.inAnswer == false).length >=
      MAX_WRONG_GUESSES

    const allLettersGuessedCorrectly: boolean =
      guesses.filter((guess) => guess.inAnswer == true).length == answer.length

    if (tooManyWrongGuesses) lose()
    if (allLettersGuessedCorrectly) win()
  }, [guesses])

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

export default App
