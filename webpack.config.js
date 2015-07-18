/*eslint-env node */
"use strict";

var webpack = require("webpack");
var autoprefixer = require("autoprefixer-core");

var envPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
  }
});
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var babelConfig = "babel?stage=0&optional=runtime";
var cssParams = "css?modules&localIdentName=[local]___[hash:base64:5]";

module.exports = {
    entry: ["webpack/hot/dev-server", "./src/index.js"],
    output: {
        filename: "main.js",
        path: process.cwd() + "/dist",
        publicPath: "/"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: babelConfig},
            {test: /\.jsx$/, loaders: ["react-hot", babelConfig] },
            {test: /\.css$/, loaders: ["style", cssParams, "postcss"]},
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.html$/, loader: "raw"}
        ]
    },
    postcss: {
        defaults: [autoprefixer]
    },
    plugins: [
        envPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin("shared.js")
    ],
    resolve: {
        extensions: ["", ".js", ".json", ".jsx"],
        modulesDirectories: ["node_modules", "src"]
    }
};
