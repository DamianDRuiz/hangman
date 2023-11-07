import { AnswerT } from '../app/app'

export function isInAnswer(value: string, answer: AnswerT) {
  if (answer == null) return false
  return answer.split('').includes(value)
}
