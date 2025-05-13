export interface ICategory {
  id: number; // TODO: remove this id
  title: string;
  imageUrl: string;
  items: ICategoryItem[];
}

export interface ICategoryItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}
