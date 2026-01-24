/** @jsx jsx */
import { jsx } from "theme-ui"

const BilingualContent = ({ persian, romanized, mode }) => {
  if (mode === 'persian') {
    return (
      <div className="persian-only" lang="fa" dir="rtl" sx={styles.persian}>
        {persian}
      </div>
    )
  }

  if (mode === 'romanized') {
    return (
      <div className="romanized-only" sx={styles.romanized}>
        {romanized}
      </div>
    )
  }

  if (mode === 'columns') {
    return (
      <div className="bilingual-columns" sx={styles.columns}>
        <div className="col-persian" lang="fa" dir="rtl" sx={styles.colPersian}>
          {persian}
        </div>
        <div className="col-romanized" sx={styles.colRomanized}>
          {romanized}
        </div>
      </div>
    )
  }

  if (mode === 'alternating') {
    return (
      <div className="bilingual-alternating" sx={styles.alternating}>
        <div className="line-persian" lang="fa" dir="rtl" sx={styles.linePersian}>
          {persian}
        </div>
        <div className="line-romanized" sx={styles.lineRomanized}>
          {romanized}
        </div>
      </div>
    )
  }

  return null
}

const styles = {
  persian: {
    textAlign: 'right',
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
    lineHeight: 1.9,
    marginBottom: '1rem',
  },
  romanized: {
    lineHeight: 1.8,
    marginBottom: '1rem',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
    gap: '2rem',
    marginBottom: '1.5rem',
  },
  colPersian: {
    textAlign: 'right',
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
    lineHeight: 1.9,
  },
  colRomanized: {
    color: 'muted',
    lineHeight: 1.8,
  },
  alternating: {
    marginBottom: '1.5rem',
  },
  linePersian: {
    textAlign: 'right',
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
    lineHeight: 1.9,
    marginBottom: '0.25rem',
  },
  lineRomanized: {
    color: 'muted',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
  },
}

export default BilingualContent
