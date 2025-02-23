export type FoundationDownload = {
  FoundationFoods: FoundationFood[];
};

export type FoundationFood = {
  foodClass: FoundationFoodFoodClass;
  description: string;
  foodNutrients: FoodNutrient[];
  foodAttributes: any[];
  nutrientConversionFactors: NutrientConversionFactor[];
  isHistoricalReference: boolean;
  ndbNumber: number;
  dataType: FoundationFoodDataType;
  foodCategory: FoodCategory;
  fdcId: number;
  foodPortions: FoodPortion[];
  publicationDate: PublicationDate;
  inputFoods: InputFoodElement[];
  scientificName?: string;
};

export type FoundationFoodDataType = "Foundation";

export type FoodCategory = {
  description: FoodCategoryDescription;
};

export type FoodCategoryDescription =
  | "Analytical or derived from analytical"
  | "Calculated or imputed"
  | "Legumes and Legume Products"
  | "Vegetables and Vegetable Products"
  | "Sausages and Luncheon Meats"
  | "Nut and Seed Products"
  | "Dairy and Egg Products"
  | "Fruits and Fruit Juices"
  | "Baked Products"
  | "Spices and Herbs"
  | "Fats and Oils"
  | "Poultry Products"
  | "Soups, Sauces, and Gravies"
  | "Finfish and Shellfish Products"
  | "Restaurant Foods"
  | "Beef Products"
  | "Sweets"
  | "Pork Products"
  | "Cereal Grains and Pasta"
  | "Beverages";

export type FoundationFoodFoodClass = "FinalFood";

export type FoodNutrient = {
  type: FoodNutrientType;
  id: number;
  nutrient: Nutrient;
  dataPoints?: number;
  foodNutrientDerivation: FoodNutrientDerivation;
  median?: number;
  amount?: number;
  max?: number;
  min?: number;
  footnote?: string;
};

export type FoodNutrientDerivation = {
  code?: Code;
  description?: FoodNutrientDerivationDescription;
  foodNutrientSource: Food;
};

export type Code = "A" | "AS" | "NC";

export type FoodNutrientDerivationDescription =
  | "Analytical"
  | "Summed"
  | "Calculated";

export type Food = {
  id?: number;
  code?: string;
  description?: FoodCategoryDescription;
};

export type Nutrient = {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: UnitName;
};

export type UnitName = "µg" | "mg" | "g" | "kJ" | "kcal" | "IU" | "sp gr";

export type FoodNutrientType = "FoodNutrient";

export type FoodPortion = {
  id: number;
  value: number;
  measureUnit: MeasureUnit;
  modifier?: string;
  gramWeight: number;
  sequenceNumber: number;
  amount: number;
  minYearAcquired: number;
  portionDescription?: string;
};

export type MeasureUnit = {
  id: number;
  name: string;
  abbreviation: string;
};

export type InputFoodElement = {
  id: number;
  foodDescription: string;
  inputFood: InputFoodInputFood;
};

export type InputFoodInputFood = {
  foodClass: InputFoodFoodClass;
  description: string;
  dataType: InputFoodDataType;
  foodCategory: Food;
  fdcId: number;
  publicationDate: PublicationDate;
};

export type InputFoodDataType = "Sample" | "Agricultural Acquisition";

export type InputFoodFoodClass = "Composite" | "Det";

export type PublicationDate =
  | "4/1/2019"
  | "12/16/2019"
  | "4/1/2020"
  | "10/30/2020"
  | "4/23/2021"
  | "10/15/2021"
  | "4/28/2022"
  | "10/28/2022"
  | "4/20/2023"
  | "10/26/2023"
  | "4/18/2024"
  | "10/31/2024"
  | "4/28/2021"
  | "10/28/2021";

export type NutrientConversionFactor = {
  type: NutrientConversionFactorType;
  proteinValue?: number;
  fatValue?: number;
  carbohydrateValue?: number;
  value?: number;
  nitrogenValue?: number;
};

export type NutrientConversionFactorType =
  | ".CalorieConversionFactor"
  | ".ProteinConversionFactor";
