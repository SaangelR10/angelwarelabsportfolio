/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
                colormin: true,
                minifyFontValues: true,
                minifySelectors: true,
                mergeLonghand: true,
                mergeRules: true,
                minifyGradients: true,
                minifyParams: true,
                minifyTimingFunctions: true,
                orderedValues: true,
                reduceIdents: true,
                reduceInitial: true,
                reduceTransforms: true,
                uniqueSelectors: true,
                zindex: false,
              },
            ],
          },
        }
      : {}),
  },
}

export default config
