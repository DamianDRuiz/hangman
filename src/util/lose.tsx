import { LOSING_MESSAGE } from 'src/constants'
import { resetGame } from './resetGame'

export function lose() {
  window.alert(LOSING_MESSAGE)
  resetGame()
}
