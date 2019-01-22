import rollupConfig from '@ovh-ux/component-rollup-config';
import path from 'path';

const config = rollupConfig({
  input: 'src/index.js',
}, {
  lessTildeImporter: {
    paths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../../../node_modules'),
    ],
  },
});

const outputs = [config.es()];

if (process.env.BUILD === 'production') {
  outputs.push(config.cjs());
  outputs.push(config.umd());
}

export default outputs;
