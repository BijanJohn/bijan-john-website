/** @jsx jsx */
import { jsx } from "theme-ui"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Link } from "gatsby"

const languageLabels = {
  en: 'EN',
  fa: 'فا',
  id: 'ID'
}

const LanguageSwitcher = () => {
  const { languages, language, originalPath } = useI18next()

  return (
    <div className="language-switcher" sx={switcherStyle.container}>
      {languages.map((lng) => (
        <Link
          key={lng}
          to={lng === 'en' ? originalPath : `/${lng}${originalPath}`}
          className={lng === language ? 'active' : ''}
          sx={switcherStyle.link}
        >
          {languageLabels[lng]}
        </Link>
      ))}
    </div>
  )
}

export default LanguageSwitcher

const switcherStyle = {
  container: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  link: {
    fontSize: '0.875rem',
    padding: '4px 8px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: 'text',
    transition: 'background-color 0.2s',
    '&:hover': {
      bg: 'muted',
    },
    '&.active': {
      bg: 'primary',
      color: 'white',
    },
  },
}
