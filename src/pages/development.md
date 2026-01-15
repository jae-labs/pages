# Development

## MacOS

### Install prerequisites

Install `Homebrew` if not yet installed:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install `nvm` via Homebrew if not yet installed:
```
brew install nvm
```

Install NodeJS, Yarn and run Yarn install to install required packages:
```
nvm install && nvm use && npm install -g yarn && yarn install
```

### Build and run local web server(watch mode)

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.
```
yarn install && yarn start
```

### Build assets only


This command generates static content into the `build` directory and can be served using any static contents hosting service. 
```
yarn install && yarn build
```

### Upgrading

This command upgrades several Docusaurus components to their latest available version:
```
yarn upgrade \
@docusaurus/core@latest \
@docusaurus/preset-classic@latest \
@docusaurus/theme-search-algolia@latest \
@docusaurus/plugin-google-analytics \
@docusaurus/plugin-google-analytics@latest
```
