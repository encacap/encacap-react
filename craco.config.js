const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/app/Constants"),
      "@slices": path.resolve(__dirname, "src/app/Slices"),
      "@selectors": path.resolve(__dirname, "src/app/Selectors"),
      "@interfaces": path.resolve(__dirname, "src/app/Types"),
      "@components": path.resolve(__dirname, "src/features/Common/Components"),
      "@hooks": path.resolve(__dirname, "src/features/Common/Hooks"),
      "@utils": path.resolve(__dirname, "src/features/Common/Utils"),
      "@common": path.resolve(__dirname, "src/features/Common"),
    },
  },
};
