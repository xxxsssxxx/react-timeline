module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ]
    }
  },
  webpack: {
    entry: ["babel-polyfill", "./src/index.ts"],
    output: {
      path: __dirname + "/src/build/",
      filename: "index.js"
    },
    resolve: {
      extensions: ["", ".js", ".jsx", ".tsx", ".ts"]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "babel",
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ["react", "es2015"]
          }
        }
      ]
    }
  }
};