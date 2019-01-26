import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const config = {
  input: './src/index.js',
  output: {
    name: 'reactip',
    file: './lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: [
    'react',
    'react-dom',
    '@emotion/core',
  ],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: false,
    }),
  ],
}

export default config
