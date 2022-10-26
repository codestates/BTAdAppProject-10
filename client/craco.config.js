const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    babel: {
        presets: [],
        plugins: [
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-syntax-optional-chaining',
            "@babel/plugin-proposal-numeric-separator"
        ],
        loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
    },
};
