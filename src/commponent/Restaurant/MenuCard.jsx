import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { CategorizeIngredient } from "../utils/CategorizeIngredient";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../State/Cart/Action";
const demo = [
  {
    category: "Nuts &  Seeds",
    ingredients: ["Almonds", "cachew", "Pistachios"],
  },
  { category: "Protin", ingredients: ["Protin", "protin sake"] },
];
export const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleCheckBox = (itemName) => {
    console.log("value", itemName);
    if (selectedIngredients.includes(itemName))
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    else setSelectedIngredients([...selectedIngredients, itemName]);
  };
  const handleAddtoCart = (e) => {
    // console.log("add to cart");
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItems: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    // console.log("cartsaasnnkjasd", cartItems);
    console.log("add to cart ", reqData);
  };
  // console.log("cartsaasnnkjasd", cartItems);
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pane11-content"
          id="pane11-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-4">
              <img
                alt=""
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>${item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(CategorizeIngredient(item.ingredientsItems)).map(
                (ingredientCategory) => (
                  console.log("Category:", ingredientCategory),
                  (
                    <div>
                      <p>{ingredientCategory}</p>
                      <FormGroup>
                        {CategorizeIngredient(item.ingredientsItems)[
                          ingredientCategory
                        ].map((item) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                onChange={() => {
                                  handleCheckBox(item.name);
                                }}
                              />
                            }
                            label={item.name}
                          ></FormControlLabel>
                        ))}
                      </FormGroup>
                    </div>
                  )
                )
              )}
            </div>
            <div className="pt-6">
              <Button
                onClick={handleAddtoCart}
                variant="contained"
                type="submit"
                disabled={false}
              >
                {true ? "AddtoCard" : "out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
