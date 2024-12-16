import styled from "@emotion/styled";
import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/Carts"; // Ensure this is well-defined
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  // Determine which form to show based on the current pathname
  const isRegister = location.pathname === "/account/register";

  return (
    <Modal
      onClose={handleClose}
      open={isRegister || location.pathname === "/account/login"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} // Centering modal
    >
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          {isRegister ? "Register" : "Login"}
        </Typography>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </Box>
    </Modal>
  );
};

export default Auth;
