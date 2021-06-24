import { store } from "./store";
import { checkAuthorization } from "@redux/auth/actions";

export default () =>
  new Promise(() => {
    store.dispatch(checkAuthorization());
  });
