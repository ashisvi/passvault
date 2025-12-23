/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  // Your custom options.
};

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["react-native-worklets/plugin", workletsPluginOptions]],
};
