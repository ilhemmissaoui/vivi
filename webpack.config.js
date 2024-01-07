const Encore = require("@symfony/webpack-encore");
const path = require("path");

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("app", "./assets/index.js")
  .enableSingleRuntimeChunk()
  .enableVersioning() // enable versioning
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .configureBabel(null, (config) => {
    config.presets.push("@babel/preset-env", "@babel/preset-react");
  })
  .configureWatchOptions((watchOptions) => {
    watchOptions.aggregateTimeout = 200;
    watchOptions.poll = 1000;
  })

  .enableLessLoader((config) => {
    config.modules = true;
  })
  .enablePostCssLoader((options) => {
    options.postcssOptions = {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: ["last 2 versions", "> 1%", "IE 10"],
        }),
        require("cssnano")(),
      ],
    };
  })
  .addRule({
    test: /\.(woff2|woff|ttf|eot)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
      },
    },
  })
  .addRule({
    test: /\.(png|jpe?g|gif)$/i,
    type: "asset/resource",
    generator: {
      filename: "images/[name]-[hash][ext]",
    },
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024, // 4kb
      },
    },
  })
  .addRule({
    test: /\.svg$/,
    type: "asset/resource",
    generator: {
      filename: "images/[name]-[hash][ext]",
    },
  });

module.exports = Encore.getWebpackConfig();
