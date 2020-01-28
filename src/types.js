const isFunc = (payload) => typeof payload === 'function';
const isObject = (payload) => typeof payload === 'object' && payload != null;

export { isFunc, isObject };
