const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

const languages = ['en', 'fa', 'id']
const defaultLanguage = 'en'

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              slug
              template
              title
              language
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges

  // Track blog posts per language for pagination
  const blogPostsPerLang = { en: 0, fa: 0, id: 0 }

  posts.forEach((post, index) => {
    const id = post.node.id
    const frontmatter = post.node.frontmatter

    // Detect language from frontmatter or file path
    let lang = frontmatter.language
    if (!lang) {
      const pathMatch = post.node.fileAbsolutePath.match(/\/content\/(\w+)\//)
      lang = pathMatch ? pathMatch[1] : defaultLanguage
    }

    // Calculate language prefix (no prefix for default language)
    const langPrefix = lang === defaultLanguage ? '' : `/${lang}`

    // Get previous/next posts (within same language)
    const sameLangPosts = posts.filter(p => {
      const pLang = p.node.frontmatter.language ||
        (p.node.fileAbsolutePath.match(/\/content\/(\w+)\//)?.[1]) ||
        defaultLanguage
      return pLang === lang && p.node.frontmatter.template === 'blog-post'
    })

    const currentIndex = sameLangPosts.findIndex(p => p.node.id === id)
    const previous = currentIndex === sameLangPosts.length - 1 ? null : sameLangPosts[currentIndex + 1]?.node
    const next = currentIndex === 0 ? null : sameLangPosts[currentIndex - 1]?.node

    createPage({
      path: `${langPrefix}${frontmatter.slug}`,
      component: path.resolve(
        `src/templates/${String(frontmatter.template)}.js`
      ),
      context: {
        id,
        language: lang,
        previous,
        next,
      },
    })

    // Count blog posts per language
    if (frontmatter.template === "blog-post") {
      blogPostsPerLang[lang] = (blogPostsPerLang[lang] || 0) + 1
    }
  })

  // Create blog-list pages for each language
  const postsPerPage = 9

  languages.forEach(lang => {
    const langPrefix = lang === defaultLanguage ? '' : `/${lang}`
    const blogPostsCount = blogPostsPerLang[lang] || 0
    const numPages = Math.ceil(blogPostsCount / postsPerPage) || 1

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${langPrefix}/blog` : `${langPrefix}/blog/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          language: lang,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // Add language field based on file path
    const pathMatch = node.fileAbsolutePath?.match(/\/content\/(\w+)\//)
    const language = pathMatch ? pathMatch[1] : defaultLanguage
    createNodeField({
      node,
      name: `language`,
      value: language,
    })
  }
}
