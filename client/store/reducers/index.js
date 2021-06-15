import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import machineKeys from "./machineKeys";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    machineKeys,
  });

export default createRootReducer;
