/** @jsx jsx */
import { jsx } from "theme-ui"

const BilingualToggle = ({ mode, setMode }) => {
  const modes = [
    { key: 'persian', label: 'فارسی' },
    { key: 'columns', label: 'Side-by-Side' },
    { key: 'alternating', label: 'Alternating' },
    { key: 'romanized', label: 'Romanized' }
  ]

  return (
    <div className="bilingual-toggle" sx={styles.container}>
      {modes.map(m => (
        <button
          key={m.key}
          className={mode === m.key ? 'active' : ''}
          onClick={() => setMode(m.key)}
          sx={styles.button}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.5rem 1rem',
    border: '1px solid',
    borderColor: 'muted',
    borderRadius: '4px',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '0.9rem',
    '&:hover': {
      borderColor: 'primary',
    },
    '&.active': {
      background: 'primary',
      color: 'white',
      borderColor: 'primary',
    },
  },
}

export default BilingualToggle
