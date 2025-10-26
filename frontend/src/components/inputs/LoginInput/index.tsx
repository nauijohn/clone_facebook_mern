import { ErrorMessage, useField } from "formik";

import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  bottom?: boolean;
}

const LoginInput = ({ bottom, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.input_wrap}>
      {meta.touched && meta.error && !bottom && (
        <div
          className={styles.input_error}
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className={styles.error_arrow_top}></div>
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
          className={styles.input_error}
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className={styles.error_arrow_bottom}></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className={styles.error_icon}
          style={{ top: `${!bottom && "63%"}` }}
        ></i>
      )}
    </div>
  );
};

export default LoginInput;
