# Deprecation Warnings to Address

These are non-blocking deprecation warnings that should be addressed in future updates. None of them currently affect the build or functionality.

---

## 1. Sass @import Deprecation

**Warning:**
```
Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
```

**Affected files:**
- `src/assets/scss/style.scss`

**Current syntax:**
```scss
@import "theme-variables";
@import "defaults";
@import "lib/css-grid-utility";
@import "rtl";
@import "persian";
```

**Required fix:**
Migrate from `@import` to `@use/@forward` syntax. This requires:
1. Converting all `@import` statements to `@use`
2. Updating variable/mixin references to use namespaces (e.g., `variables.$primary-color`)
3. Using `@forward` for files that re-export variables/mixins

**Resources:**
- https://sass-lang.com/documentation/at-rules/use
- https://sass-lang.com/d/import

**Priority:** Low (Sass 3.0 not yet released)

---

## 2. tracedSVG Plugin Option

**Warning:**
```
"tracedSVG" plugin option for "gatsby-remark-images" is no longer supported.
Blurred placeholder will be used.
```

**Affected file:**
- `gatsby-config.js` (gatsby-remark-images configuration)

**Required fix:**
Remove the `tracedSVG` option from gatsby-remark-images configuration if present, or update to use supported placeholder options.

**Priority:** Low (already using fallback)

---

## 3. gatsby-plugin-react-helmet

**Warning:**
```
gatsby-plugin-react-helmet: Gatsby now has built-in support for modifying the document head.
```

**Affected files:**
- `gatsby-config.js`
- `src/components/seo.js`
- Any component using `react-helmet`

**Required fix:**
Migrate from `react-helmet` to Gatsby's built-in Head API:
1. Remove `gatsby-plugin-react-helmet` from gatsby-config.js
2. Replace `<Helmet>` components with Gatsby's `<Head>` export
3. Update SEO component to use the new API

**Resources:**
- https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/

**Priority:** Medium (when upgrading Gatsby)

---

## 4. Babel isModuleDeclaration

**Warning:**
```
`isModuleDeclaration` has been deprecated, please migrate to `isImportOrExportDeclaration`
```

**Source:**
- `babel-plugin-lodash` (dependency)

**Required fix:**
This is an internal warning from `babel-plugin-lodash`. Options:
1. Wait for `babel-plugin-lodash` to release an update
2. Consider removing the plugin if not needed
3. Pin to a newer version when available

**Priority:** Low (internal dependency, doesn't affect build)

---

## 5. gatsby-plugin-manifest defaultMode

**Warning:**
```
Warning: there are unknown plugin options for "gatsby-plugin-manifest": defaultMode
```

**Affected file:**
- `gatsby-config.js`

**Required fix:**
Remove the `defaultMode` option from gatsby-plugin-manifest configuration, or check if it's been renamed in the current version.

**Priority:** Low (warning only)

---

## When to Address

These warnings should be addressed when:
- Upgrading to Gatsby 5 (helmet, head API changes)
- Upgrading to Sass/Dart Sass 3.0 (import syntax)
- Doing a major dependency update

For now, all warnings are informational and the site builds/runs correctly.

---

*Last updated: 2026-01-05*
