import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../../../store/actions/AuthActions";
import { isAuthenticated } from "../../../store/selectors/AuthSelectors";

function LogoutPage(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);
  function onLogout() {
    dispatch(logout(props.history));
    dispatch({
      type: 'CLEAR'
    })
    // window.location.reload();
  }
  return (
    <>
      <Link to={"#"} className="dropdown-item ai-icon" onClick={onLogout}>
        <svg
          id="icon-logout"
          xmlns="http://www.w3.org/2000/svg"
          className="logout-icon"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1={21} y1={12} x2={9} y2={12} />
        </svg>
      </Link>
    </>
  );
}

export default withRouter(LogoutPage);
