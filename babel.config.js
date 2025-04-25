const ReactCompilerConfig = {
  /* ... */
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@store': './src/store',
          '@slice': './src/slice',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@signals': './src/signals',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
