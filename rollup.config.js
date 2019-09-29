import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const config = {
  input: './src/index.js',
  output: {
    name: 'react-overlay-trigger',
    file: './lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: [
    'react',
    'react-dom',
  ],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: false,
    }),
  ],
}

export default config
