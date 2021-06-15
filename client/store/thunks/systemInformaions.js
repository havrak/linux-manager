import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import { getSystemInformations } from "_api/machines";
import { setSystemInformation } from "_actions/machineKeys";

import { dispatchError } from "_utils/api";

export const attemptGetMachineKeys = () => (dispatch) =>
  getSystemInformations()
    .then((data) => {
      console.log("DATA: ");
      console.log(systemInformations);
      const systemInformations = R.map(
        (sysinfo) =>
          R.omit(["Id"], R.assoc("id", sysinfo._id, snakeToCamelCase(sysinfo))),
        data.systemInformations
      );
      dispatch(setSystemInformation(systemInformations));
      return data.systemInformations;
    })
    .catch(dispatchError(dispatch));
