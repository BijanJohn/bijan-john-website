/** @jsx jsx */
import { jsx } from "theme-ui"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer
      className="site-footer"
      sx={{
        bg: "siteColor",
      }}
    >
      <div className="container">
        <p>
          {t('footer.madeWith')}{" "}
          <span className="icon -love">
            <RiHeart2Line />
          </span>{" "}
        </p>
      </div>
    </footer>
  )
}

export default Footer
