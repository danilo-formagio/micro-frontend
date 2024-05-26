const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const pkg = require("./package.json");
const deps = pkg.dependencies;

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              ["@babel/preset-typescript", { allowNamespaces: true }],
              "@babel/preset-env",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "MicroFrontend1",
      filename: "remoteEntry.js",
      exposes: {
        "./Component": "./src/Component",
      },
      shared: {
        ...deps,
        react: { singleton: true,  eager: true, requiredVersion: deps.react },
        "react-dom": { singleton: true,  eager: true, requiredVersion: deps["react-dom"] },
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    host: "localhost",
    historyApiFallback: true,
    port: 3001,
    open: true,
    hot: true,
  },
};
