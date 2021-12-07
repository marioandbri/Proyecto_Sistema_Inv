
export const type = {
  LOG_IN: "SETS USER DATA IN STATE",
  LOG_OUT: "LOGOUT"
}

export const initialState = {
  userData: null,
  admin: true
}

const AppReducer = (state, action) => {

  switch (action.type) {
    case type.LOG_IN:
      return { ...state, userData: action.payload }
    case type.LOG_OUT:
      return { ...state, userData: null, admin: false }

    default:
      return state;
  }
}
export default AppReducer;
