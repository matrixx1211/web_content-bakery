# Content Bakery web

## Korekce

1. korekce - 19. 6. 2024

-[x] hlavní titulek
  - zmenšit fornt cca o 15% 
  - duration 2,8x
-[x] na úplným začátku to roztočený logo ne
-[x] logo vlevo nahoře 
  - zmenšit o 20% 
  - bez nájezdu jen vylnutí 
  - jde jako první
-[x] menu vpravo 
  - řádky blíž u sebe viz XD 
  - zmenšit o 30% 
  - duration 1,5x 
  - jednotlivé řádky vůči sobě se zpožděním třeba 0,1s
-[x] fotky 
  - vylmnutím na pozicích viz XD 
  - cca v čase kdy jde Menu a „01“ číslo stránky


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
