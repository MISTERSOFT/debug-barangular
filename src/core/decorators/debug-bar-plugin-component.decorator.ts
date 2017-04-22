import 'reflect-metadata';

export function DebugBarPluginComponent(target: Function) {
  Reflect.defineProperty(target.prototype, 'isVisible', {
    enumerable: true,
    writable: true,
    value: true
  });
}
