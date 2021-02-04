const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common.js");

module.exports = Merge(CommonConfig, {
    devtool: "hidden-source-map",
    mode: 'production',

    entry: {
        index: path.resolve(__dirname, 'src/index.tsx'),
        vendor: [
            "jquery",
            "jquery-validation",
            "bootstrap",
            "jquery-validation-unobtrusive"
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: __dirname + "/dist",
        // Making sure the CSS and JS files that are split out do not break the template cshtml.
        publicPath: "/dist/",
        // Defining a global var that can used to call functions from within ASP.NET Razor pages.
        library: "aspAndWebpack",
        libraryTarget: "var"
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
})