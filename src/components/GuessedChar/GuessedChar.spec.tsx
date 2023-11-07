import { render } from '@testing-library/react'

import GuessedChar from './GuessedChar'

describe('GuessedChar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GuessedChar />)
    expect(baseElement).toBeTruthy()
  })
})
