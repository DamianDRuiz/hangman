import { LOSING_MESSAGE } from '../app/app'
import { resetGame } from './resetGame'

export function lose() {
  window.alert(LOSING_MESSAGE)
  resetGame()
}
