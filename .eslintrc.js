module.exports = {
    extends: [
        "plugin:vue/base",
        "eslint:recommended",
        "@vue/airbnb",
        "plugin:jest/recommended",
        "@vue/prettier",
    ],
    plugins: ["prettier", "simple-import-sort", "jest"],
    rules: {
        "prettier/prettier": "error",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "import/no-named-as-default": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
            },
        ],
    },
    settings: { "import/extensions": [".js", ".jsx"] },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 8,
        sourceType: "module",
    },
};
