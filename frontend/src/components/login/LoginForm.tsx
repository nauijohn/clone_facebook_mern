import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import LoginInput from "../inputs/LoginInput";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email address.")
      .max(100),
    password: Yup.string().required("Password is required."),
  });

  return (
    <div className={styles.login_wrap}>
      <div className={styles.login_1}>
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook Clone helps you connect and share with the people in your
          life.
        </span>
      </div>
      <div className={styles.login_2}>
        <div className={styles.login_2_wrap}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(e) => {
              console.log("submitting...");
              console.log("e: ", e);
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or Phone number"
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  bottom
                />
                <button type="submit" className={`blue_btn`}>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className={styles.forgot_password}>
            Forgotten password?
          </Link>
          <div className={styles.sign_splitter}></div>
          <button className={`blue_btn ${styles.open_signup}`}>
            Create Account
          </button>
        </div>
        <Link to="/" className={styles.sign_extra}>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
