module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],
  webpack(config) {
    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos, models, hdrs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },
  exportPathMap: async function (defaultPathMap) {
    const pathsWithoutApiRoutes = Object.keys(defaultPathMap).filter(
      path => !path.startsWith('/api/')
    );

    const modifiedPathMap = pathsWithoutApiRoutes.reduce((pathMap, path) => {
      pathMap[path] = defaultPathMap[path];
      return pathMap;
    }, {});

    return modifiedPathMap;
  },
};
