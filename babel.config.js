module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { modules: false }],
      ['@babel/preset-react', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};