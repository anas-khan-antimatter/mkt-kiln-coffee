export interface RoastProduct {
  id: string;
  name: string;
  roaster: string;
  origin: string;
  region: string;
  process: "Washed" | "Natural" | "Honey" | "Anaerobic" | "Lactic" | "Carbonic Maceration";
  elevation: string;
  flavorNotes: string[];
  body: "Light" | "Medium-Light" | "Medium" | "Medium-Full" | "Full";
  acidity: "Low" | "Medium-Low" | "Medium" | "Medium-High" | "High";
  price: number; // USD per 12oz bag
  priceOptions: { size: string; price: number }[];
  available: boolean;
  featured: boolean;
  image: string;
  description: string;
  tastingNotes: string;
  brewMethods: string[];
  roastLevel: "Light" | "Medium-Light" | "Medium" | "Medium-Dark" | "Dark";
}

export interface CafeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  image: string;
  features: string[];
}

export interface BrewGuide {
  id: string;
  method: string;
  title: string;
  subtitle: string;
  icon: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  ratio: string;
  temperature: string;
  steps: string[];
  tips: string[];
}

export type CartItem = {
  product: RoastProduct;
  size: string;
  quantity: number;
};