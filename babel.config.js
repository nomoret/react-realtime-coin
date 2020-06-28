module.exports = {
  presets: [
    [
      // "@babel/preset-env",
      // {
      //   targets: {
      //     chrome: "79",
      //     ie: "11",
      //   },
      //   useBuiltIns: "usage",
      //   corejs: {
      //     version: 2,
      //   },
      // },
      "@babel/preset-react",
    ],
  ],
  plugins: ["react-hot-loader/babel"],
};
