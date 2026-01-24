/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation"
import LanguageSwitcher from "./language-switcher"

import "../assets/scss/style.scss"
import Footer from "./footer"

// Theme toggle removed - using light mode only
import Search from "../components/search"

// RTL languages
const rtlLanguages = ['fa']

// Add Netlify Identity Widget
if (typeof window !== "undefined") {
  require("netlify-identity-widget")
}

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    siteSearchIndex {
      index
    }
  }
`

const Layout = ({ children, className, props }) => {
  const { site, siteSearchIndex } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata
  const { language } = useI18next()
  const isRTL = rtlLanguages.includes(language)

  return (
    <div className="primary-container" dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
      <Header>
        <Logo title={siteTitle} />
        <div sx={layoutStyle.nav}>
          <div sx={{ display: ["flex", "flex", "flex", "none"] }}>
            <Search searchIndex={siteSearchIndex.index} />
          </div>
          <Navigation />
        </div>
        <div sx={layoutStyle.appearance}>
          <Search searchIndex={siteSearchIndex.index} />
          <LanguageSwitcher />
        </div>
      </Header>
      <main className={"container " + className}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

const layoutStyle = {
  appearance: {
    display: ["none", "none", "none", "flex"],
    alignItems: "center",
    gap: 4,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
}
