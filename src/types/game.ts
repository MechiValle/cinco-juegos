export interface Game {
  id: number;

  name: string;

  released: string;

  background_image: string | null;

  genres: {
    id: number;
    name: string}[];

  platforms: {
    platform: {
      id: number;
      name: string}}[];

  description?: string;
}