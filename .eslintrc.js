module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:solid/typescript",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "solid",
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": [
            "error",
            "smart",
        ],
        "curly": [
            "warn",
            "multi-line",
        ],
        "no-confusing-arrow": [
            "error",
        ],
        "sort-imports": [
            "warn", {
                ignoreDeclarationSort: true,
            }
        ],
        "prefer-template": [
            "warn",
        ],
        "prefer-const": [
            "warn", {
                destructuring: "all",
            }
        ],
        "prefer-arrow-callback": [
            "warn"
        ],
        "no-duplicate-imports": [
            "warn"
        ],
        "unicode-bom": [
            "error"
        ],
    }
};
