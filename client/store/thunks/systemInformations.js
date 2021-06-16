import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import { getSystemInformations } from "_api/machines";
import { setSystemInformations } from "_actions/systemInformations";

import { dispatchError } from "_utils/api";

export const attemptGetSystemInformation = () => (dispatch) =>
  getSystemInformations()
    .then((data) => {
      const systemInformations = R.map(
        (sysinfo) =>
          R.omit(["Id"], R.assoc("id", sysinfo._id, snakeToCamelCase(sysinfo))),
        data.systemInformations
      );
      dispatch(setSystemInformations(systemInformations));
      return data.systemInformations;
    })
    .catch(dispatchError(dispatch));
