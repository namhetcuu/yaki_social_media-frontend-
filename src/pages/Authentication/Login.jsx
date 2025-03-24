import { Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

// ✅ Khai báo giá trị ban đầu
const initialValues = { username: "", password: "" };

// ✅ Định nghĩa validationSchema sử dụng Yup
const validationSchema = Yup.object({
  username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Gửi action đến Redux
  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction(values, navigate));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              {/* Username Field */}
              <div>
                <Field
                  as={TextField}
                  name="username"
                  type="text"
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </div>

              {/* Password Field */}
              <div>
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex gap-5 items-center pt-5 justify-center">
        <p>If you dont have an account?</p>
        <button onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">Register</button>
      </div>
    </>
  );
};

export default Login;
