---
---

# Getting Started

**Toast is not a framework**. Toast is a theme loaded up with all of the fixins, designed to make the setup & configuration process easy and painless. _However_, Toast does not do a lot of the actual work for you. It's unbiased in it's configuration outside of it's architecture and lets' you have full control over your WordPress Theme development.

## Dependencies

- **[Timber](https://timber.github.io/docs/)**
- **[Composer](https://getcomposer.org/)**
- Node >=8.0


## Configuration

Ensure that you update the `config.js` at the root of the installation with the url that you would like Browserify to watch for.

### Available Commands

- `npm start` watches the build repository during development.
- `npm run build` compiles a compressed and minified version of the theme into the `/build` directory.

### Plugins that Work Well with Toast

- [CMB2](https://cmb2.io/) or [Advanced Custom Fields](https://www.advancedcustomfields.com/)
- [WP Debug Bar](https://wordpress.org/plugins/debug-bar/)
