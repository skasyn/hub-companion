export const LOGIN_OFFICE = 'LOGIN_OFFICE'
export const LOGIN_COOKIE = 'LOGIN_COOKIE'
export const LOGIN_FINISHED = 'LOGIN_FINISHED'
export const FETCH_INFOS = 'FETCH_INFOS'
export const DISCONNECT = 'DISCONNECT'
export const REFRESH = 'REFRESH';

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

export function disconnect() {
  return { type: DISCONNECT }
}

export function refresh() {
  return function(dispatch) {
    fetch(`api/refresh`, {
      accept: "application/json",
      method: "post"
    });
    return { type: REFRESH }
  }
}