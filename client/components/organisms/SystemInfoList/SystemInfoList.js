import React from "react";
import { useSelector } from "react-redux";
import R from "ramda";

import SystemInfo from "_molecules/SystemInfo";
//import { system } from "systeminformation";

export default function MachineKeyList() {
  const { systemInformations } = useSelector(R.pick(["systemInformations"]));

  return (
    <ul className="machineKey-list">
      {R.reverse(systemInformations).map((systeminformation) => (
        <SystemInfo key={systeminformation.id} {...systeminformation} />
      ))}
    </ul>
  );
}
