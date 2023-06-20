/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { ProvidePlugin, DefinePlugin, EnvironmentPlugin } = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const fileEnv = dotenv.config({ path: `./env.development` }).parsed || {};

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  const config = {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    entry: ['./src/index.tsx'],
    output: {
      filename: 'static/js/main.[contenthash:6].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction
                  ? 'static/media/[name].[contenthash:6].[ext]'
                  : '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction
                  ? 'static/fonts/[name].[ext]'
                  : '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public', 'index.html'),
        serveIndex: true,
        watch: true,
      },
      open: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'static/css/[name].[contenthash:6].css'
          : '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: './public/favicon.ico',
        filename: 'index.html',
        manifest: './public/manifest.json',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            filter: name => {
              return !name.endsWith('index.html');
            },
          },
        ],
      }),
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new Dotenv({
        path: `./.env.${argv.mode}`,
      }),
    ],
  };
  return config;
};
