import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest, fetchSessionRequest } from "../../redux/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
      fetchSessionRequest();
      console.log(user);
  },[user]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutRequest());
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Leadership</div>
        <nav>
          <ul>
            <li>
              <Link to="">
                <FaHome />
                &nbsp;Dashboard
              </Link>
            </li>
            <li>
              <Link to="visitors">
                <BsFillPeopleFill />
                &nbsp;Visitors
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> &nbsp;Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.user}>
            {user && (
              <>
                {user.picture && <img src={user.picture} alt="User" />}
                <Link to="profile">{user.name}</Link>
              </>
            )}
          </div>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
