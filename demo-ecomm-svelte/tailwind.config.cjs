module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'svelteOrange': '#FF3E00',
        'svelteDark': '#F03A00',
        'hotPink': '#FF1966',
        'dark': '#111111',
        'light': '#FAFAFA',
        'tbHeaderBlue': '#25283d',
        'tbTextGrey': '#3f4154',
        'tbTextLightGrey': '#717380',
      },
    }
  },
  plugins: []
};
