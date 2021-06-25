var path = require("path");
const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
      }),
      // add an alias for "our" imports
      addWebpackAlias({
        "@apis": path.resolve(__dirname, "src/apis"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config"),
        "@containers": path.resolve(__dirname, "src/containers"),
        "@contexts": path.resolve(__dirname, "src/contexts"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@lib": path.resolve(__dirname, "src/library"),
        "@redux": path.resolve(__dirname, "src/redux"),
      })
    )(config, env)
  );
};
