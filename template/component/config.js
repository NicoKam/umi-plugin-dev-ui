module.exports = {
  name: "空组件",
  type: "component",
  previewImg: "preview.png",
  files: [
    {
      filename: (option, { changeCase: { pascalCase } }) => `${pascalCase(option.name)}/index.js`,
      template: "index.js",
    },
    {
      filename: (option, { changeCase: { pascalCase } }) => `${pascalCase(option.name)}/${pascalCase(option.name)}.js`,
      template: "Component.js",
    },
    {
      filename: (option, { changeCase: { pascalCase } }) => `${pascalCase(option.name)}/${pascalCase(option.name)}.less`,
      template: "Component.less",
    },
  ],
};
