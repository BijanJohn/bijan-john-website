/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

export default function BlogListHome(props) {
  const { language } = useI18next()
  const langPrefix = language === 'en' ? '' : `/${language}`

  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} langPrefix={langPrefix} />)

  return <PostMaker data={posts} langPrefix={langPrefix} />
}

const PostMaker = ({ data, langPrefix }) => {
  const { t } = useTranslation()

  return (
    <section className="home-posts">
      <h2>
        {t('blog.latest')} <strong>{t('nav.blog')}</strong>{" "}
        <span className="icon -right">
          <RiArrowDownLine />
        </span>
      </h2>
      <div className="grids col-1 sm-2 lg-3">{data}</div>
      <Link
        className="button"
        to={`${langPrefix}/blog`}
        sx={{
          variant: "variants.button",
        }}
      >
        {t('blog.seeMore')}
        <span className="icon -right">
          <RiArrowRightSLine />
        </span>
      </Link>
    </section>
  )
}
