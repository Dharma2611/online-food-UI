import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER", // Default value to avoid empty selection
};

// Define validation schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Dispatch action for registration
      await dispatch(registerUser({ userData: values }));
      // Optional: navigate or show a success message upon success
      navigate("/some-success-route");
    } catch (error) {
      // Handle error appropriately
      setErrors({ email: "This email is already registered." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <FormControl
              fullWidth
              margin="normal"
              error={touched.role && Boolean(errors.role)}
            >
              <InputLabel id="role-simple-select-label">Role</InputLabel>
              <Field
                as={Select}
                labelId="role-simple-select-label"
                id="role-simple-select"
                name="role"
              >
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT_OWNER">
                  Restaurant Owner
                </MenuItem>
              </Field>
              <FormHelperText>{touched.role && errors.role}</FormHelperText>
            </FormControl>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, padding: "1rem" }}
              disabled={isSubmitting} // Disable button during submission
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        If you have an account,
        <Button onClick={() => navigate("/account/login")} size="small">
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
