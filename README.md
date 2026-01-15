# Just Another Engineer

A comprehensive cheatsheet website for DevOps, SysAdmin, SRE, and Engineering topics including AWS, Linux utilities, Terraform, Packer, databases, infrastructure management, Vault, Consul, and more.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jae-labs/pages.git
   cd pages
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

## Running Locally

To start the development server:

```bash
yarn start
```

This will start the server on `http://localhost:3000` and open it in your browser. The site will automatically reload when you make changes.

## Building

To build the site for production:

```bash
yarn build
```

The built files will be in the `build` directory.

## Serving the Built Site

To serve the built site locally:

```bash
yarn serve
```

## Deploying

This site is configured for deployment to GitHub Pages. To deploy:

```bash
yarn deploy
```

This will build the site and push it to the `gh-pages` branch.

## Upgrading Docusaurus

To upgrade Docusaurus to the latest version:

1. Check the [Docusaurus migration guide](https://docusaurus.io/docs/migration) for any breaking changes.

2. Update the dependencies:
   ```bash
   yarn upgrade @docusaurus/core @docusaurus/preset-classic @docusaurus/plugin-content-docs @docusaurus/theme-search-algolia
   ```

3. If upgrading to a major version (e.g., v2 to v3 or v3 to v4):
   - Manually update the version numbers in `package.json` for all `@docusaurus/` packages to the target major version.
   - Update related dependencies as required (e.g., React to v18, MDX to v3 for v3 upgrades).
   - Update the Node.js engine requirement in `package.json` if specified.
   - Run `yarn install` to install the updated packages.
   - Follow any specific migration steps in the guide, such as running migration scripts or updating configuration files.
   - Check for MDX-related breaking changes, as major versions often include MDX upgrades.

4. Test the site locally after upgrading.

## Making Changes

### Adding Documentation

1. Add new `.md` or `.mdx` files to the `docs/` directory.
2. Update `sidebars.js` to include the new documents in the sidebar.
3. For images, place them in the `static/img/` directory.

### Modifying the Theme

- Edit files in `src/components/` for custom components.
- Modify `src/css/custom.css` for custom styles.
- Use `yarn swizzle` to eject and customize Docusaurus components.

### Configuration

- Edit `docusaurus.config.js` for site configuration.
- Update `babel.config.js` if needed for custom Babel configuration.

After making changes:

1. Test locally with `yarn start`.
2. Build with `yarn build`.
3. Commit and push your changes.
4. Deploy with `yarn deploy`.

## Contributing

Contributions are welcome! Please see the [Contributing Guide](https://justanother.engineer/contributing) for details.

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
