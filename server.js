/*eslint-env node */
"use strict";

require("babel/polyfill");

var path =              require("path"),
    webpack =           require("webpack"),
    config =            require("./webpack.config"),
    DevServer =         require("webpack-dev-server"),
    minimist =          require("minimist");

var argv = minimist(process.argv.slice(2));
var dist = path.join(process.cwd(), "/dist");

// options
var port = argv.port || 8888;

var devServer = new DevServer(webpack(config), {
    contentBase: dist,
    hot: true,
    historyApiFallback: true
});


devServer.listen(port);
