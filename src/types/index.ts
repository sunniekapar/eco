export type FoodWasteProps = {
  name: string;
  kg: number;
}[];

export type ChartDataProps = {
  dataKey: string;
  xAxisKey: string;
  data: FoodWasteProps;
}[];

export type UserDataProps = {
  name: string;
  footprint: number;
  num_donations: number;
  num_points: number;
  history: FoodWasteProps;
};

export type ItemTableProps = {
  item: string;
  expiryDate: string;
  count: number;
}[];

export type RecipeProps = {
  dish: string;
  description: string;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: string[];
};

export type AllDataProps = {
  userData: UserDataProps[] | [];
  itemData: ItemTableProps | [];
  recipeData: RecipeProps | {};
  userFetched: boolean;
  itemFetched: boolean;
  recipeFetched: boolean;
};
