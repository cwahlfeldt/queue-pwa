module.exports = {
  modules: false,
  plugins: [
    //require('postcss-easy-import'),
    require('postcss-preset-env'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
  ]
}
