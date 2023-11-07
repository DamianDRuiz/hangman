import { render } from '@testing-library/react'

import Answer from './Answer'

describe('Answer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Answer />)
    expect(baseElement).toBeTruthy()
  })
})
