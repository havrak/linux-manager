import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Chart from "react-google-charts";

export default function DiskInfo(diskInfo) {
  return (
    <div className="disk-info">
      <div className="graph">
        <Chart
          width={"400px"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["", ""],
            ["Free (GB)", (diskInfo.size - diskInfo.used) / 1024 / 1024],
            ["Used (GB)", diskInfo.used / 1024 / 1024],
          ]}
          options={{
            title: `${diskInfo.mount}, (${diskInfo.device})`,
            pieStartAngle: 100,
            pieHole: 0.4,
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
    </div>
  );
}

DiskInfo.propTypes = {
  diskInfo: PropTypes.object,
};
