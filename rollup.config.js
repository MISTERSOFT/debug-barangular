export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/debugbarangular.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.debugbarangular',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/router': 'ng.router',
    '@angular/http': 'ng.http',
    'rxjs/Observable': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
  }
}
