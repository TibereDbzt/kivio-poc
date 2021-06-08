const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  root: path.join(__dirname, '/'),
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
};

let config = {

  mode: 'development',

  entry: './src/scripts/main.js',

  output: {
    path: PATHS.dist,
    filename: 'scripts/main.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: [":src"]
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /favicon\.ico$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'assets/medias/[hash]-[name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:6].[ext]',
              emitFile: true,
              enforce: 'pre',
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              },
            },
          },
        ],
      },
      {
        test: /\.(mov|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/medias/',
          esModule: false,
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              esModule: false,
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
};

module.exports = config
