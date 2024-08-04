export function setReadOnlyProperty(object: any, property: any, value: any) {
  Object.defineProperty(object, property, {
    value,
    configurable: true
  });
}
