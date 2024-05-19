'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // Limpia la carpeta dist en cada build
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    hot: true,
    watchFiles: ['src/**/*.html', 'src/**/*.scss'] // Verificar cambios en HTML y SCSS
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      inject: 'body' // Asegurarse de que los scripts sean inyectados en el cuerpo del HTML
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader' // Cargar archivos HTML
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Añade CSS al DOM inyectando la etiqueta <style>
          'css-loader', // Interpreta @import y url() como import/require()
          {
            loader: 'postcss-loader', // Procesa CSS con PostCSS
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          },
          'sass-loader' // Carga un archivo SASS/SCSS y lo compila a CSS
        ]
      },
      {
        test: /\.css$/, // Añadir soporte para archivos CSS
        use: [
          'style-loader', 
          'css-loader'
        ]
      }
    ]
  }
}
