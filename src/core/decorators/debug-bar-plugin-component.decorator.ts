import 'reflect-metadata';

// export function DebugBarAddon(config: any) {
//   return (target: Function) => {
//     createProperty(target, 'debugBarAddonName', config.name);
//     createProperty(target, 'debugBarAddonIcon', config.icon);
//     // createProperty(target, 'debugBarAddonInstantiated', false);
//     createProperty(target, 'debugBarAddonIsVisible', false);
//   }

//   function createProperty(target, propName: string, value: any) {
//     const valueConfig = {
//       enumerable: true,
//       writable: true,
//       value: value
//     };
//     Reflect.defineProperty(target.prototype, propName, valueConfig);
//   }
// }
export function DebugBarPluginComponent(target: Function) {
  Reflect.defineProperty(target.prototype, 'isVisible', {
    enumerable: true,
    writable: true,
    value: true
  });
}
