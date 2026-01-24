/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { FiMoon, FiSun } from "react-icons/fi"

const Theme = () => {
  const [colorMode, setColorMode] = useColorMode()
  const { t } = useTranslation()

  return (
    <div sx={themeStyles.modeOption}>
      <button
        onClick={e => {
          setColorMode(colorMode === "default" ? "dark" : "default")
        }}
        aria-label={t('theme.toggle')}
      >
        <div sx={themeStyles.modeIcons}>
          <div>{colorMode === "default" ? <FiMoon /> : <FiSun />}</div>
          <div sx={themeStyles.modeText}>
            {colorMode === "default" ? t('theme.dark') : t('theme.light')}
          </div>
        </div>
      </button>
    </div>
  )
}
export default Theme

const themeStyles = {
  modeOption: {
    button: {
      fontSize: "25px",
      bg: "transparent",
      border: "none",
      cursor: "pointer",
      mt: "-5px",
      p: "0 20px 0 0",
      "&:hover": {
        color: "#bea9b3",
      },
    },
  },
  modeIcons: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    mt: "10px",
  },
  modeText: {
    fontSize: "16px",
    display: ["block", "block", "block", "none"],
    p: " 0 10px",
    mt: "-5px",
    letterSpacing: "1px",
  },
}
