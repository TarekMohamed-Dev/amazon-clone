/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: '850px'
    },
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.btn': {
          cursor: 'pointer',
          position: 'relative',
          padding: '8px 10px',
          background: 'transparent',
          borderTopRightRadius: '0px',
          borderBottomLeftRadius: '0px',
          transition: 'all 1s',
        },
        '.btn:hover': {
          borderTopRightRadius: '0px',
          borderBottomLeftRadius: '0px',
        },
        '.btn:before, .btn:after': {
          content: "''",
          width: '0px',
          height: '0px',
          position: 'absolute',
          border: '0px solid #fff',
          transition: 'all 1s',
          opacity: '0',
        },
        '.btn:after': {
          top: '0px',
          left: '0px',
          borderTop: '1px solid white',
          borderLeft: '1px solid white',
        },
        '.btn:before': {
          bottom: '0px',
          right: '0px',
          borderBottom: '1px solid white',
          borderRight: '1px solid white',
        },
        '.btn:hover:before, .btn:hover:after': {
          width: '100%',
          height: '100%',
          opacity: '1',
          // border-color: white;
        },
      };

      addUtilities(newUtilities, ['hover']);
    },
  ],
  darkMode: "class"
})