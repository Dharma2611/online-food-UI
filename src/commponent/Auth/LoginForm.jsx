import {
  Button,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null); // Reset error before new submission
    try {
      await dispatch(loginUser({ userData: values, navigate }));
    } catch (err) {
      setError(err.message); // Set actual error message based on the backend response
    } finally {
      setSubmitting(false); // Allow button to be clickable again
    }
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormControl
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
            >
              <Field as={TextField} name="email" label="Email" fullWidth />
              <FormHelperText>{touched.email && errors.email}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
            >
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
              <FormHelperText>
                {touched.password && errors.password}
              </FormHelperText>
            </FormControl>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, padding: "1rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don't have an account?
        <Button onClick={() => navigate("/account/register")} size="small">
          Register
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
