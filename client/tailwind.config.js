const colors = require("tailwindcss/colors");
module.exports = {
    important: true,
    mode: "jit",
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            zIndex: {
                "-10": "-10",
                100: "100",
            },
            transitionDuration: ["hover", "focus"],
            screens: {
                xs: "500px",
            },
            maxHeight: {
                "3/4": "75%",
            },
            colors: {
                orange: colors.orange,
                teal: colors.teal,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};