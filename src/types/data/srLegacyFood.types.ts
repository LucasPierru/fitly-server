export type SRLegacy = {
  SRLegacyFoods: SRLegacyFood[];
};

export type SRLegacyFood = {
  foodClass: FoodClass;
  description: string;
  foodNutrients: FoodNutrient[];
  foodAttributes: any[];
  nutrientConversionFactors: NutrientConversionFactor[];
  isHistoricalReference: boolean;
  ndbNumber: number;
  dataType: DataType;
  foodCategory: FoodCategory;
  fdcId: number;
  foodPortions: FoodPortion[];
  publicationDate: PublicationDate;
  inputFoods: any[];
  scientificName?: string;
};

export type DataType = "SR Legacy";

export type FoodCategory = {
  description: Description;
};

export type Description =
  | "Baked Products"
  | "Snacks"
  | "Sweets"
  | "Vegetables and Vegetable Products"
  | "American Indian/Alaska Native Foods"
  | "Restaurant Foods"
  | "Beverages"
  | "Fats and Oils"
  | "Sausages and Luncheon Meats"
  | "Dairy and Egg Products"
  | "Baby Foods"
  | "Poultry Products"
  | "Pork Products"
  | "Breakfast Cereals"
  | "Legumes and Legume Products"
  | "Finfish and Shellfish Products"
  | "Fruits and Fruit Juices"
  | "Cereal Grains and Pasta"
  | "Nut and Seed Products"
  | "Beef Products"
  | "Meals, Entrees, and Side Dishes"
  | "Fast Foods"
  | "Spices and Herbs"
  | "Soups, Sauces, and Gravies"
  | "Lamb, Veal, and Game Products";

export type FoodClass = "FinalFood";

export type FoodNutrient = {
  type: FoodNutrientType;
  id: number;
  nutrient: Nutrient;
  dataPoints: number;
  foodNutrientDerivation: FoodNutrientDerivation;
  amount: number;
  max?: number;
  min?: number;
};

export type FoodNutrientDerivation = {
  code?: Code;
  description?: string;
  foodNutrientSource: FoodNutrientSource;
};

export type Code =
  | "MA"
  | "NC"
  | "MC"
  | "NR"
  | "LC"
  | "A"
  | "Z"
  | "FLA"
  | "RA"
  | "BFFN"
  | "FLC"
  | "BFSN"
  | "FLM"
  | "O"
  | "BNA"
  | "BFZN"
  | "AI"
  | "JA"
  | "T"
  | "RC"
  | "JO"
  | "BFCN"
  | "BFPN"
  | "RPI"
  | "RPA"
  | "RP"
  | "NP"
  | "CAZN"
  | "BFNN"
  | "S"
  | "BFYN"
  | "DA"
  | "BD"
  | "PAK"
  | "PIK"
  | "PIE"
  | "PAE"
  | "RKI"
  | "RKA"
  | "BFZY"
  | "RK"
  | "AR"
  | "BFSY"
  | "RF"
  | "CASN"
  | "BFPY"
  | "BFNY"
  | "ML"
  | "BFAN"
  | "CAFN"
  | "DI"
  | "CAAN"
  | "BFYY"
  | "BFFY";

export type FoodNutrientSource = {
  id?: number;
  code?: string;
  description?: string;
};

export type Nutrient = {
  id: number;
  number: string;
  name: Name;
  rank: number;
  unitName: UnitName;
};

