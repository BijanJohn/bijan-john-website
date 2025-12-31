/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import Layout from "../components/layout"
import PostCard from "../components/post-card"
import Seo from "../components/seo"

const styles = {
  pagination: {
    a: {
      color: "muted",
      "&.is-active": {
        color: "text",
      },
      "&:hover": {
        color: "text",
      },
    },
  },
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $language: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { template: { eq: "blog-post" } }
        fields: { language: { eq: $language } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
            }
          }
        }
      }
    }
  }
`

const Pagination = ({ isFirst, prevPage, numPages, blogSlug, currentPage, isLast, nextPage, t }) => (
  <div className="pagination" sx={styles.pagination}>
    <ul>
      {!isFirst && (
        <li>
          <Link to={prevPage} rel="prev">
            <span className="icon -left">
              <RiArrowLeftLine />
            </span>{" "}
            {t('blog.previous')}
          </Link>
        </li>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link
            to={`${blogSlug}${i === 0 ? "" : i + 1}`}
            className={currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!isLast && (
        <li>
          <Link to={nextPage} rel="next">
            {t('blog.next')}{" "}
            <span className="icon -right">
              <RiArrowRightLine />
            </span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const BlogIndex = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { currentPage, numPages, language } = pageContext

  const langPrefix = language === 'en' ? '' : `/${language}`
  const blogSlug = `${langPrefix}/blog/`

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? blogSlug : blogSlug + (currentPage - 1).toString()
  const nextPage = blogSlug + (currentPage + 1).toString()

  const posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} langPrefix={langPrefix} />)

  return (
    <Layout className="blog-page">
      <Seo
        title={`${t('nav.blog')} — Page ${currentPage} of ${numPages}`}
        description={`Blog page ${currentPage} of ${numPages}`}
      />
      <h1>{t('nav.blog')}</h1>
      <div className="grids col-1 sm-2 lg-3">{posts}</div>
      <Pagination
        isFirst={isFirst}
        prevPage={prevPage}
        numPages={numPages}
        blogSlug={blogSlug}
        currentPage={currentPage}
        isLast={isLast}
        nextPage={nextPage}
        t={t}
      />
    </Layout>
  )
}

export default BlogIndex
