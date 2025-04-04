import IngredientCategory from "../../models/ingredientCategories.mongo";

export const createIngredientCategory = async (name: string) => {
  try {
    const ingredientCategory = await IngredientCategory.findOneAndUpdate(
      { name: name },
      {
        $set: { name: name },
      },
      { upsert: true, new: true }
    );
    return ingredientCategory;
  } catch (error) {
    throw error;
  }
};
