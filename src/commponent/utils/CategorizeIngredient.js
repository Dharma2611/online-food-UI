export const CategorizeIngredient = (ingredientsItems) => {
  // if (!Array.isArray(ingredientsItems)) {
  //   console.error("Invalid or missing ingredients:", ingredientsItems);
  //   return {}; // Return an empty object as a fallback
  // }

  return ingredientsItems.reduce((acc, ingredientCategory) => {
    const category = ingredientCategory || "Uncategorized"; // Default fallback to "Uncategorized"

    if (!acc[category.name]) {
      acc[category.name] = [];
    }

    acc[category.name].push(ingredientCategory); // Add ingredient to the appropriate category

    return acc;
  }, {});
};
