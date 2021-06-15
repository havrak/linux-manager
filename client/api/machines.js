import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const postMachineKey = (info) =>
  request
    .post("/api/machines/key")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const getMachineKeys = () =>
  request.get("/api/machines/key").then(handleSuccess).catch(handleError);

export const deleteMachineKey = (info) =>
  request
    .delete("/api/machines/key")
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const downloadCollector = () => {};
