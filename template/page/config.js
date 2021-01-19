module.exports = {
  name: "空页面",
  type: "page",
  previewImg: "preview.png",
  files: [
    {
      filename: (option, { changeCase: { paramCase } }) => `${paramCase(option.name)}/index.js`,
      template: "index.js",
    },
    {
      filename: (option, { changeCase: { pascalCase, paramCase } }) => `${paramCase(option.name)}/${pascalCase(option.name)}Page.js`,
      template: "Page.js",
    },
    {
      filename: (option, { changeCase: { pascalCase, paramCase } }) => `${paramCase(option.name)}/${pascalCase(option.name)}Page.less`,
      template: "Page.less",
    },
  ],
};
