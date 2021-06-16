import React from "react";
import R from "ramda";

import DiskInfo from "_atoms/DiskInfo";

export default function DiskList(list) {
  return (
    <ul className="disk-list">
      {Object.values(list).map((disk) => {
        return <DiskInfo {...disk} />;
      })}
    </ul>
  );
}
