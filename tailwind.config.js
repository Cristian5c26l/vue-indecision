/** @type {import('tailwindcss').Config} */

import tailwindcssanimatedplugin from 'tailwindcss-animated';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssanimatedplugin],
};
