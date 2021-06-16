import update from "immutability-helper";
import R from "ramda";

import { SET_SYSTEMINFORMATIONS } from "_actions/systemInformations";

import { LOGOUT_USER } from "_actions/user";

export default function systemInformations(state = [], action) {
  switch (action.type) {
    case SET_SYSTEMINFORMATIONS:
      return update(state, { $set: action.systemInformations });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
