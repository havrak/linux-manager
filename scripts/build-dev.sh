export NODE_ENV=development

webpack --mode=development --config ./client/config/webpack.dev.config.js

unset NODE_ENV
