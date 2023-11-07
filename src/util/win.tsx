import { WINNING_MESSAGE } from 'src/app/constants'
import { resetGame } from './resetGame'

export function win() {
  window.alert(WINNING_MESSAGE)
  resetGame()
}
