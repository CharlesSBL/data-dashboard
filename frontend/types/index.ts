// frontend/types/index.ts
export interface Book {
  title: string;
  price: number;
  category: string;
  rating: number;
  availability: boolean;
}

export interface BookStats {
  totalBooks: number;
  averagePrice: number;
  availableBooks: number;
  categories: number;
}
