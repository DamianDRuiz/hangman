import { GuessesT } from '../app/app'

export function isPreviouslyGuessed(value: string, guesses: GuessesT) {
  const isInGuess: boolean =
    guesses.filter((guess) => guess.keyChar == value).length > 0
  return isInGuess
}
