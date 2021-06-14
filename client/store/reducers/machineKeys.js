import update from "immutability-helper";
import R from "ramda";

import {
  SET_MACHINEKEYS,
  ADD_MACHINEKEY,
  REMOVE_MACHINEKEY,
} from "_actions/machineKeys";

import { LOGOUT_USER } from "_actions/user";

export function machineKeys(
  //state = {
  //  completed: false,
  //},
  action
) {
  switch (action.type) {
    case ADD_MACHINEKEY:
      return update(state, {
        id: { $set: action.id },
        name: { $set: action.name },
        key: { $set: action.key },
        createdAt: { $set: action.createdAt },
      });
    default:
      return state;
  }
}

export default function machineKeys(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), state);
  //const updatedAtIndex = { $splice: [[index, 1, todo(state[index], action)]] };

  switch (action.type) {
    case SET_MACHINEKEYS:
      return update(state, { $set: action.machineKeys });
    case ADD_MACHINEKEY:
      return update(state, { $push: [machineKeys(action)] });
    case REMOVE_MACHINEKEY:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
