import { WINNING_MESSAGE } from '../app/app'
import { resetGame } from './resetGame'

export function win() {
  window.alert(WINNING_MESSAGE)
  resetGame()
}
