import { GuessesT } from 'src/types/types'

export function isPreviouslyGuessed(value: string, guesses: GuessesT) {
  const isInGuess: boolean =
    guesses.filter((guess) => guess.keyChar == value).length > 0
  return isInGuess
}
