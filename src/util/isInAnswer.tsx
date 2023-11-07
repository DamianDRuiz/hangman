import { AnswerT } from 'src/app/types'

export function isInAnswer(value: string, answer: AnswerT) {
  if (answer == null) return false
  return answer.split('').includes(value)
}
