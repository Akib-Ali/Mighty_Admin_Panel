export type City = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Ras Al Khaimah" | "Umm Al Quwain";
export type PropertyType = "BUY" | "RENT" | "SELL";
export type PropertyStatus = "ACTIVE" | "INACTIVE";

export interface Property {
  id: string;
  name: string;
  type: "Apartments" | "Townhouses" | "Villas";
  location: string;
  city: City;
  launchPrice: number;
  handoverDate: string;
  imageUrl: string;
}
