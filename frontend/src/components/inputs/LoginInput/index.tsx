import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  bottom?: boolean;
}

const LoginInput = ({ bottom, ...props }: Props) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  return (
    <div className={styles.input_wrap}>
      {meta.touched && meta.error && !bottom && (
        <div
          className={`${
            desktopView
              ? `${styles.input_error} ${styles.input_error_desktop}`
              : styles.input_error
          }`}
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? styles.error_arrow_left : styles.error_arrow_top
              }
            ></div>
          )}
        </div>
      )}

      <input
        className={`${
          meta.touched && meta.error ? styles.input_error_border : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={`${
            desktopView
              ? `${styles.input_error} ${styles.input_error_desktop}`
              : styles.input_error
          }`}
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView
                  ? styles.error_arrow_left
                  : styles.error_arrow_bottom
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className={styles.error_icon}
          style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
};

export default LoginInput;
