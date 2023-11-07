import { Guesses } from '../app/app'

export function isPreviouslyGuessed(value: string, guesses: Guesses) {
  const isInGuess: boolean =
    guesses.filter((guess) => guess.keyChar == value).length > 0
  return isInGuess
}
