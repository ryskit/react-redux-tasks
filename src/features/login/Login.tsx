import React from "react";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editEmail,
  editPassword,
  fetchAsyncLogin,
  fetchAsyncSignUp,
  selectAuthen,
  selectIsLoginView,
  toggleMode,
} from "./loginSlice";
import { Button } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const authen = useAppSelector(selectAuthen);
  const isLoginView = useAppSelector(selectIsLoginView);
  const btnDisabler = authen.email === "" || authen.password === "";
  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen));
    } else {
      const result = await dispatch(fetchAsyncSignUp(authen));

      if (fetchAsyncSignUp.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>Email</span>
        <input
          type="text"
          className={styles.inputLog}
          name="email"
          placeholder=""
          onChange={(e) => dispatch(editEmail(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            onClick={login}
          >
            {isLoginView ? "Login" : "Create"}
          </Button>
        </div>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? "Create Account ?" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
