import { useState } from "react";

import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import LoginInput from "../../components/inputs/LoginInput";
import styles from "./styles.module.css";

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email address.")
      .max(100),
    password: Yup.string().required("Password is required."),
  });

  return (
    <div className={styles.login}>
      <div className={styles.login_wrapper}>
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
        <div className={styles.register}></div>

        <footer className={styles.login_footer}>
          <div className={styles.login_footer_wrap}>
            <Link to="/">English(UK)</Link>
            <Link to="/">Français(FR)</Link>
            <Link to="/">العربية</Link>
            <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
            <Link to="/">Español (España)</Link>
            <Link to="/">italiano</Link>
            <Link to="/">Deutsch</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/">हिन्दी</Link>
            <Link to="/">中文(简体)</Link>
            <Link to="/">日本語</Link>
            <Link to="/" className={styles.footer_square}>
              <i className={styles.plus_icon}></i>
            </Link>
          </div>
          <div className={styles.footer_splitter}></div>
          <div className={styles.login_footer_wrap}>
            <Link to="/">Sign Up</Link>
            <Link to="/">Log in</Link>
            <Link to="/">Messenger</Link>
            <Link to="/">Facebook Lite</Link>
            <Link to="/">Watch</Link>
            <Link to="/">Places</Link>
            <Link to="/">Games</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Facebook Pay</Link>
            <Link to="/">Oculus</Link>
            <Link to="/">Portal</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Bulletin</Link>
            <Link to="/">Local</Link>
            <Link to="/">Fundraisers</Link>
            <Link to="/">Services</Link>
            <Link to="/">Voting Information Centre</Link>
            <Link to="/">Groups</Link>
            <Link to="/">About</Link>
            <Link to="/">Create ad</Link>
            <Link to="/">Create Page</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
            <Link to="/">
              AdChoices
              <i className={styles.adChoices_icon}></i>
            </Link>
            <Link to="/">Terms</Link>
            <Link to="/">Help</Link>
          </div>
          <div className={styles.login_footer_wrap}>
            <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2022
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
