import cookie from 'react-cookie';

import {
  LOGIN_OFFICE,
  LOGIN_COOKIE,
  LOGIN_FINISHED,
  FETCH_INFOS,
  DISCONNECT,
  REFRESH,
  CONTENT_CHANGE,
  CHANGE_PLAN,
  CHANGE_YEAR,
  ADMIN_INFOS,
  SUBMIT_MAKER,
  MAKER_USER
} from "../actions/index";

const initialState = {
  is_connected: false,
  name: '',
  mail: '',
  id: '',
  activities : [],
  received_activities: false,
  received_makers: false,
  points: {
    acculturation: 0,
    experimentation: 0,
    fruition: 0,
    sharing: 0
  },
  year: 0,
  plan : {},
  error: '',
  content: 1,
  privilege: 0,
  makers: [],
  sharings : [],
  users: [],
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
      return Object.assign({}, state, initialState);

    case REFRESH: 
    break;

    case FETCH_INFOS:
      return Object.assign({}, state, {
        activities: action.payload.data.events,
        received_activities: (action.payload.data.privilege === 0 ? true : false),
        points: {
          acculturation: action.payload.data.acculturation,
          experimentation: action.payload.data.experimentation,
          fruition: action.payload.data.fruition,
          sharing: action.payload.data.sharing
        },
        plan: action.payload.data.plan,
        year: action.payload.data.year,
        privilege: action.payload.data.privilege,
      })
    
    case ADMIN_INFOS:
      return Object.assign({}, state, {
        received_activities: true,
        makers: action.payload.data.makers,
        users: action.payload.data.users
      })

    case MAKER_USER:
      return Object.assign({}, state, {
        received_makers: true,
        makers: action.payload.data.makers,
      })

    case CONTENT_CHANGE:
      return Object.assign({}, state, {
        content: action.payload
      })

    case CHANGE_PLAN:
      return Object.assign({}, state, {
        plan: action.payload.plan
      })

    case CHANGE_YEAR:
      return Object.assign({}, state, {
        year: action.payload.year
      })

    case SUBMIT_MAKER:
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: action.payload.loading,
        received_makers: false,
      })

    default:
    break;
  }
  return state;
}

export default rootReducer;