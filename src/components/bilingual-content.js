/** @jsx jsx */
import { jsx } from "theme-ui"

const BilingualContent = ({ persian, romanized, mode }) => {
  if (mode === 'persian') {
    return (
      <div className="persian-only" lang="fa" sx={contentStyle.persian}>
        {persian}
      </div>
    )
  }

  if (mode === 'romanized') {
    return (
      <div className="romanized-only" sx={contentStyle.romanized}>
        {romanized}
      </div>
    )
  }

  if (mode === 'columns') {
    return (
      <div className="bilingual-columns" sx={contentStyle.columns}>
        <div className="col-persian" lang="fa" sx={contentStyle.colPersian}>
          {persian}
        </div>
        <div className="col-romanized" sx={contentStyle.colRomanized}>
          {romanized}
        </div>
      </div>
    )
  }

  if (mode === 'alternating') {
    return (
      <div className="bilingual-alternating" sx={contentStyle.alternating}>
        <div className="line-persian" lang="fa" sx={contentStyle.linePersian}>
          {persian}
        </div>
        <div className="line-romanized" sx={contentStyle.lineRomanized}>
          {romanized}
        </div>
      </div>
    )
  }

  // Default to columns
  return (
    <div className="bilingual-columns" sx={contentStyle.columns}>
      <div className="col-persian" lang="fa" sx={contentStyle.colPersian}>
        {persian}
      </div>
      <div className="col-romanized" sx={contentStyle.colRomanized}>
        {romanized}
      </div>
    </div>
  )
}

export default BilingualContent

const contentStyle = {
  persian: {
    textAlign: 'right',
    direction: 'rtl',
    fontSize: '1.3em',
    lineHeight: 2,
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
  },
  romanized: {
    fontSize: '1.1em',
    lineHeight: 1.8,
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
    gap: 4,
    mb: 4,
  },
  colPersian: {
    textAlign: 'right',
    direction: 'rtl',
    fontSize: '1.3em',
    lineHeight: 2,
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
    order: [1, 1, 0], // Persian first on desktop, after on mobile
  },
  colRomanized: {
    fontSize: '1em',
    lineHeight: 1.8,
    color: 'gray',
  },
  alternating: {
    mb: 4,
  },
  linePersian: {
    textAlign: 'right',
    direction: 'rtl',
    fontSize: '1.3em',
    lineHeight: 2,
    fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif",
  },
  lineRomanized: {
    color: 'gray',
    fontStyle: 'italic',
    mb: 4,
    fontSize: '0.95em',
  },
}
