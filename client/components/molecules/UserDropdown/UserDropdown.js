import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import R from "ramda";

import { attemptLogout } from "_thunks/auth";

export default function UserDropdown({ open, closeDropdown }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  const dropdown = useRef(null);

  const dropdownListener = (e) => {
    // don't want to have useless errors from this
    if (e.path) {
      !e.path.includes(dropdown.current) && open && closeDropdown();
    }
  };

  useEffect(() => {
    window.addEventListener("click", dropdownListener);
    window.addEventListener("touchend", dropdownListener);

    return () => {
      window.removeEventListener("click", dropdownListener);
      window.removeEventListener("touchend", dropdownListener);
    };
  }, [open]);

  const logout = () => {
    closeDropdown();
    dispatch(attemptLogout()).catch(R.identity);
  };

  return (
    open && (
      <div className="dropdown box" ref={dropdown}>
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <Link to="/settings" onClick={closeDropdown}>
              Settings
            </Link>
          </li>
          <li className="dropdown-item">
            <a onClick={logout} onKeyPress={logout}>
              Logout
            </a>
          </li>
          <hr className="is-hidden-desktop" />
          <li className="dropdown-item is-hidden-desktop">
            <Link to="/home" onClick={closeDropdown}>
              Home
            </Link>
          </li>
          <li className="dropdown-item is-hidden-desktop">
            <Link to="/machinekey" onClick={closeDropdown}>
              Machine List
            </Link>
          </li>
        </ul>
      </div>
    )
  );
}

UserDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};
