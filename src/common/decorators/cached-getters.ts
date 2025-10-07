export const CachedGetters = <TYPE>(watchKey?: string) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!descriptor.get || typeof descriptor.get !== 'function') {
      throw new Error('O @Cached só pode ser aplicado em getters.');
    }

    const originalGetter = descriptor.get as () => TYPE;
    const cacheKey = `__cache_${propertyKey}`;
    const lastWatchedKey = `__last_${watchKey ?? 'none'}_${propertyKey}`;

    descriptor.get = function (this: Record<string, any>): TYPE {
      if (!watchKey) {
        if (Object.prototype.hasOwnProperty.call(this, cacheKey)) {
          return this[cacheKey];
        }
        const value = originalGetter.call(this) as TYPE;
        Object.defineProperty(this, cacheKey, { value, writable: true });
        return value;
      }

      const currentValue = this[watchKey];
      const lastValue = this[lastWatchedKey] as TYPE;

      if (lastValue === currentValue && Object.prototype.hasOwnProperty.call(this, cacheKey)) {
        return this[cacheKey];
      }

      const value = originalGetter.call(this) as TYPE;
      Object.defineProperty(this, cacheKey, { value, writable: true });
      Object.defineProperty(this, lastWatchedKey, { value: currentValue, writable: true });

      return value;
    };
  };
};
