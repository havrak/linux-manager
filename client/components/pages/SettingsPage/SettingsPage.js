import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import ChangeUsername from "_organisms/ChangeUsername";
import ChangePassword from "_organisms/ChangePassword";
import DeleteAccount from "_organisms/DeleteAccount";

export default function SettingsPage({ location }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    }
  }, []);

  return (
    <div className="account-settings-page">
      <ChangeUsername />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}

SettingsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
