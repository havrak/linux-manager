import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function SystemInfo(sysInfo) {
  console.log("creating kekk");
  console.log(sysInfo);
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
              <small>{`created ${sysInfo.loggedIn}`}</small>
            </p>
            <h5>{sysInfo.name}</h5>
            <hr />
            <h6> SystemInfo </h6>
          </div>
        </div>
      </article>
    </li>
  );
}

SystemInfo.propTypes = {
  sysInfo: PropTypes.string,
};
