import mongoose, { SchemaTypes } from "mongoose";
const { Schema, model } = mongoose;
import type { IRecipe } from "../types/recipes.types";

const mealSchema = new Schema<IRecipe>({
  id: Number,
  createdAt: Date,
  updatedAt: Date,
  title: String,
  image: String,
  imageType: String,
  servings: Number,
  readyInMinutes: Number,
  preparationMinutes: Number,
  cookingMinutes: Number,
  license: String,
  sourceName: String,
  sourceUrl: String,
  spoonacularSourceUrl: String,
  healthScore: Number,
  spoonacularScore: Number,
  pricePerServing: Number,
  analyzedInstructions: [
    {
      name: String,
      steps: [
        {
          number: Number,
          step: String,
          ingredients: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
          equipment: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
          length: {
            number: Number,
            unit: String,
          },
        },
      ],
    },
  ],
  cheap: Boolean,
  creditsText: String,
  cuisines: [String],
  dairyFree: Boolean,
  diets: [String],
  gaps: String,
  glutenFree: Boolean,
  instructions: String,
  ketogenic: Boolean,
  lowFodmap: Boolean,
  occasions: [String],
  sustainable: Boolean,
  vegan: Boolean,
  vegetarian: Boolean,
  veryHealthy: Boolean,
  veryPopular: Boolean,
  whole30: Boolean,
  weightWatcherSmartPoints: Number,
  dishTypes: [String],
  extendedIngredients: [
    {
      ingredientId: Number,
      quantity: Number,
      unit: String,
    },
  ],
  nutrition: {
    nutrients: [
      {
        name: String,
        title: String,
        amount: Number,
        unit: String,
        percentOfDailyNeeds: Number,
      },
    ],
    caloricBreakdown: {
      percentProtein: Number,
      percentFat: Number,
      percentCarbs: Number,
    },
    weightPerServing: {
      amount: Number,
      unit: String,
    },
  },
  summary: String,
  winePairing: {
    pairedWines: [String],
    pairingText: String,
    productMatches: [
      {
        id: Number,
        title: String,
        description: String,
        price: String,
        imageUrl: String,
        averageRating: Number,
        ratingCount: Number,
        score: Number,
        link: String,
      },
    ],
  },
});

const Meal = model<IRecipe>("Meal", mealSchema);
export default Meal;
