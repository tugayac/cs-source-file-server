var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var _root = path.resolve(__dirname);

/**
 * Converts relative paths to absolute paths.
 *
 * For example, a call like root('src/main/js', 'app'), will be converted to:
 * /Users/username/Documents/SomeDirectory/src/main/js/app
 * Where, "/Users/atugay/Documents/SomeDirectory" is considered to be the root of any given relative path
 */
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: './www',
  output: {
    path: root('build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      root('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015'] } },
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015'] } }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public', to: 'public' }
    ])
  ],
  target: 'node',
  node: {
    // https://github.com/webpack/webpack/issues/1599
    __dirname: false,
    __filename: false
  }
};