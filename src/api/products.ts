import axios from "axios";

const PRODUCTS_API_BASE = "https://dd07cd6dfc044fab.mokky.dev";
const PRODUCTS_API_URL = `${PRODUCTS_API_BASE}/products`;

export function getProductImageUrl(path: string | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Paths like /images/... load from local public folder
  if (path.startsWith("/images/")) return path;
  return `${PRODUCTS_API_BASE}${path}`;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductComment {
  author: string;
  rating: number;
  text: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  category: string;
  brand: string;
  breadcrumbs: { label: string; path: string }[];
  description: string;
  fullDescription?: string;
  specs: Record<string, ProductSpec>;
  colors: string[];
  storageOptions?: string[];
  sizeOptions?: string[];
  rating: number;
  reviewsCount: number;
  comments?: ProductComment[];
  inStock: boolean;
  liked: boolean;
}

export interface ProductsResponse {
  categories: Record<string, { name: string; path: string }>;
  brands: Record<string, { name: string; path: string }>;
  products: Product[];
}

export async function fetchProducts(): Promise<ProductsResponse> {
  const { data } = await axios.get<ProductsResponse | ProductsResponse[]>(PRODUCTS_API_URL);
  // API returns array with single object: [{ categories, brands, products }]
  const response = Array.isArray(data) ? data[0] : data;
  return response;
}
