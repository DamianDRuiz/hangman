import { WINNING_MESSAGE } from 'src/constants'
import { resetGame } from 'src/util/resetGame'

export function win() {
  window.alert(WINNING_MESSAGE)
  resetGame()
}
