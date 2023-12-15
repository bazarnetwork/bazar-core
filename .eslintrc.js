module.exports = {
  root: true,
  parserOptions: {
    allowImportExportEverywhere: false,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  extends: ['lisk-base/ts'],
  env: {
    // browser: true,
    node: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
    '@typescript-eslint/member-delimiter-style': ['error', {
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }]
  },
};
