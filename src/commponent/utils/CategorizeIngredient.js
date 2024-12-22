export const CategorizeIngredient = (ingredients = []) => {
  if (!Array.isArray(ingredients)) {
    console.error("Expected ingredients to be an array, but got:", ingredients);
    return {}; // Return an empty object if ingredients is not an array
  }

  return ingredients.reduce((acc, ingredient) => {
    // Assuming each ingredient has a category property with a name
    const { category } = ingredient;

    // Ensure category is defined
    if (category && category.name) {
      if (!acc[category.name]) {
        acc[category.name] = []; // Initialize array if category does not exist
      }
      acc[category.name].push(ingredient); // Add ingredient to the appropriate category
    } else {
      console.warn("Ingredient has no valid category:", ingredient);
    }

    return acc; // Return the accumulator for the next iteration
  }, {});
};
