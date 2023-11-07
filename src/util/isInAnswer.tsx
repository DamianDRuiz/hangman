import { Answer } from '../app/app'

export function isInAnswer(value: string, answer: Answer) {
  if (answer == null) return false
  return answer.split('').includes(value)
}
