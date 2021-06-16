import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import machineKeys from "./machineKeys";
import systemInformations from "./systemInformations";
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    machineKeys,
    systemInformations,
  });

export default createRootReducer;
