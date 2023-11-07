import { GuessT } from 'src/app/types'

interface GuessedCharProps extends GuessT {}
function GuessedChar({ keyChar, inAnswer }: GuessedCharProps) {
  const styles: React.CSSProperties = {
    color: inAnswer ? 'green' : 'red',
    border: '1px solid #000',
    display: 'inline-block',
    marginRight: '10px',
    lineHeight: '0',
    padding: '10px',
  }

  return <span style={styles}>{keyChar}</span>
}

export default GuessedChar
