import { AnswerT } from 'src/types/types'

export function isInAnswer(value: string, answer: AnswerT) {
  if (answer == null) return false
  return answer.split('').includes(value)
}
