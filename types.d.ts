type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  isNew?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  category?: string;
  rating: number;
  description?: string;
};

type Stats = {
  totalBooks: number;
  readBooks: number;
  favoriteGenre: string;
};

type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
};
