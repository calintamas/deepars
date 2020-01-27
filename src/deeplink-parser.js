import pipe from './pipe';
import { isFunc, isObject } from './types';
import { lowercase } from './arr';

const getKeys = (obj) => Object.keys(obj);
const findKey = (lookupObj) => (arr) => arr.find((key) => !!lookupObj[key]);
const getValue = (lookupObj) => (key) => lookupObj[key];

const DeeplinkParser = {
  routes: {},

  config: (routes = {}) => {
    DeeplinkParser.routes = routes;
  },

  parse: (payload = {}) => {
    if (!isObject(payload)) {
      return {};
    }

    const { routes } = DeeplinkParser;

    // Find the key that is used to config the route
    const routeConfig = pipe(
      getKeys,
      lowercase,
      findKey(routes),
      getValue(routes)
    )(payload);

    // Generate navigation action
    const { routeName, params } = routeConfig;

    let navigationAction = {
      routeName: isFunc(routeName) ? routeName(payload) : routeName
    };

    if (params) {
      navigationAction.params = isFunc(params) ? params(payload) : params;
    }

    if (__DEV__) {
      console.log('(DeeplinkParser) navigationAction:', navigationAction);
    }

    return navigationAction;
  }
};

export default DeeplinkParser;
