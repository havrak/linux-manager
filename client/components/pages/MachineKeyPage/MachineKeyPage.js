import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import { attemptGetMachineKeys } from "_thunks/machineKeys";
import { attemptGetSystemInformation } from "_thunks/systemInformations";
import MachineKeySection from "_templates/MachineKeySection";

export default function TodoPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetMachineKeys())
        .catch(R.identity)
        .then(() => setLoading(false));
      dispatch(attemptGetSystemInformation()).catch(R.identity).then();
    }
  }, []);

  return (
    !loading && (
      <div className="machineKey-page page">
        <MachineKeySection />
      </div>
    )
  );
}
