export type PreservedOmit<T, K extends keyof T> = {
  [Property in keyof T as Exclude<Property, K>]: T[Property];
};
