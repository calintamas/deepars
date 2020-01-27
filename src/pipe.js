const pipe = (...funcs) => (value) =>
  funcs.reduce((currentValue, currentFunc) => currentFunc(currentValue), value);

export default pipe;
