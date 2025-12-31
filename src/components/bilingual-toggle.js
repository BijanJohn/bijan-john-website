/** @jsx jsx */
import { jsx } from "theme-ui"
import { useTranslation } from "gatsby-plugin-react-i18next"

const BilingualToggle = ({ mode, setMode }) => {
  const { t } = useTranslation()

  const modes = [
    { key: 'persian', label: t('bilingual.persian') },
    { key: 'columns', label: t('bilingual.columns') },
    { key: 'alternating', label: t('bilingual.alternating') },
    { key: 'romanized', label: t('bilingual.romanized') },
  ]

  return (
    <div className="bilingual-toggle" sx={toggleStyle.container}>
      {modes.map((m) => (
        <button
          key={m.key}
          className={mode === m.key ? 'active' : ''}
          onClick={() => setMode(m.key)}
          sx={toggleStyle.button}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export default BilingualToggle

const toggleStyle = {
  container: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mb: 4,
    pb: 3,
    borderBottom: '1px solid',
    borderColor: 'muted',
  },
  button: {
    fontSize: '0.875rem',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid',
    borderColor: 'muted',
    bg: 'transparent',
    color: 'text',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      bg: 'muted',
    },
    '&.active': {
      bg: 'primary',
      color: 'white',
      borderColor: 'primary',
    },
  },
}
