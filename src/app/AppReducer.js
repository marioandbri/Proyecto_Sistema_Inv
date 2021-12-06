
export const type = {
  SET_USER: "SETS USER DATA IN STATE"
}

export const initialState = {
  userData: null
}

const AppReducer = (state, action) => {
  switch (action.type) {
    case type.SET_USER:
      return { ...state, userData: action.payload }

    default:
      return state;
  }
}
export default AppReducer;
