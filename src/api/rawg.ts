import axios from "axios";
import type { Game } from "../types/game";

export const rawgApi = axios.create({
  baseURL: "https://api.rawg.io/api",
});

interface SearchResponse {
  results: Game[];
}

export const searchGames = async (
  query: string
): Promise<Game[]> => {
  const response =
    await rawgApi.get<SearchResponse>(
      "/games",
      {
        params: {
          key: import.meta.env.VITE_RAWG_API_KEY,
          search: query,
        },
      }
    );

  return response.data.results;
};