import { unSetUser } from "../redux/slices/userSlice";

export function handleLogout(dispatch) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(unSetUser());
}
