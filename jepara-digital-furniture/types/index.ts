export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  material: string;
  dimensions: string;
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}
