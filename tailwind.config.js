/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'blue-600': '#1E3A8A',
        'blue-700': '#3B82F6',
        'blue-800': '#1E40AF',
        'blue-900': '#1E3A8A',
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
        'gray-600': '#4B5563',
      },},
  },
  plugins: [],
}