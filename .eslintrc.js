// .eslintrc.js
module.exports = {
    rules: {
        'react-hooks/exhaustive-deps': 'off', // Disables dependency warnings for useEffect
        'react/no-unescaped-entities': 'off', // Disables unescaped entities errors
        '@next/next/no-img-element': 'off', // Allows <img> tags instead of <Image />
    },
};
