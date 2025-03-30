const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', // Use production mode to avoid eval
  entry: {
    popup: './src/popup.js',
    background: './background.js',
    contentScript: './contentScript.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // This is important for Chrome extensions
  devtool: 'cheap-source-map', // Avoid using eval
  optimization: {
    // Avoid using eval
    minimize: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' },
        { from: 'popup.html', to: '.' },
        { from: 'popup.css', to: '.' },
        { from: 'icons', to: 'icons' }
      ],
    }),
  ],
};