module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
          proproasls: true,
        },
        shippedProposals: true,
        modules: false,
        loose: true,
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: ["react-hot-loader/babel"],
};