export type Name =
  | "Protein"
  | "Ash"
  | "Energy"
  | "Fiber, total dietary"
  | "Iron, Fe"
  | "Sodium, Na"
  | "Cholesterol"
  | "Fatty acids, total trans"
  | "Fatty acids, total saturated"
  | "Total lipid (fat)"
  | "Carbohydrate, by difference"
  | "Water"
  | "Sugars, total including NLEA"
  | "Vitamin A, IU"
  | "Vitamin A, RAE"
  | "Vitamin C, total ascorbic acid"
  | "Calcium, Ca"
  | "Retinol"
  | "Folate, total"
  | "SFA 16:0"
  | "MUFA 18:1"
  | "PUFA 18:2"
  | "PUFA 18:3"
  | "Fatty acids, total monounsaturated"
  | "Fatty acids, total polyunsaturated"
  | "Folate, DFE"
  | "Riboflavin"
  | "Vitamin B-12"
  | "Vitamin K (Dihydrophylloquinone)"
  | "Vitamin K (phylloquinone)"
  | "Folate, food"
  | "Tryptophan"
  | "Threonine"
  | "Methionine"
  | "Phenylalanine"
  | "Carotene, beta"
  | "Carotene, alpha"
  | "Cryptoxanthin, beta"
  | "Lycopene"
  | "Tocopherol, delta"
  | "Tocotrienol, gamma"
  | "Tocotrienol, delta"
  | "Thiamin"
  | "Starch"
  | "Fructose"
  | "Lactose"
  | "Alcohol, ethyl"
  | "Galactose"
  | "Magnesium, Mg"
  | "Phosphorus, P"
  | "Copper, Cu"
  | "Manganese, Mn"
  | "SFA 8:0"
  | "SFA 12:0"
  | "SFA 14:0"
  | "PUFA 22:6 n-3 (DHA)"
  | "SFA 22:0"
  | "MUFA 14:1"
  | "MUFA 16:1"
  | "PUFA 2:5 n-3 (EPA)"
  | "PUFA 22:5 n-3 (DPA)"
  | "SFA 17:0"
  | "MUFA 17:1"
  | "MUFA 15:1"
  | "Tyrosine"
  | "Alanine"
  | "Glutamic acid"
  | "Glycine"
  | "Proline"
  | "Vitamin B-12, added"
  | "SFA 15:0"
  | "PUFA 20:2 n-6 c,c"
  | "PUFA 18:3 n-6 c,c,c"
  | "PUFA 20:3"
  | "Valine"
  | "Arginine"
  | "Histidine"
  | "Aspartic acid"
  | "Serine"
  | "Vitamin E, added"
  | "SFA 4:0"
  | "SFA 6:0"
  | "SFA 10:0"
  | "SFA 18:0"
  | "SFA 20:0"
  | "PUFA 20:4"
  | "PUFA 18:4"
  | "MUFA 20:1"
  | "MUFA 22:1"
  | "Sucrose"
  | "Glucose"
  | "Maltose"
  | "Caffeine"
  | "Theobromine"
  | "Potassium, K"
  | "Zinc, Zn"
  | "Selenium, Se"
  | "Vitamin E (alpha-tocopherol)"
  | "Lutein + zeaxanthin"
  | "Tocopherol, beta"
  | "Tocopherol, gamma"
  | "Tocotrienol, alpha"
  | "Tocotrienol, beta"
  | "Niacin"
  | "Pantothenic acid"
  | "Vitamin B-6"
  | "Folic acid"
  | "Isoleucine"
  | "Leucine"
  | "Lysine"
  | "Cystine"
  | "Vitamin D (D2 + D3), International Units"
  | "Choline, total"
  | "Vitamin D (D2 + D3)"
  | "Betaine"
  | "MUFA 16:1 c"
  | "Vitamin K (Menaquinone-4)"
  | "PUFA 22:4"
  | "SFA 24:0"
  | "MUFA 24:1 c"
  | "PUFA 21:5"
  | "Hydroxyproline"
  | "PUFA 18:3 n-3 c,c,c (ALA)"
  | "Fatty acids, total trans-monoenoic"
  | "TFA 18:1 t"
  | "TFA 18:2 t,t"
  | "Fatty acids, total trans-polyenoic"
  | "PUFA 20:3 n-6"
  | "TFA 22:1 t"
  | "TFA 18:2 t not further defined"
  | "PUFA 18:2 CLAs"
  | "TFA 16:1 t"
  | "MUFA 18:1 c"
  | "PUFA 18:2 n-6 c,c"
  | "MUFA 22:1 c"
  | "PUFA 20:3 n-3"
  | "Fluoride, F"
  | "Vitamin D3 (cholecalciferol)"
  | "Beta-sitosterol"
  | "Campesterol"
  | "PUFA 18:3i"
  | "Stigmasterol"
  | "PUFA 18:2 i"
  | "SFA 13:0"
  | "Phytosterols"
  | "PUFA 2:4 n-6"
  | "Vitamin D2 (ergocalciferol)"
  | "MUFA 18:1-11 t (18:1t n-7)";

export type UnitName = "g" | "kJ" | "mg" | "kcal" | "IU" | "µg";

export type FoodNutrientType = "FoodNutrient";

export type FoodPortion = {
  id: number;
  measureUnit: MeasureUnit;
  modifier: string;
  gramWeight: number;
  sequenceNumber: number;
};

export type MeasureUnit = {
  id: number;
  name: Abbreviation;
  abbreviation: Abbreviation;
};

export type Abbreviation = "undetermined";

export type NutrientConversionFactor = {
  type: NutrientConversionFactorType;
  value?: number;
  proteinValue?: number;
  fatValue?: number;
  carbohydrateValue?: number;
};

export type NutrientConversionFactorType =
  | ".ProteinConversionFactor"
  | ".CalorieConversionFactor";

export type PublicationDate = "4/1/2019";
