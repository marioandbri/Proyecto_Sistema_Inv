// import { useEffect } from "react";
import { useAppDispatch } from "./AppProvider";
import { type } from "./AppReducer";

export const useUserData = async () => {
  // const [userData, setUserData] = useState(null);
  // const fetchUser = async () => {
  //   await fetch("/uac/user")
  //     .then((res) => {
  //       return !res ? null : res.json();
  //     })
  //     .then((data) => setUserData(data));
  // };
  const dispatch = useAppDispatch()
  const fetchUser = async () => {
    const result = await fetch("/uac/user")
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Ha ocurrido un error";
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
    return await result;
  };
  let result = await fetchUser()
  let data
  if (result) {
    data = { username: result.username, email: result.email }
  } else {
    result = null;
  }

  // useEffect(() => {
  //   return;
  // }, []);

  return dispatch({ type: type.SET_USER, payload: result ? data : result });

  // return userData;
};
