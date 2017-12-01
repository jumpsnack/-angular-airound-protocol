export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-airound-protocol.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng-airound-protocol',
    globals: {
      '@angular/core': 'ng.core',
    }
  }