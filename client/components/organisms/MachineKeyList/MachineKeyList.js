import React from "react";
import { useSelector } from "react-redux";
import R from "ramda";

import MachineKey from "_molecules/MachineKey";

export default function MachineKeyList() {
  const { machineKeys } = useSelector(R.pick(["machineKeys"]));

  return (
    <ul className="machineKey-list">
      {R.reverse(machineKeys).map((machineKey) => (
        <MachineKey key={machineKey.id} {...machineKey} />
      ))}
    </ul>
  );
}
