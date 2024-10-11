module.exports = {
    extends: ['next', 'plugin:react/recommended', 'plugin:tailwindcss/recommended', 'prettier'],
    plugins: ['react', 'tailwindcss'],
    rules: {
      'react/react-in-jsx-scope': 'off', 
    },
  };
  