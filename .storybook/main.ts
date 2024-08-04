const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: (config) => {
    // Find the existing rule for CSS files
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    // Modify the CSS rule to use PostCSS loader
    cssRule.use.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['tailwindcss', 'autoprefixer']
        }
      }
    });

    return config;
  }
};
