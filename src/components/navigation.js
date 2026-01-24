/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import { Link } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import LanguageSwitcher from "./language-switcher"

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { language } = useI18next()
  const { t } = useTranslation()

  const langPrefix = language === 'en' ? '' : `/${language}`

  const MenuItems = [
    {
      path: `${langPrefix}/`,
      title: t('nav.home'),
    },
    {
      path: `${langPrefix}/about`,
      title: t('nav.about'),
    },
    {
      path: `${langPrefix}/blog`,
      title: t('nav.blog'),
    },
  ]

  const handleToggleClick = () => {
    setShowMenu(!showMenu)
  }

  const listMenuItems = MenuItems.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ))

  return (
    <nav className="site-navigation" sx={navStyle.menu}>
      <button
        aria-label={t('nav.toggleMenu', 'toggle menu')}
        onClick={handleToggleClick}
        className={"menu-trigger" + (showMenu ? " is-active" : "")}
      >
        <div className="icon-menu-line">
          <RiMenu3Line />
        </div>
        <div className="icon-menu-close">
          <RiCloseLine />
        </div>
      </button>
      <ul>
        {listMenuItems}
        <div sx={navStyle.border}></div>
        <div sx={navStyle.langSwitcher}>
          <LanguageSwitcher />
        </div>
      </ul>
    </nav>
  )
}

export default Navigation

const navStyle = {
  menu: {
    ul: {
      bg: "siteColor",
    },
  },
  langSwitcher: {
    display: ["block", "block", "block", "none"],
    p: "15px 20px",
  },
  border: {
    bg: "borderColor",
    borderTop: "1px solid transparent",
    display: ["block", "block", "block", "none"],
  },
}
