import { render } from '@testing-library/react'

import Guesses from './Guesses'

describe('Guesses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Guesses />)
    expect(baseElement).toBeTruthy()
  })
})
