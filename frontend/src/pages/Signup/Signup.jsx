import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupRequest } from "../../redux/action"; // Import the signup action
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const handleSignup = () => {
    dispatch(signupRequest({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/signup.jpg" alt="signup" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.btn}
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.text}>or</p>
          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className={styles.text}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
