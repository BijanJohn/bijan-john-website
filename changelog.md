# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-31

### Added
- Internationalization (i18n) infrastructure with gatsby-plugin-react-i18next
- Support for English (default), Persian (fa), and Indonesian (id) languages
- RTL (right-to-left) support for Persian content
- Larger Persian font sizes for better readability (Vazirmatn font)
- Language switcher component in header and mobile navigation
- Bilingual content display components (side-by-side and alternating modes)
- Translation files for all UI strings in three languages
- Multi-language content folders (src/content/en/, fa/, id/)
- Netlify CMS collections for each language

### Changed
- Reorganized content structure into language-specific folders
- Updated gatsby-config.js with i18n plugin and language source filesystems
- Updated gatsby-node.js for language-aware page generation
- Updated all components to use translation hooks
- Updated templates to filter content by language
- Updated navigation with translated menu items

### Documentation
- Comment system options research document
- Domain alias setup guide (docs/bijanyoga-domain-setup.md)
