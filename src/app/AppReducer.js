import { toast } from "react-toastify"

export const type = {
  LOG_IN: "SETS USER DATA IN STATE",
  LOG_OUT: "LOGOUT",
  NOTIFICATION_ADD: "Add a notification component",
  NOTIFICATION_REMOVE: "Remove notification for the index parameter",
}

export const initialState = {
  userData: null,
  loading: true
}
export const ToastNotification = (type, content) => {

  switch (type) {
    case "info":
      return toast.info(content)
    case "warn":
      return toast.warn(content)
    case "error":
      return toast.error(content)
    case "success":
      return toast.success(content)


    default:
      return toast(content)
  }
}

const AppReducer = (state, action) => {

  switch (action.type) {
    case type.LOG_IN:
      return { ...state, userData: action.payload, loading: false }
    case type.LOG_OUT:
      return { ...state, userData: null }
    default:
      return state;
  }
}
export default AppReducer;
