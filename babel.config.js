module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
          '@constants': './src/utils',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
