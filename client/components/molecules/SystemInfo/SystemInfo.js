import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Chart from "react-google-charts";
import DiskList from "_molecules/DiskList";

export default function SystemInfo(sysInfo) {
  const dispatch = useDispatch();

  const jsonInfo = JSON.parse(sysInfo.systemInformation);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  return (
    <li className="sysinfo box">
      <article className="media">
        <figure className="media-left"></figure>
        <div className="media-content">
          <div className="content">
            <p>
              <small>{`loggedAt ${sysInfo.loggedAt}`}</small>
            </p>
            <h5>{sysInfo.name}</h5>
            <hr />
            <h6> SystemInfo </h6>
            OS name: {jsonInfo.system.os.name}
            <br />
            OS Version: {jsonInfo.system.os.version}
            <br />
            Kernel release: {jsonInfo.system.os.kernel}
            <h6> Packages </h6>
            Package manager: {jsonInfo.system.packages.nameOfPackageManager}
            <br />
            Number of packages: {jsonInfo.system.packages.installed}
            <br />
            Number of updates: {jsonInfo.system.packages.updatable}
            <br />
            <div className="graphs">
              <div className="graph">
                <Chart
                  width={"400px"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["", ""],
                    [
                      "Free",
                      jsonInfo.specs.cpu.maxCPUSpeed - jsonInfo.specs.cpu.usage,
                    ],
                    ["Used", jsonInfo.specs.cpu.usage],
                  ]}
                  options={{
                    title: "CPU",
                    pieStartAngle: 100,
                    pieHole: 0.4,
                  }}
                  rootProps={{ "data-testid": "3" }}
                />
              </div>
              <div className="graph">
                <Chart
                  width={"400px"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["", ""],
                    [
                      "Free (GB)",
                      (jsonInfo.specs.ram.capacity - jsonInfo.specs.ram.usage) /
                        1024 /
                        1024,
                    ],
                    ["Used (GB)", jsonInfo.specs.ram.usage / 1024 / 1024],
                  ]}
                  options={{
                    title: "RAM",
                    pieStartAngle: 100,
                    pieHole: 0.4,
                  }}
                  rootProps={{ "data-testid": "3" }}
                />
              </div>
            </div>
            <DiskList {...jsonInfo.specs.disk} />
          </div>
        </div>
      </article>
    </li>
  );
}

SystemInfo.propTypes = {
  sysInfo: PropTypes.string,
};
