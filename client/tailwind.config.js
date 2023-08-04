/** @type {import('tailwindcss').Config} */
module.exports = {
    modules: {
        grid:true,
    },
    content: [
        "./public/index.html",
        "./src/scenes/Login/Login.jsx",
        ".src/styles/TopNav.jsx",
        ".src/scenes/Login/Form.jsx",
        ".src/scenes/units/index.jsx"
        
    ],
    theme: {
        
        extend: {},
    },
    plugins: [],
}