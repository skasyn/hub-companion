// import { LOGIN_OFFICE, LOGIN_COOKIE, LOGIN_FINISHED, FETCH_INFOS, DISCONNECT} from "../actions/index";

export function companionMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // if (action.type === LOGIN_OFFICE) {
      // }
      return next(action);
    }
  }
}