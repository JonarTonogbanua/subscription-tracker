module.exports = {
  mode: 'jit',
  // purge: [
  //   './public/**/*.html',
  //   './src/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      header: ["Nunito"],
      body: ["Nunito"],
    },
    extend: {
      fontFamily: {
        sans: ["Nunito"],
      },
      colors: {
        primary: "#242b2b",
        secondary: "#0e1111",
        accent: "#3c444b",
      }
    },
  },
  plugins: [],
}
