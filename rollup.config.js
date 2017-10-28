import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const config = {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs',
  },
  external: [
    'react',
    'react-dom',
  ],
  sourcemap: true,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
}

export default config
