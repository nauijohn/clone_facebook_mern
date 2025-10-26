import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import styles from "./styles.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_wrapper}>
        <LoginForm />
        <div className={styles.register}></div>

        <Footer />
      </div>
    </div>
  );
};

export default Login;
