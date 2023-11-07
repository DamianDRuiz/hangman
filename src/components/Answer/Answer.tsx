import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import { AnswerT } from 'src/types'
import { isValidAnswerInput } from 'src/util/isValidAnswerInput'

interface AnswerProps {
  answer: AnswerT
  setAnswer: React.Dispatch<SetStateAction<AnswerT>>
}
export function Answer({ answer, setAnswer }: AnswerProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidAnswerInput(e.target.value)) return
    setInputValue(e.target.value)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidAnswerInput(inputValue)) return
    setAnswer(inputValue)
    setInputValue('')
  }

  return (
    <div>
      <strong>Answer: {answer}</strong>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
        />
      </form>
    </div>
  )
}

export default Answer
