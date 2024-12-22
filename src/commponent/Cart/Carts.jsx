import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { CartItem } from "./CartItem";
import { AddressCart } from "./AddressCart";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../State/Order/Action";

const item = [1, 1];
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validateSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.number()
    .required("Pincode is required")
    .typeError("Pincode must be a number"),
  city: Yup.string().required("City is required"),
});

export const Carts = () => {
  const [open, setOpen] = React.useState(false);
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleOpenAddress = () => {
    setOpen(true);
  };
  console.log("cart in ", cart.cartItems);

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0]?.food?.restaurant.id,
        deliveryAddress: {
          fullname: auth.user?.fullname,
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.state,
          postalcode: values.postalcode,
          country: "India",
        },
      },
    };
    dispatch(createOrder(data));
    console.log("Form values submitted:", values);
  };

  const createOrderSelectAddress = () => {
    console.log("order created");
  };

  console.log("carxsaxast", cart);

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="flex justify-between text-gray-400">
              <p>Item Total</p>
              <p>${cart.cart?.total}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Delivery Fees</p>
              <p>$20</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Platform Fee</p>
              <p>$5</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>GST and Restaurant Charge</p>
              <p>$30</p>
            </div>
            <Divider />
            <div className="flex justify-between text-gray-400 mt-3">
              <p>Total Pay</p>
              <p>${cart.cart?.total + 30 + 20 + 5}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <div className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((index) => (
                <AddressCart
                  key={index}
                  item={1}
                  showButton={true}
                  handleAddress={createOrderSelectAddress}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-400">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    variant="outlined"
                    onClick={handleOpenAddress}
                    fullWidth
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-700">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-700">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-700">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-700">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
