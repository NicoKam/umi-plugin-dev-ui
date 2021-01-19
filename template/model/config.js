module.exports = {
  name: "空Model",
  type: "model",
  previewImg: "preview.png",
  files: [
    {
      filename: (option, { changeCase: { camelCase } }) => `${camelCase(option.name)}.js`,
      template: "model.js",
    },
  ],
};
