export const trim = <T>(value: T) => (typeof value === 'string' ? value.trim() : value);
