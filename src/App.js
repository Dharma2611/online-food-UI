// import logo from "./logo.svg";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
// import { Navbar } from "./commponent/navbar/Navbar";

import "./index.css";
// import { Home } from "./commponent/Home/Home.jsx";
import { darktheme } from "./theme/darktheme";
import { CssBaseline } from "@mui/material";
// import { RestaurantDetails } from "./commponent/Restaurant/RestaurantDetails.jsx";
// import { Cart } from "./commponent/Cart/Cart.jsx";
// import { Profile } from "./commponent/Profile/Profile.jsx";
import CustomerRoute from "./Routers/CustomerRoute.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "./State/store.js";
import { getUser } from "./State/Authentication/Action.js";
import { findCart } from "./State/Cart/Action.js";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
    }
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  return (
    <>
      <ThemeProvider theme={darktheme}>
        <CssBaseline />

        <CustomerRoute />
      </ThemeProvider>
    </>
  );
}

export default App;
