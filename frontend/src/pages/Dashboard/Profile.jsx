// Profile.jsx
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        {user.picture ? (
          <img src={user.picture} alt="User" />
        ) : (
          <div className={styles.initial}>{getInitial(user?.name)}</div>
        )}
      </div>
      <div className={styles.details}>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
