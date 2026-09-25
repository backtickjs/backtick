// Solid's preset ships without declarations.
declare module "babel-preset-solid" {
  const preset: import("@babel/core").PluginItem;
  export default preset;
}
