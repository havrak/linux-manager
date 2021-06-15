export const SET_MACHINEKEYS = "SET_MACHINEKEYS";
export const ADD_MACHINEKEY = "ADD_MACHINEKEY";
export const REMOVE_MACHINEKEY = "REMOVE_MACHINEKEY";
export const INCREMENT_MACHINEKEY_ID = "INCREMENT_MACHINEKEY_ID";

export const setMachineKeys = (machineKeys) => ({
  type: SET_MACHINEKEYS,
  machineKeys,
});

export const addMachineKey = ({ id, name, publicKey, createdAt }) => ({
  type: ADD_MACHINEKEY,
  id,
  name,
  publicKey,
  createdAt,
});

export const removeMachineKey = (id) => ({
  type: REMOVE_MACHINEKEY,
  id,
});
