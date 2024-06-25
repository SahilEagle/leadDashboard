import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./styles.module.css";
import {
  loginRequest,
  sendEmail,
  verifyOtp,
  changePassword,
} from "../../redux/action";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { isLoading, error, user, emailSent, otpVerified, passwordChanged } =
    useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = { email, password };
    dispatch(loginRequest(payload));
  };

  const handleForgotEmail = (e) => {
    e.preventDefault();
    const payload = { forgotEmail };
    dispatch(sendEmail(payload));
  };

  const handleOTP = (e) => {
    e.preventDefault();
    const payload = { email: forgotEmail, otp };
    dispatch(verifyOtp(payload));
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    const payload = { email: forgotEmail, otp, newPassword, confirmPassword };
    dispatch(changePassword(payload));
  };

  const closeModal = () => {
    const modalElement = document.getElementById("forgotPassword");
    const backdropElement = document.querySelector(".modal-backdrop");

    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
    }

    if (backdropElement) {
      backdropElement.remove();
    }

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  const handlePasswordChangeSuccess = () => {
    toast.success("Password changed successfully");
    closeModal();
    navigate("/home");
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (emailSent) {
      setShowOtpInput(true);
    }
  }, [emailSent]);

  useEffect(() => {
    if (otpVerified) {
      setShowChangePassword(true);
    }
  }, [otpVerified]);

  useEffect(() => {
    if (passwordChanged) {
      handlePasswordChangeSuccess();
    }
  }, [passwordChanged]);

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log in Form</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/login.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Members Log in</h2>
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

          <Link
            type="button"
            className=""
            data-bs-toggle="modal"
            data-bs-target="#forgotPassword"
          >
            Forgot password
          </Link>
          <button
            className={styles.btn}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.text}>or</p>
          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Log in with Google</span>
          </button>
          <p className={styles.text}>
            New Here ? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Forgot Password modal */}
      <div
        className="modal fade"
        id="forgotPassword"
        aria-hidden="true"
        aria-labelledby="forgotPasswordLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="forgotPasswordLabel">
                {showChangePassword
                  ? "Change Password"
                  : showOtpInput
                  ? "Enter OTP"
                  : "Enter your Email"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!showOtpInput && !showChangePassword && (
                <form onSubmit={handleForgotEmail}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Email
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="user@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send OTP
                  </button>
                </form>
              )}
              {showOtpInput && !showChangePassword && (
                <form onSubmit={handleOTP}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">
                      OTP
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Verify OTP
                  </button>
                </form>
              )}
              {showChangePassword && (
                <form onSubmit={handleChangePass}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">
                      New Password
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Confirm Password
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Change Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
