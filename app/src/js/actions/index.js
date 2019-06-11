export const LOGIN_OFFICE = 'LOGIN_OFFICE'
export const LOGIN_COOKIE = 'LOGIN_COOKIE'
export const LOGIN_FINISHED = 'LOGIN_FINISHED'
export const FETCH_INFOS = 'FETCH_INFOS'
export const ADMIN_INFOS = 'ADMIN_INFOS';
export const DISCONNECT = 'DISCONNECT'
export const REFRESH = 'REFRESH';
export const CONTENT_CHANGE = 'CONTENT_CHANGE';
export const SUBMIT_MAKER = 'SUBMIT_MAKER';
export const CHANGE_PLAN = 'CHANGE_PLAN';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const MAKER_USER = 'MAKER_USER';

export function login(payload) {
  return function(dispatch) {
    return fetch(`api/login`, {
      accept: "application/json",
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "code": payload
      })
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: LOGIN_OFFICE,
        payload: {
          data: data,
          logged: true
        }
      });
    }).catch(function(error) {
      console.log("Error during login");
      dispatch({
        type: LOGIN_OFFICE,
        payload: {
          data: {},
          logged: false
        }
      });
    });
  }
}

export function loginCookie(payload) {
  return function(dispatch) {
    fetch(`api/logincookie`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload
      })
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: LOGIN_COOKIE,
        payload: {
          data: data,
          logged: true
        }
      });
    }).catch(function(error) {
      console.log("Error during cookie login");
      dispatch({
        type: LOGIN_COOKIE,
        payload: {
          data: {},
          logged: false
        }
      });
    })
  }
}

export function loginFinished(payload) {
  return { type: LOGIN_FINISHED, payload }
}

export function fetchInfos(payload) {
  return function(dispatch) {
    fetch(`api/infos`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload
      })
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_INFOS,
        payload: {
          data: data
        }
      })
    })
  }
}

export function fetchAdminInfos(payload) {
  return function(dispatch) {
    fetch(`api/admininfos`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload
      })
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: ADMIN_INFOS,
        payload: {
          data: data
        }
      })
    })
  } 
}

export function submitMakerAction(payload) {
  return function (dispatch) {
    fetch(`api/submitMaker`, {
      accept: 'application/json',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: SUBMIT_MAKER,
            payload: {
              error: data.error,
              loading: false,
            }
          })
    });
  }
}

export function disconnect() {
  return { type: DISCONNECT };
}

export function refresh() {
  return function(dispatch) {
    fetch(`api/refresh`, {
      accept: "application/json",
      method: "post"
    });
    return { type: REFRESH };
  }
}

export function changeContent(payload) {
  return { type: CONTENT_CHANGE, payload};
}

export function chosePlan(payload) {
  return function(dispatch) {
    fetch(`api/changeplan`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload.id,
        "plan": payload.plan
      })
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: CHANGE_PLAN,
        payload: {
          plan: data.plan
        }
      })
    })
  }
}

export function choseYear(payload) {
  return function(dispatch) {
    fetch(`api/changeyear`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload.id,
        "year": payload.year
      })
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: CHANGE_YEAR,
        payload: {
          year: payload.year
        }
      })
    })
  }
}

export function fetchMakerUserAction(payload) {
  //console.log(payload)
  return function(dispatch) {
    fetch(`api/fetch_maker_user`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": payload
      })
    })
        .then(response => response.json())
        .then((data) => {
          dispatch({
            type: MAKER_USER,
            payload: {
              data: data
            }
          })
        })
  }
}