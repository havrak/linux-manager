import update from "immutability-helper";
import R from "ramda";

import { SET_SYSTEMINFORMATIONS } from "_actions/systemInformations";

import { LOGOUT_USER } from "_actions/user";

// export function machineKey(state = { active: true }, action) {
//   switch (action.type) {
//     case ADD_MACHINEKEY:
//       console.log("data");
//       console.log(
//         update(state, {
//           id: { $set: action.id },
//           name: { $set: action.name },
//           publicKey: { $set: action.publicKey },
//           createdAt: { $set: action.createdAt },
//         })
//       );
//       return update(state, {
//         id: { $set: action.id },
//         name: { $set: action.name },
//         publicKey: { $set: action.publicKey },
//         createdAt: { $set: action.createdAt },
//       });
//     default:
//       return state;
//   }
// }

export default function machineKeys(state = [], action) {
  const index = R.findIndex(R.propEq("id", action.id), false);
  //const updatedAtIndex = { $splice: [[index, 1, todo(state[index], action)]] };

  switch (action.type) {
    case SET_SYSTEMINFORMATIONS:
      return update(state, { $set: action.machineKeys });
    // case ADD_MACHINEKEY:
    //   return update(state, { $push: [machineKey(undefined, action)] });
    // case REMOVE_MACHINEKEY:
    //   return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
