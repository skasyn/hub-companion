import cookie from 'react-cookie';

import { LOGIN_OFFICE, LOGIN_COOKIE, LOGIN_FINISHED, FETCH_INFOS, DISCONNECT, REFRESH, CONTENT_CHANGE } from "../actions/index";

const initialState = {
  is_connected: false,
  name: '',
  mail: '',
  id: '',
  activities : [],
  points: {
    acculturation: 0,
    experimentation: 0,
    fruition: 0,
    sharing: 0
  },
  plan : {},
  error: '',
  content: 1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_OFFICE:
      if (action.payload.logged === true && action.payload.data.error === false) {
        let date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        document.cookie = "id = " + action.payload.data.id + "; expires = " + date.toString();
        window.history.pushState({}, document.title, "/");
        return Object.assign({}, state, {
          is_connected: true,
          name: action.payload.data.name,
          mail: action.payload.data.mail,
          id: action.payload.data.id
        });
      }
    break;

    case LOGIN_COOKIE:
      if (action.payload.logged === true) {
        return Object.assign({}, state, {
          is_connected: true,
          name: action.payload.data.name,
          mail: action.payload.data.mail,
          id: action.payload.data.id
        });
      }
    break;
    case LOGIN_FINISHED:
    break;

    case DISCONNECT:
      cookie.remove("id");
      return Object.assign({}, state, {
        is_connected: false,
        name: '',
        mail: '',
        id: '',
        activities : [],
        points: {
          acculturation: 0,
          experimentation: 0,
          fruition: 0,
          sharing: 0
        },
        plan : {},
        error: '',
        content: 1,
      });

    case REFRESH: 
    break;

    case FETCH_INFOS:
      return Object.assign({}, state, {
        activities: action.payload.data.events,
        points: {
          acculturation: action.payload.data.acculturation,
          experimentation: action.payload.data.experimentation,
          fruition: action.payload.data.fruition,
          sharing: action.payload.data.sharing
        },
        plan: action.payload.data.plan
      })

    case CONTENT_CHANGE:
      return Object.assign({}, state, {
        content: action.payload
      })

    default:
    break;
  }
  return state;
}

export default rootReducer;