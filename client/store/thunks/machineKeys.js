import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import {
  getMachineKeys,
  postMachineKey,
  deleteMachineKey,
  downloadCollector,
} from "_api/machines";
import {
  setMachineKeys,
  addMachineKey,
  removeMachineKey,
} from "_actions/machineKeys";

import { dispatchError } from "_utils/api";

export const attemptGetMachineKeys = () => (dispatch) =>
  getMachineKeys()
    .then((data) => {
      console.log("got keys from backend");
      const machineKeys = R.map(
        (machineKey) =>
          R.omit(
            ["Id"],
            R.assoc("id", machineKey._id, snakeToCamelCase(machineKey))
          ),
        data.machineKeys
      );
      console.log("attempt get machine keys");
      console.log(machineKeys);
      dispatch(setMachineKeys(machineKeys));
      return data.machineKeys;
    })
    .catch(dispatchError(dispatch));

export const attemptAddMachineKey = (name, key) => (dispatch) => {
  postMachineKey({ name: name, public_key: key })
    .then((data) => {
      console.log("dataIGot");
      console.log(data);

      const machineKey = R.omit(
        ["Id"],
        R.assoc("id", data.machineKey._id, snakeToCamelCase(data.machineKey))
      );
      dispatch(addMachineKey(machineKey));
      return data.user;
    })
    .catch(dispatchError(dispatch));
};
export const attemptDeleteMachineKey = (id) => (dispatch) => {
  deleteMachineKey({ id })
    .then((data) => {
      dispatch(removeMachineKey(id));
      return data;
    })
    .catch(dispatchError(dispatch));
};
